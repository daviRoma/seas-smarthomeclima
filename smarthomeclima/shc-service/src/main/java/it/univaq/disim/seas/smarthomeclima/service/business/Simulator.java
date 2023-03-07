package it.univaq.disim.seas.smarthomeclima.service.business;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.Set;

import javax.annotation.PostConstruct;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;

import it.univaq.disim.seas.smarthomeclima.broker.MqttBroker;
import it.univaq.disim.seas.smarthomeclima.knowledgebase.business.ActuatorService;
import it.univaq.disim.seas.smarthomeclima.knowledgebase.business.PianificationService;
import it.univaq.disim.seas.smarthomeclima.knowledgebase.business.SmartRoomService;
import it.univaq.disim.seas.smarthomeclima.knowledgebase.business.exception.BusinessException;
import it.univaq.disim.seas.smarthomeclima.knowledgebase.domain.Actuator;
import it.univaq.disim.seas.smarthomeclima.knowledgebase.domain.MessageChannel;
import it.univaq.disim.seas.smarthomeclima.knowledgebase.domain.Pianification;
import it.univaq.disim.seas.smarthomeclima.knowledgebase.domain.Sensor;
import it.univaq.disim.seas.smarthomeclima.knowledgebase.domain.SensorType;
import it.univaq.disim.seas.smarthomeclima.knowledgebase.domain.SmartRoom;
import it.univaq.disim.seas.smarthomeclima.knowledgebase.model.Channel;
import it.univaq.disim.seas.smarthomeclima.knowledgebase.model.ChannelPayload;
import it.univaq.disim.seas.smarthomeclima.knowledgebase.model.ChannelType;

@Component
public class Simulator extends Thread {
	private static final Logger LOGGER = LoggerFactory.getLogger(Simulator.class);

	@Autowired
	private SmartRoomService smartRoomService;
	
	@Autowired
	private ActuatorService actuatorService;
	
	@Autowired
	private PianificationService pianificationService;
	
	@Autowired
	private MqttBroker broker;
	
	@Autowired
	private ObjectMapper objectMapper = new ObjectMapper();
	
	private List<SmartRoom> smartRooms;
	private boolean isStarted = false;
		
	public Simulator() {}
	
