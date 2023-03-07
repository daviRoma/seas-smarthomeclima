package it.univaq.disim.seas.smarthomeclima.broker;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.eclipse.paho.client.mqttv3.IMqttDeliveryToken;
import org.eclipse.paho.client.mqttv3.MqttCallback;
import org.eclipse.paho.client.mqttv3.MqttClient;
import org.eclipse.paho.client.mqttv3.MqttException;
import org.eclipse.paho.client.mqttv3.MqttMessage;
import org.eclipse.paho.client.mqttv3.persist.MemoryPersistence;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import it.univaq.disim.seas.smarthomeclima.knowledgebase.model.Channel;
import it.univaq.disim.seas.smarthomeclima.knowledgebase.model.ChannelType;

@Component
public class MqttBroker implements MqttCallback {

	private static Logger LOGGER = LoggerFactory.getLogger(MqttBroker.class);

	private MqttClient client;
	
	List<String> messages = new ArrayList<String>();
	List<String> topics = new ArrayList<String>();
	
	Map<ChannelType, List<Channel>> channels = new HashMap<ChannelType, List<Channel>>();

	public MqttBroker() {}

	public void deliveryComplete(IMqttDeliveryToken arg0) {
		LOGGER.info("[MqttBroker]::The delivery has been complete. The delivery token is " + arg0.getMessageId());
	}

	public void messageArrived(String topic, MqttMessage message) throws Exception {
		this.messages.add(message.toString());
		this.topics.add(topic);
	}
	
	public void clear(){
		this.messages.clear();
		this.topics.clear();
		
		for (ChannelType type : this.channels.keySet()) {
			for (Channel ch : this.channels.get(type)) {
				ch.getMessages().clear();
			}
		}
	}
	
	public List<String> getMessages() {
		return messages;
	}

	public void setMessages(List<String> messages) {
		this.messages = messages;
	}

	public List<String> getTopics() {
		return topics;
	}

	public void setTopics(List<String> topics) {
		this.topics = topics;
	}

	public void connectionLost(Throwable arg0) {
		LOGGER.info("[MqttBroker]::Server connection lost...");
	}
	
	public void setChannels(ChannelType type) {
		this.channels.put(type, new ArrayList<Channel>());
	}

	public Map<ChannelType, List<Channel>> getChannels() {
		return this.channels; 
	}
	
	public List<Channel> getChannelsEntry(ChannelType type) {
		return this.channels.get(type); 
	}
	
	public List<String> getChannelsMessages(ChannelType type) {
		List<String> msg = new ArrayList<String>();
		if (!this.channels.containsKey(type)) return msg;
		
		for (Channel ch : channels.get(type)) {
			if (ch.getMessages().isEmpty()) continue;
			msg.addAll(ch.getMessages());
		}
		return msg;
	}
	
	public void setSingleChannel(ChannelType type, String topic) {
		// Set channel data
		if (this.channels.containsKey(type)) {
			boolean flag = false;
			for (Channel ch : this.channels.get(type)) {
				if (ch.getTopic().equals(topic)) flag = true;
			}
			if (!flag) this.channels.get(type).add(new Channel(topic));
		} else {
			this.channels.put(type, new ArrayList<Channel>());
			this.channels.get(type).add(new Channel(topic));			
		}
	}
	
	public void publish(ChannelType type, String topic, String mess) {
		MqttMessage message = new MqttMessage();
		
		this.setSingleChannel(type, topic);	
		
		// Set channel data
		for (Channel ch : this.channels.get(type)) {
			if (ch.getTopic().equals(topic)) {
				ch.getMessages().add(mess);
			}
		}
		

		try {
			LOGGER.info("[MqttBroker]::[publish]::Send message to " + topic);
			if (this.client == null || !this.client.isConnected()) this.clientConnection();
			
			message.setPayload(mess.getBytes());
			message.setQos(2);
			this.messages.add(message.toString());
			
			this.client.publish(topic, message);
			this.client.disconnect();
		} catch (MqttException e) {
			LOGGER.error("[MqttBroker]::[publish]::" + e.getMessage());
			e.printStackTrace();
		}
	}

	public void subscribe(ChannelType type, String topic) {
		// Set channel
		this.setSingleChannel(type, topic);
		
		try {
			if (this.client == null || !this.client.isConnected()) this.clientConnection();
			
			this.client.subscribe(topic);
		} catch (MqttException e) {
			LOGGER.error("[MqttBroker]::[subscribe]::" + e.getMessage());
			e.printStackTrace();
		}
	}
	
	public void clientConnection() {
		MemoryPersistence memoryPersistence = new MemoryPersistence();
		
		try {
			this.client = new MqttClient("ws://localhost:8081", MqttClient.generateClientId(), memoryPersistence);
			this.client.setCallback(this);
			this.client.connect();								
		} catch (MqttException e) {
			LOGGER.error("[MqttBroker]::[clientConnection]::" + e.getMessage());
			e.printStackTrace();
		}
	}
}
