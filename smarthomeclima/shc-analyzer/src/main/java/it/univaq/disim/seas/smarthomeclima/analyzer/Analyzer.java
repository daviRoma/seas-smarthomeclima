package it.univaq.disim.seas.smarthomeclima.analyzer;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import it.univaq.disim.seas.smarthomeclima.knowledgebase.domain.Sensor;
import it.univaq.disim.seas.smarthomeclima.knowledgebase.domain.SensorType;
import it.univaq.disim.seas.smarthomeclima.knowledgebase.domain.SmartRoom;
import it.univaq.disim.seas.smarthomeclima.knowledgebase.domain.Configuration;
import it.univaq.disim.seas.smarthomeclima.knowledgebase.domain.Configurator;
import it.univaq.disim.seas.smarthomeclima.knowledgebase.domain.Policy;
import it.univaq.disim.seas.smarthomeclima.knowledgebase.domain.PolicyGroup;
import it.univaq.disim.seas.smarthomeclima.knowledgebase.domain.Season;
import it.univaq.disim.seas.smarthomeclima.knowledgebase.business.PolicyGroupService;
import it.univaq.disim.seas.smarthomeclima.knowledgebase.business.exception.BusinessException;

import it.univaq.disim.seas.smarthomeclima.planner.Planner;

@Component
public class Analyzer {
	private static final Logger LOGGER = LoggerFactory.getLogger(Analyzer.class);

	@Autowired
	private Planner planner;
	
	@Autowired
	private PolicyGroupService policyGroupService;
	
	private Map<Integer, Configuration> actualConfigurations;
	private LocalDateTime clock;
	
	private Map<Integer, List<PolicyGroup>> groups;

