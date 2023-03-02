package it.univaq.disim.seas.smarthomeclima.monitor;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
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
import it.univaq.disim.seas.smarthomeclima.knowledgebase.model.ChannelPayload;
import it.univaq.disim.seas.smarthomeclima.knowledgebase.domain.Actuator;
import it.univaq.disim.seas.smarthomeclima.knowledgebase.domain.Sensor;

@Component
public class Monitor extends Thread {

	private static final Logger LOGGER = LoggerFactory.getLogger(Monitor.class);

	@Autowired
	private Analyzer analyzer;
 
	@Autowired
	private SmartRoomService smartRoomService;
	
	@Autowired
    private MqttBroker brokerSensors;
	
	@Autowired
    private MqttBroker brokerActuators;
    
	private boolean isStarted = true;
    private LocalDateTime clock;
    
    private Map<Integer, SmartRoom> smartRooms = new HashMap<Integer, SmartRoom>();
    
    public Monitor() { 
    	// inizialize the clock
    	this.clock = LocalDateTime.now();
    }
    
    // testing purpose
    public void setClock(LocalDateTime clock) {
    	this.clock = clock;
    }
    
    /**
     * Run method.
     */
    @Override
    public void run() {
    	LOGGER.info("[Monitor]::[run] --- Run monitoring");
    	
    	// Get all smart room 
    	try {    		
    		for (SmartRoom sm : this.smartRoomService.findAll() ){
    			this.smartRooms.put(sm.getId(), sm);
    		}
    	} catch (BusinessException e) {
    		LOGGER.error("[Monitor]::[run] --- " + e.getMessage());
    		e.printStackTrace();
    	}
    	
    	// Subscribe to channels
    	this.brokerSensors.subscribe(MessageChannel.SENSOR_CHANNEL);
    	this.brokerActuators.subscribe(MessageChannel.ACTUATOR_CHANNEL);

        while (this.isStarted) {
        	LOGGER.info("[Monitor]::[run] --- Clock: " + this.clock.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));
        	LOGGER.info("[Monitor]::[run] --- New Messages: " + this.brokerSensors.getMessages().size());

        	try {
				if (!this.brokerSensors.getMessages().isEmpty()){
					this.getSensorsData();
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
    
	public void terminate() throws InterruptedException {
		this.isStarted = false;
		this.join();
		Thread.currentThread().interrupt();
	    if (Thread.interrupted()) {
	    	LOGGER.info("[Monitor]::[stopped]");
	    }
	}
    
    /**
     * Get all sensors data.
     * @throws BusinessException 
     */
	private void getSensorsData() throws BusinessException {
		LocalDateTime clockTemp = this.clock;
		
		try { 
			ObjectMapper objectMapper = new ObjectMapper();

			// build sensor map for each room
			for (Map.Entry<String, List<String>> channelData : this.brokerSensors.getChannelData().entrySet()) {
				
				if (channelData.getValue().isEmpty()) continue;
				
				for (String message : channelData.getValue()) {
					ChannelPayload payload = (ChannelPayload)objectMapper.readValue(message, ChannelPayload.class);
					Integer srId = Integer.valueOf(MessageChannel.getSmartRoomIdFromTopic(channelData.getKey()));

					if (this.smartRooms.containsKey(srId)) {
						// Set received value
						for (Sensor sensor : this.smartRooms.get(srId).getSensors()) {
							if (sensor.getId() == payload.getId()) sensor.setValue(payload.getValue());
							
						}
					}					
				}
			}
			
			// build actuator map for each room
			for (Map.Entry<String, List<String>> channelData : this.brokerActuators.getChannelData().entrySet()) {
				if (channelData.getValue().isEmpty()) continue;
					
				for (String message : channelData.getValue()) {
					ChannelPayload payload = objectMapper.readValue(message, ChannelPayload.class);
					Integer srId = Integer.valueOf(MessageChannel.getSmartRoomIdFromTopic(channelData.getKey()));
					
					if (this.smartRooms.containsKey(srId)) {
						// Set received value
						for (Actuator act : this.smartRooms.get(srId).getActuators()) {
							if (act.getId() == payload.getId()) act.setPower((int)payload.getValue());
							
						}
					}					
				}					
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
    	
  
    	// clear messages
    	this.brokerSensors.clear();
    	this.brokerActuators.clear();		
        
		this.analyzer.analyzeSensorsValue(this.smartRooms, clockTemp);
		
		this.clock.plusMinutes(30);
		
	}
	
}