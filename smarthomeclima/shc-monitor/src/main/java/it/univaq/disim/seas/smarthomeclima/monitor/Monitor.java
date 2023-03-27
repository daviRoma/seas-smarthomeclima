package it.univaq.disim.seas.smarthomeclima.monitor;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.databind.ObjectMapper;

import it.univaq.disim.seas.smarthomeclima.analyzer.Analyzer;
import it.univaq.disim.seas.smarthomeclima.broker.MqttBroker;
import it.univaq.disim.seas.smarthomeclima.knowledgebase.business.SmartRoomService;
import it.univaq.disim.seas.smarthomeclima.knowledgebase.business.exception.BusinessException;
import it.univaq.disim.seas.smarthomeclima.knowledgebase.domain.MessageChannel;
import it.univaq.disim.seas.smarthomeclima.knowledgebase.domain.SmartRoom;
import it.univaq.disim.seas.smarthomeclima.knowledgebase.model.Channel;
import it.univaq.disim.seas.smarthomeclima.knowledgebase.model.ChannelPayload;
import it.univaq.disim.seas.smarthomeclima.knowledgebase.model.ChannelType;
import it.univaq.disim.seas.smarthomeclima.knowledgebase.domain.Actuator;
import it.univaq.disim.seas.smarthomeclima.knowledgebase.domain.Sensor;

@Component
public class Monitor implements Runnable {

	private static final Logger LOGGER = LoggerFactory.getLogger(Monitor.class);

	@Autowired
	private Analyzer analyzer;
 
	@Autowired
	private SmartRoomService smartRoomService;
	
	@Autowired
    private MqttBroker broker;
	
	@Autowired
	private ObjectMapper objectMapper;
    
	private volatile boolean isStarted = false; 
    private LocalDateTime clock;
    
    private Map<Integer, SmartRoom> smartRooms;
    
    public Monitor() { 
    	// inizialize the clock
    	this.clock = LocalDateTime.now();
    	this.smartRooms = new HashMap<Integer, SmartRoom>();
    }
    