	/**
	 * Analyze the values of each sensor in the smart rooms
	 * @param smartRooms
	 * @param clock
	 * @throws BusinessException 
	 */
	public void analyzeSensorsValue(Map<Integer, SmartRoom> smartRooms, LocalDateTime clock) throws BusinessException {
		LOGGER.info("[Analyzer]::[analyzeSensorsValue] --- Run analyzer");
		this.clock = clock;
		
		Map<Integer, HashMap<SensorType, Integer>> smartRoomUpdates = new HashMap<Integer, HashMap<SensorType, Integer>>();
		
		this.groups = this.policyGroupService.findAllBySmartRooms( new ArrayList<SmartRoom>(smartRooms.values()));
		
		// build a configuration map
		this.setActualConfigurations(smartRooms);
		
		for (Configuration config : this.actualConfigurations.values()) {
			for (Sensor sensor : config.getSmartRoom().getSensors()) {
				
				switch (sensor.getType()) {
				
					case TEMPERATURE:
						
						if (config.getPolicyGroup().getSeason().equals(Season.WINTER)) {
							// danger range
							if (sensor.getValue() <= (config.getPolicy().getOptimalTemperature() - Policy.OPTIMAL_MARGIN - config.getPolicy().getDangerMargin())) 
								smartRoomUpdates.get(config.getSmartRoom().getId()).put(SensorType.TEMPERATURE, Configurator.DANGER_LOW_TEMP_CODE);
							// danger priority (danger temp -1)
							if (sensor.getValue() <= (config.getPolicy().getOptimalTemperature() - Policy.OPTIMAL_MARGIN - config.getPolicy().getDangerMargin() - 1)) 
								smartRoomUpdates.get(config.getSmartRoom().getId()).put(SensorType.TEMPERATURE, Configurator.DANGER_PRIORITY_LOW_TEMP_CODE);
							// reactive range
							else if (sensor.getValue() <= (config.getPolicy().getOptimalTemperature() - Policy.OPTIMAL_MARGIN - config.getPolicy().getReactiveMargin()))
								smartRoomUpdates.get(config.getSmartRoom().getId()).put(SensorType.TEMPERATURE, Configurator.LOW_TEMP_CODE);
							// optimal
							else {
								smartRoomUpdates.get(config.getSmartRoom().getId()).put(SensorType.TEMPERATURE, Configurator.OPT_TEMP_CODE);
							}
						} else {
							// danger range
							if (sensor.getValue() >= (config.getPolicy().getOptimalTemperature() + Policy.OPTIMAL_MARGIN + config.getPolicy().getDangerMargin()))
								smartRoomUpdates.get(config.getSmartRoom().getId()).put(SensorType.TEMPERATURE, Configurator.DANGER_HIGH_TEMP_CODE);
							// danger priority (danger temp +1)
							if (sensor.getValue() >= (config.getPolicy().getOptimalTemperature() + Policy.OPTIMAL_MARGIN + config.getPolicy().getDangerMargin() + 1))
								smartRoomUpdates.get(config.getSmartRoom().getId()).put(SensorType.TEMPERATURE, Configurator.DANGER_HIGH_TEMP_CODE);
							// reactive range
							else if (sensor.getValue() >= (config.getPolicy().getOptimalTemperature() + Policy.OPTIMAL_MARGIN + config.getPolicy().getReactiveMargin())) 
								smartRoomUpdates.get(config.getSmartRoom().getId()).put(SensorType.TEMPERATURE, Configurator.HIGH_TEMP_CODE);
							// optimal
							else {
								smartRoomUpdates.get(config.getSmartRoom().getId()).put(SensorType.TEMPERATURE, Configurator.OPT_TEMP_CODE);
							}
						}
				
						break;
					
					case MOTION:
						
						// reaction
						if (sensor.getValue() == 1) {
							// Remove the temp sensor from the update map
							if (config.getSensors().get(SensorType.TEMPERATURE).getValue() < (config.getPolicy().getOptimalTemperature() - Policy.OPTIMAL_MARGIN)) {
								smartRoomUpdates.get(config.getSmartRoom().getId()).put(SensorType.MOTION, Configurator.ON);
							}
							
						} else {
							smartRoomUpdates.get(config.getSmartRoom().getId()).put(SensorType.MOTION, Configurator.OFF);
						}
						break;
					
					case CONTACT:
						// sensor.getValue() can be 0 or 1 (inactive, active)
						smartRoomUpdates.get(config.getSmartRoom().getId()).put(SensorType.CONTACT, (int)sensor.getValue());						
						break;
				}
			}
		}
		
		// Notify the Planner
		planner.planning(smartRoomUpdates, this.actualConfigurations, this.clock);
	}

	/**
	 * Set the actual configuration object.
	 * @param smartRooms
	 */
	private void setActualConfigurations(Map<Integer, SmartRoom> smartRooms) {
		if (this.actualConfigurations == null) this.actualConfigurations = new HashMap<Integer, Configuration>();
		
		for (SmartRoom sm : smartRooms.values()) {
			if (!actualConfigurations.containsKey(sm.getId())) {
				Configuration config = new Configuration(sm, null, null);
				actualConfigurations.put(sm.getId(), config);
			}
			for (Sensor sensor : sm.getSensors()) {
				this.actualConfigurations.get(sm.getId()).getSensors().put(sensor.getType(), sensor);
			}
			
			for (PolicyGroup group : this.groups.get(sm.getId())) {
				if (!group.isActive() && group.getStartDate().compareTo(this.clock.toLocalDate()) <= 0 && group.getEndDate().compareTo(this.clock.toLocalDate()) > 0) {
					group.setActive(true);
					this.actualConfigurations.get(sm.getId()).setPolicyGroup(group);
				}
			}
			for (Policy policy : this.actualConfigurations.get(sm.getId()).getPolicyGroup().getPolicies()) {
				if (!policy.isActive() && policy.getStartHour().getHour() <= this.clock.getHour() && this.clock.getHour()< policy.getEndHour().getHour()) {
					policy.setActive(true);
					this.actualConfigurations.get(sm.getId()).setPolicy(policy);
				}
			}
		}
	}
}