	@Override
	public void run() {
		LOGGER.info("[Simulator]::[run] --- Simulator started");

		try {			
			Thread.sleep(20000);
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
		
		try {
			this.isStarted = true;
			this.smartRooms = this.smartRoomService.findAll();
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		
		for (SmartRoom sm : this.smartRooms) {
			for (Sensor sns : sm.getSensors()) {
				
				switch (sns.getType()) {
				case TEMPERATURE:
					sns.setValue(truncateDecimal((Math.random() * (22 - 17)) + 17, 1).doubleValue());
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
			}
			for (Actuator act : sm.getActuators()) {
				// subscribe to topic
				this.broker.subscribe(
					ChannelType.EXECUTOR_MONITOR, 
					MessageChannel.MONITOR_EXECUTOR_CHANNEL
					.replace("{srId}", Integer.toString(sm.getId()))
					.replace("{actId}", String.valueOf(act.getId()))
				);
			}
		}
		
		while(this.isStarted) {
			try {
				this.simulation();				
				Thread.sleep(30000);
			} catch (InterruptedException e) {
				e.printStackTrace();
			    Thread.currentThread().interrupt();  //set the flag back to true
				this.isStarted = false;
			} catch (BusinessException e) {
				e.printStackTrace();
				this.isStarted = false;
			}
		}
	}
	
	/**
	 * Simulate sensors and actuators behavior.
	 * @throws BusinessException
	 */
	public void simulation() throws BusinessException {
		LOGGER.info("[Simulator]::[simulation] --- Send data");
		
		Set<Integer> ids = new HashSet<Integer>();
		List<Actuator> actuators = new ArrayList<Actuator>();
		
		Random rd = new Random();

		for (SmartRoom sm : this.smartRooms) {
			ids.add(sm.getId());
		}
		
		Map<Integer, Pianification> pianifications = this.pianificationService.getAllActive(ids);
		
		for (SmartRoom sm : this.smartRooms) {
			Pianification p = pianifications.get(sm.getId()); 
			
			int randomFlag = (int)Math.floor(Math.random() * (100 - 1 + 1) +1);
			
			for (Sensor s : sm.getSensors()) {
				try {
					if (s.getType().equals(SensorType.TEMPERATURE)) {
						
						if (p != null && p.isActive()) {
							s.setValue(truncateDecimal(s.getValue() + Math.floor(rd.nextDouble() * 10) / 10, 1).doubleValue());
							this.broker.publish(
								ChannelType.SENSOR, 
								MessageChannel.SENSOR_CHANNEL
									.replace("{srId}", String.valueOf(sm.getId()))
									.replace("{snsId}", String.valueOf(s.getId())), 
									this.objectMapper.writeValueAsString(new ChannelPayload(s.getId(), s.getValue()))
							);
						} else {
							s.setValue(truncateDecimal(s.getValue() - Math.floor(rd.nextDouble() * 10) / 10, 1).doubleValue());
							this.broker.publish(
								ChannelType.SENSOR,
								MessageChannel.SENSOR_CHANNEL
									.replace("{srId}", String.valueOf(sm.getId()))
									.replace("{snsId}", String.valueOf(s.getId())),
									this.objectMapper.writeValueAsString(new ChannelPayload(s.getId(), s.getValue()))
							);
						}			
					} else if (s.getType().equals(SensorType.MOTION)) {
						s.setValue(0);
						if (randomFlag % 2 == 0) {
							s.setValue(1);
						}
						this.broker.publish(
							ChannelType.SENSOR,
							MessageChannel.SENSOR_CHANNEL
								.replace("{srId}", String.valueOf(sm.getId()))
								.replace("{snsId}", String.valueOf(s.getId())), 
							this.objectMapper.writeValueAsString(new ChannelPayload(s.getId(), s.getValue()))
						);
					}
					
				} catch (JsonProcessingException e) {
					e.printStackTrace();
				}
			}

			// subscribe to executor channels and simulate the actuators behavior
			if (!this.broker.getChannelsMessages(ChannelType.EXECUTOR_MONITOR).isEmpty()) {
				
				try {
					List<Channel> executorChannelData = (List<Channel>)this.broker.getChannels().get(ChannelType.EXECUTOR_MONITOR);
					
					Iterator<Channel> it = executorChannelData.iterator();
					
					for (Actuator act : sm.getActuators()) {
						while (it.hasNext()) {
							Channel channel = it.next();
							
							if (channel.getMessages().isEmpty()) continue;
							
							for (String message : channel.getMessages()) {
								ChannelPayload payload = (ChannelPayload)this.objectMapper.readValue(message, ChannelPayload.class);
								if (act.getId() == payload.getId()) {
									// update actuator on the database if is inactive
									if (payload.getValue() > 0 && !act.isActive()) {
										act.setActive(true);
										act.setPower((int)payload.getValue());
										actuators.add(act);
									}
								}
							}
							
						}
					}
				} catch (JsonProcessingException e) {
					e.printStackTrace();
				} catch (IOException ex) {
					ex.printStackTrace();
				}
				
			}
		}
		
		// update actuators data on the database
		if (!actuators.isEmpty()) this.actuatorService.upsertMultipleActuators(actuators);

	}

	@PostConstruct
	public void setUp() {
		this.objectMapper.registerModule(new JavaTimeModule());
		this.objectMapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);
	}
	 
	/**
	 * Termiate thread.
	 * @throws InterruptedException
	 */
	public void terminate() throws InterruptedException {
		this.isStarted = false;
		this.join();
		Thread.currentThread().interrupt();
	    if (Thread.interrupted()) {
	    	LOGGER.info("[Simulator]::[stopped]");
	    }
	}
	
	/**
	 * Get big decimal value from double.
	 * @param x
	 * @param numberofDecimals
	 * @return BigDecimal
	 */
	private static BigDecimal truncateDecimal(double x, int numberofDecimals) {
	    if ( x > 0) {
	        return new BigDecimal(String.valueOf(x)).setScale(numberofDecimals, BigDecimal.ROUND_FLOOR);
	    } else {
	        return new BigDecimal(String.valueOf(x)).setScale(numberofDecimals, BigDecimal.ROUND_CEILING);
	    }
	}
}
