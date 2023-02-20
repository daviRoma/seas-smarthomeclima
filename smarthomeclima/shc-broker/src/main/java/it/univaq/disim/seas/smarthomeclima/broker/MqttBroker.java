package it.univaq.disim.seas.smarthomeclima.broker;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import org.eclipse.paho.client.mqttv3.IMqttDeliveryToken;
import org.eclipse.paho.client.mqttv3.MqttCallback;
import org.eclipse.paho.client.mqttv3.MqttClient;
import org.eclipse.paho.client.mqttv3.MqttException;
import org.eclipse.paho.client.mqttv3.MqttMessage;
import org.eclipse.paho.client.mqttv3.persist.MemoryPersistence;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Component
public class MqttBroker implements MqttCallback {

	private static Logger LOGGER = LoggerFactory.getLogger(MqttBroker.class);

	int k = 0;
	MqttClient client;
	Map<Integer, String> messages = new ConcurrentHashMap<Integer,String>();
	Map<Integer, String> topics = new ConcurrentHashMap<Integer,String>();
	Map<String, List<String>> channelData = new HashMap<String, List<String>>();

	public MqttBroker() {}

	public Map<Integer, String> getMessages() {
		return messages;
	}

	public void setMessages(Map<Integer, String> messages) {
		this.messages = messages;
	}

	public Map<Integer, String> getTopics() {
		return topics;
	}

	public void setTopics(Map<Integer, String> topics) {
		this.topics = topics;
	}

	public void connectionLost(Throwable arg0) {
		LOGGER.info("[MqttBroker]::Server connection lost...");
	}

	public void deliveryComplete(IMqttDeliveryToken arg0) {
		LOGGER.info("[MqttBroker]::The delivery has been complete. The delivery token is ");
	}

	public void messageArrived(String topic, MqttMessage message) throws Exception {

		this.messages.put(this.k,message.toString());
		this.topics.put(this.k , topic);
		this.k %= 1000;
		this.k++;
	}
	
	public void clear(){
		this.messages.clear();
		this.topics.clear();
	}
	
	public void setChannelData(String channel) {
		this.channelData.put(channel, new ArrayList<String>());
	}

	public Map<String, List<String>> getChannelData() {
		return this.channelData; 
	}
	
	public void publish(String channel, String mess) {
		MemoryPersistence memoryPersistence = new MemoryPersistence();
		MqttMessage message = new MqttMessage();
		
		if (this.channelData.containsKey(channel)) this.channelData.get(channel).add(mess);

		try {
			LOGGER.info("[MqttBroker]::[publish]::Send message to " + channel);
			
			client = new MqttClient("ws://localhost:8081", MqttClient.generateClientId(), memoryPersistence);
			client.connect();
			
			message.setPayload(mess.getBytes());
			message.setQos(2);
			client.publish(channel, message);
			client.disconnect();
		} catch (MqttException e) {
			LOGGER.error("[MqttBroker]::[publish]::" + e.getMessage());
			e.printStackTrace();
		}
	}

	public void subscribe(String channel) {

		try {
			MemoryPersistence memoryPersistence = new MemoryPersistence();
			client = new MqttClient("ws://localhost:8081", MqttClient.generateClientId(), memoryPersistence);
			client.setCallback(this);
			
			client.connect();
			client.subscribe(channel);
		} catch (MqttException e) {
			e.printStackTrace();
		}
	}
}
