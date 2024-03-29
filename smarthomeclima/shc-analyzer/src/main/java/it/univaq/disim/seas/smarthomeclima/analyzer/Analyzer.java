package it.univaq.disim.seas.smarthomeclima.analyzer;

import java.time.LocalDateTime;
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
	
	private LocalDateTime clock;
	
	private Map<Integer, Configuration> actualConfigurations;
	private Map<Integer, List<PolicyGroup>> policyGroups;

	/**
	 * Analyze the values of each sensor in the smart rooms
	 * @param smartRooms
	 * @param clock
	 * @throws BusinessException 
	 */
	public void analyzeSensorsValue(Map<Integer, SmartRoom> smartRooms, LocalDateTime clock) throws BusinessException {
		LOGGER.info("[Analyzer]::[analyzeSensorsValue] --- Run analyzer");
		this.clock = clock;
		
		Map<Integer, HashMap<SensorType, Integer>> smartRoomsData = new HashMap<Integer, HashMap<SensorType, Integer>>();
		
		// Get policies
		this.policyGroups = this.policyGroupService.findAllBySmartRooms();
		
		// build a configuration map
		this.setActualConfigurations(smartRooms);
		
		try {
			for (Configuration config : this.actualConfigurations.values()) {
				
				// inizialize result map
				smartRoomsData.put(config.getSmartRoom().getId(), new HashMap<SensorType, Integer>());
				
				for (Sensor sensor : config.getSmartRoom().getSensors()) {
					
					switch (sensor.getType()) {
					
						case TEMPERATURE:
							
							if (config.getPolicyGroup().getSeason().equals(Season.WINTER)) {
								// danger range
								if (sensor.getValue() <= (config.getPolicy().getOptimalTemperature() - Policy.OPTIMAL_MARGIN - config.getPolicy().getDangerMargin())) 
									smartRoomsData.get(config.getSmartRoom().getId()).put(SensorType.TEMPERATURE, Configurator.DANGER_LOW_TEMP_CODE);
								// danger priority (danger temp -1)
								if (sensor.getValue() <= (config.getPolicy().getOptimalTemperature() - Policy.OPTIMAL_MARGIN - config.getPolicy().getDangerMargin() - 1)) 
									smartRoomsData.get(config.getSmartRoom().getId()).put(SensorType.TEMPERATURE, Configurator.DANGER_PRIORITY_LOW_TEMP_CODE);
								// reactive range
								else if (sensor.getValue() <= (config.getPolicy().getOptimalTemperature() - Policy.OPTIMAL_MARGIN - config.getPolicy().getReactiveMargin()))
									smartRoomsData.get(config.getSmartRoom().getId()).put(SensorType.TEMPERATURE, Configurator.LOW_TEMP_CODE);
								// optimal
								else {
									smartRoomsData.get(config.getSmartRoom().getId()).put(SensorType.TEMPERATURE, Configurator.OPT_TEMP_CODE);
								}
							} else {
								// danger range
								if (sensor.getValue() >= (config.getPolicy().getOptimalTemperature() + Policy.OPTIMAL_MARGIN + config.getPolicy().getDangerMargin()))
									smartRoomsData.get(config.getSmartRoom().getId()).put(SensorType.TEMPERATURE, Configurator.DANGER_HIGH_TEMP_CODE);
								// danger priority (danger temp +1)
								if (sensor.getValue() >= (config.getPolicy().getOptimalTemperature() + Policy.OPTIMAL_MARGIN + config.getPolicy().getDangerMargin() + 1))
									smartRoomsData.get(config.getSmartRoom().getId()).put(SensorType.TEMPERATURE, Configurator.DANGER_HIGH_TEMP_CODE);
								// reactive range
								else if (sensor.getValue() >= (config.getPolicy().getOptimalTemperature() + Policy.OPTIMAL_MARGIN + config.getPolicy().getReactiveMargin())) 
									smartRoomsData.get(config.getSmartRoom().getId()).put(SensorType.TEMPERATURE, Configurator.HIGH_TEMP_CODE);
								// optimal
								else {
									smartRoomsData.get(config.getSmartRoom().getId()).put(SensorType.TEMPERATURE, Configurator.OPT_TEMP_CODE);
								}
							}
							
							break;
							
						case MOTION:
							
							// reaction
							if (sensor.getValue() == 1) {
								// Remove the temp sensor from the update map
								if (config.getSensors().containsKey(SensorType.TEMPERATURE)) {
									if (config.getSensors().get(SensorType.TEMPERATURE).getValue() != 0L && config.getSensors().get(SensorType.TEMPERATURE).getValue() < (config.getPolicy().getOptimalTemperature() - Policy.OPTIMAL_MARGIN)) {
										smartRoomsData.get(config.getSmartRoom().getId()).put(SensorType.MOTION, Configurator.ON);
									}									
								}
								
							} else {
								smartRoomsData.get(config.getSmartRoom().getId()).put(SensorType.MOTION, Configurator.OFF);
							}
							break;
							
						case CONTACT:
							// sensor.getValue() can be 0 or 1 (inactive, active)
							smartRoomsData.get(config.getSmartRoom().getId()).put(SensorType.CONTACT, (int)sensor.getValue());						
							break;
					}
				}
			}
		} catch (Exception e) {
			LOGGER.error("[Analyzer]::[analyzeSensorsValue] --- " + e.getMessage());
			e.printStackTrace();
		}
		
		// Notify the Planner
		planner.planning(smartRoomsData, this.actualConfigurations, this.clock);
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
			// set sensors
			if (!sm.getSensors().isEmpty()) {
				for (Sensor sensor : sm.getSensors()) {
					this.actualConfigurations.get(sm.getId()).getSensors().put(sensor.getType(), sensor);
				}				
			}
			
			// set active policy group
			PolicyGroup policyGroup = this.actualConfigurations.get(sm.getId()).getPolicyGroup();
			if (policyGroup == null || (policyGroup != null && (policyGroup.getStartDate().compareTo(this.clock.toLocalDate()) > 0 || policyGroup.getEndDate().compareTo(this.clock.toLocalDate()) < 0))) {
				for (PolicyGroup group : this.policyGroups.get(sm.getId())) {
					if (group.getStartDate().compareTo(this.clock.toLocalDate()) <= 0 && group.getEndDate().compareTo(this.clock.toLocalDate()) > 0) {
						group.setActive(true);
						this.actualConfigurations.get(sm.getId()).setPolicyGroup(group);
					}
				}
			}

			// Set active policy
			Policy currentPolicy = this.actualConfigurations.get(sm.getId()).getPolicy();
			if (currentPolicy == null || (currentPolicy != null && (currentPolicy.getStartHour().getHour() > this.clock.getHour() || this.clock.getHour() > currentPolicy.getEndHour().getHour()))) {
				this.actualConfigurations.get(sm.getId()).setPolicy(
					this.setActivePolicyByDate(this.actualConfigurations.get(sm.getId()).getPolicyGroup().getPolicies())
				);			
			}
		}
	}
	
	/**
	 * Set current policy by current datetime
	 * @param policies
	 */
	private Policy setActivePolicyByDate(List<Policy> policies) {
		for (Policy p : policies) {
			// es. 1:01 == 1:45 && 1:01 <= 1:45 && 2:00 > 1:45
			if (
				(
					p.getStartHour().getHour() == this.clock.getHour() && 
					p.getStartHour().getMinute() <= this.clock.getMinute() && 
					p.getEndHour().getHour() > this.clock.getHour() 
				) ||
				(
					// es. 1:01 < 2:00 && 2:00 == 2:00 && 2:00 == 2:00
					p.getStartHour().getHour() < this.clock.getHour() && 
					p.getEndHour().getHour() == this.clock.getHour() &&
					p.getEndHour().getMinute() == this.clock.getMinute()				
				) ||
				(
					p.getStartHour().getHour() == 23 && 
					this.clock.getHour() == 23 && 
					this.clock.getMinute() > 1 
				)
				
			) {
				p.setActive(true);
				return p;
			}
		}
		return null;
	}
}