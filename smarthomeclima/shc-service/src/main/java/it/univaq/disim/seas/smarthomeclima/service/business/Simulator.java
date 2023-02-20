package it.univaq.disim.seas.smarthomeclima.service.business;

import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import it.univaq.disim.seas.smarthomeclima.broker.MqttBroker;
import it.univaq.disim.seas.smarthomeclima.knowledgebase.business.PianificationService;
import it.univaq.disim.seas.smarthomeclima.knowledgebase.business.SmartRoomService;
import it.univaq.disim.seas.smarthomeclima.knowledgebase.business.exception.BusinessException;
import it.univaq.disim.seas.smarthomeclima.knowledgebase.domain.Actuator;
import it.univaq.disim.seas.smarthomeclima.knowledgebase.domain.MessageChannel;
import it.univaq.disim.seas.smarthomeclima.knowledgebase.domain.Pianification;
import it.univaq.disim.seas.smarthomeclima.knowledgebase.domain.RoomType;
import it.univaq.disim.seas.smarthomeclima.knowledgebase.domain.Sensor;
import it.univaq.disim.seas.smarthomeclima.knowledgebase.domain.SensorType;
import it.univaq.disim.seas.smarthomeclima.knowledgebase.domain.SmartRoom;
import it.univaq.disim.seas.smarthomeclima.knowledgebase.model.ChannelPayload;

@Component
public class Simulator extends Thread {
	private static final Logger LOGGER = LoggerFactory.getLogger(Simulator.class);

	@Autowired
	private SmartRoomService smartRoomService;
	
	@Autowired
	private PianificationService pianificationService;
	
	@Autowired
	private MqttBroker broker;
	
	private List<SmartRoom> smartRooms;
	private boolean isStart = false;
	
	private ObjectMapper objectMapper = new ObjectMapper();
	
	public Simulator() {}
	
	@Override
	public void run() {
		LOGGER.info("[Simulator]::[run] --- Simulator started");

		try {
			this.isStart = true;
			this.smartRooms = this.smartRoomService.findAll();
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		// set topics
		this.broker.setChannelData(MessageChannel.SENSOR_CHANNEL);
		this.broker.setChannelData(MessageChannel.ACTUATOR_CHANNEL);
		this.broker.setChannelData(MessageChannel.MONITOR_ACTUATOR_CHANNEL);
		
		for (SmartRoom sm : this.smartRooms) {
			for (Sensor sns : sm.getSensors()) {
				
				switch (sns.getType()) {
				case TEMPERATURE:
					sns.setValue((int)Math.floor(Math.random() * (22 - 17 + 1) + 17));
					break;
				case MOTION:
					sns.setValue(0);
					break;
				case CONTACT:
					sns.setValue(0);
					break;
				default:
					break;
				}
				
				try {
					broker.publish(
							MessageChannel.SENSOR_CHANNEL
							.replace("{srId}", String.valueOf(sm.getId()))
							.replace("{snsId}", String.valueOf(sns.getId())), 
							this.objectMapper.writeValueAsString(new ChannelPayload(sns.getId(), sns.getValue()))
					);					
				} catch (JsonProcessingException e) {
					LOGGER.error("[Simulator]::[run] --- Error publishing sensor message.");
					e.printStackTrace();
				}
			}
			
		}
		
		while(this.isStart) {
			try {
				this.simulation();				
				Thread.sleep(60000);
			} catch (InterruptedException e) {
				e.printStackTrace();
				this.isStart = false;
			} catch (BusinessException e) {
				e.printStackTrace();
				this.isStart = false;
			}
		}
	}
	
	public void simulation() throws BusinessException {
		Set<Integer> ids = new HashSet<Integer>();

		for (SmartRoom sm : this.smartRooms) {
			ids.add(sm.getId());
		}
		Map<Integer, Pianification> pianifications = this.pianificationService.getAllActive(ids);
		
		for (SmartRoom sm : this.smartRooms) {
			Pianification p = pianifications.get(sm.getId());
			
			for (Sensor s : sm.getSensors()) {
				double randomStep = (double)Math.floor(Math.random() * (1 - 0 + 0.1) + 0);
				int randomFlag = (int)Math.floor(Math.random() * (100 - 1 + 1) +1);
				
				try {
					if (s.getType().equals(SensorType.TEMPERATURE)) {
						if (p != null && p.isActive()) {
							s.setValue(s.getValue() + randomStep);
							broker.publish(
								MessageChannel.SENSOR_CHANNEL
									.replace("{srId}", String.valueOf(sm.getId()))
									.replace("{snsId}", String.valueOf(s.getId())), 
									this.objectMapper.writeValueAsString(new ChannelPayload(s.getId(), s.getValue()))
							);
						} else {
							s.setValue(s.getValue() - randomStep);
							broker.publish(
								MessageChannel.SENSOR_CHANNEL
									.replace("{srId}", String.valueOf(sm.getId()))
									.replace("{snsId}", String.valueOf(s.getId())),
									this.objectMapper.writeValueAsString(new ChannelPayload(s.getId(), s.getValue()))
							);
						}			
					} else if (s.getType().equals(SensorType.MOTION)) {
						if (sm.getType().equals(RoomType.LIVING_ROOM)) {
							if (randomFlag % 2 == 0) {
								s.setValue(1);
								broker.publish(
									MessageChannel.SENSOR_CHANNEL
										.replace("{srId}", String.valueOf(sm.getId()))
										.replace("{snsId}", String.valueOf(s.getId())), 
										this.objectMapper.writeValueAsString(new ChannelPayload(s.getId(), s.getValue()))
								);
							}
						}
					}
					
				} catch (JsonProcessingException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
			
			for (Actuator act : sm.getActuators()) {
				try {
					// send actuator data where control panel are listening
					this.broker.publish(
						MessageChannel.MONITOR_ACTUATOR_CHANNEL
							.replace("{srId}", Integer.toString(sm.getId()))
							.replace("{actId}", String.valueOf(act.getId())),  
							this.objectMapper.writeValueAsString(new ChannelPayload(act.getId(), act.getPower()))
					);					
				} catch (JsonProcessingException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
		}
	}

	public void terminate() {
		this.isStart = false;
	}
}