    /**
     * Run method.
     */
    @Override
    public void run() {
    	LOGGER.info("[Monitor]::[run] --- Run monitoring");
    	
    	this.isStarted = true;
    	
    	// Get all smart room 
    	try {    		
    		for (SmartRoom sm : this.smartRoomService.findAll() ){
    			this.smartRooms.put(sm.getId(), sm);
    			
    			// Subscribe to channels
    			for (Sensor sns : sm.getSensors()) {
    		    	this.broker.subscribe(
    		    		ChannelType.SENSOR, 
    		    		MessageChannel.SENSOR_CHANNEL
    		    			.replace("{srId}", Integer.toString(sm.getId()))
    		    			.replace("{snsId}", Integer.toString(sns.getId()))
    		    	);
    			}
    			
    			for (Actuator act : sm.getActuators()) {
    		    	this.broker.subscribe(
    		    		ChannelType.ACTUATOR, 
    		    		MessageChannel.ACTUATOR_CHANNEL
    		    			.replace("{srId}", Integer.toString(sm.getId()))
    		    			.replace("{actId}", Integer.toString(act.getId()))
    		    	);
    			}
    		}
    	} catch (BusinessException e) {
    		LOGGER.error("[Monitor]::[run]::[Error] --- " + e.getMessage());
    		e.printStackTrace();
    	}
    	

        while (this.isStarted) {
        	LOGGER.info("[Monitor]::[run] --- Clock: " + this.clock.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));
        	LOGGER.info("[Monitor]::[run] --- New Sensor messages: " + this.broker.getChannelsMessages(ChannelType.SENSOR).size());

        	try {
				if (!this.broker.getChannelsMessages(ChannelType.SENSOR).isEmpty()){
					this.processData();
				} else {
					Thread.sleep(30000);
				}
				
			} catch (InterruptedException e) {
		        Thread.currentThread().interrupt();  //set the flag back to true
		        this.isStarted = false;
		    } catch (Exception e) {
				e.printStackTrace();
				this.isStarted = false;
			} 
        }
	}
    
	/**
	 * Termiate thread.
	 */
	public void terminate() {
		this.isStarted = false;
	}

    /**
     * Process data.
     * @throws BusinessException 
     */
	private void processData() throws BusinessException {
		LOGGER.info("[Monitor]::[processData]");
		
		LocalDateTime clockTemp = this.clock;

		// get data
		this.getSensorsData();
		this.getActuatorsData();
		
    	// clear messages
    	this.broker.clear();		
        
		this.analyzer.analyzeSensorsValue(this.smartRooms, clockTemp);
		
		this.clock.plusMinutes(15);
	}
	 
    /**
     * Get all sensors data.
     * @throws BusinessException 
     */
	private void getSensorsData() throws BusinessException {
		LOGGER.info("[Monitor]::[getSensorsData] --- Retrieving...");

		try {
			List<Channel> sensorChannelData = (List<Channel>)this.broker.getChannels().get(ChannelType.SENSOR);
			
			Iterator<Channel> it = sensorChannelData.iterator();

			// build sensor map for each room

			while (it.hasNext()) {
				Channel channel = it.next();
				
				if (channel.getMessages().isEmpty()) continue;
				
				for (String message : channel.getMessages()) {
					ChannelPayload payload = (ChannelPayload)objectMapper.readValue(message, ChannelPayload.class);
					Integer srId = Integer.valueOf(MessageChannel.getSmartRoomIdFromTopic(channel.getTopic()));

					if (this.smartRooms.containsKey(srId)) {
						// Set received value
						for (Sensor sensor : this.smartRooms.get(srId).getSensors()) {
							if (sensor.getId() == payload.getId()) sensor.setValue(payload.getValue());
							
						}
					}					
				}
				it.remove();
			}
			
		} catch (Exception e) {
			LOGGER.error("[Monitor]::[getSensorsData] --- " + e.getMessage());
			e.printStackTrace();
		}
	}
	
	/**
     * Get all actuators data.
     * @throws BusinessException 
     */
	private void getActuatorsData() throws BusinessException {
		LOGGER.info("[Monitor]::[getActuatorsData] --- Retrieving...");		

		try {			
			if (!this.broker.getChannelsMessages(ChannelType.ACTUATOR).isEmpty()) {
				List<Channel> actuatorChannelData = (List<Channel>)this.broker.getChannels().get(ChannelType.ACTUATOR);
				
				Iterator<Channel> it = actuatorChannelData.iterator();
				
				// build actuator map for each room
				while (it.hasNext()) {
					Channel channel = it.next();
					
					if (channel.getMessages().isEmpty()) continue;
					
					for (String message : channel.getMessages()) {
						ChannelPayload payload = objectMapper.readValue(message, ChannelPayload.class);
						Integer srId = Integer.valueOf(MessageChannel.getSmartRoomIdFromTopic(channel.getTopic()));
						
						if (this.smartRooms.containsKey(srId)) {
							// Set received value
							for (Actuator act : this.smartRooms.get(srId).getActuators()) {
								if (act.getId() == payload.getId()) {
									if ((int)payload.getValue() == 0) {
										act.setActive(false);									
									} else {
										act.setActive(true);
									}
									act.setPower((int)payload.getValue());
								}
								
							}
						}					
					}	 
					it.remove();
				}
			}
			
			LOGGER.info("[Monitor]::[getActuatorsData] --- Publish actuators data --- ");	
			for (Integer srId : this.smartRooms.keySet()) {
				for (Actuator act : this.smartRooms.get(srId).getActuators()) {
					// publish on mqtt channel
					this.broker.publish(
						ChannelType.ACTUATOR_MONITOR,
						MessageChannel.MONITOR_ACTUATOR_CHANNEL
							.replace("{srId}", Integer.toString(srId))
							.replace("{actId}", String.valueOf(act.getId())),  
							this.objectMapper.writeValueAsString(new ChannelPayload(act.getId(), act.getPower()))
					);	
				}
			}
		} catch (Exception e) {
			LOGGER.error("[Monitor]::[getActuatorsData] --- " + e.getMessage());
			e.printStackTrace();
		}
	}
	
	/**
	 * Set clock variable
	 * @param clock
	 */
    public void setClock(LocalDateTime clock) {
    	this.clock = clock;
    }
	
}