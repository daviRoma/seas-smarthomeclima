package it.univaq.disim.seas.smarthomeclima.monitor;

import java.util.Calendar;
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
    
    private Calendar clock = Calendar.getInstance();
    private Map<Integer, SmartRoom> smartRooms = new HashMap<Integer, SmartRoom>();
    
    
    public Monitor() throws BusinessException {
    	// inizialize the clock
    	this.clock.set(Calendar.HOUR_OF_DAY, 0);
    	this.clock.set(Calendar.MINUTE, 0);
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
    		e.printStackTrace();
    	}
    	
    	// Subscribe to channels
    	this.brokerSensors.subscribe(MessageChannel.SENSOR_CHANNEL);
    	this.brokerActuators.subscribe(MessageChannel.ACTUATOR_CHANNEL);

        while (true) {
        
			try {
				if (!this.brokerSensors.getMessages().isEmpty()){
					this.getSensorsData();
				} else {
					Thread.sleep(60000);
				}
				
			} catch (Exception e) {
				e.printStackTrace();
			}
        }
	}
    
    /**
     * Get all sensors data.
     * @throws BusinessException 
     */
	private void getSensorsData() throws BusinessException {
						
		try {
			ObjectMapper objectMapper = new ObjectMapper();

			// build sensor map for each room
			for (Map.Entry<String, List<String>> channelData : this.brokerSensors.getChannelData().entrySet()) {
				
				if (channelData.getValue().isEmpty()) continue;
				
				for (String message : channelData.getValue()) {
					ChannelPayload payload = objectMapper.readValue(message, ChannelPayload.class);
					
					if (this.smartRooms.containsKey(MessageChannel.getSmartRoomIdFromTopic(channelData.getKey()))) {
						// Set received value
						for (Sensor sensor : this.smartRooms.get(MessageChannel.getSmartRoomIdFromTopic(channelData.getKey())).getSensors()) {
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
					
					if (this.smartRooms.containsKey(MessageChannel.getSmartRoomIdFromTopic(channelData.getKey()))) {
						// Set received value
						for (Actuator act : this.smartRooms.get(MessageChannel.getSmartRoomIdFromTopic(channelData.getKey())).getActuators()) {
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
        
		this.analyzer.analyzeSensorsValue(this.smartRooms, (Calendar) this.clock.clone());
		
		this.clock.add(Calendar.MINUTE, 15);
		
	}
	
}