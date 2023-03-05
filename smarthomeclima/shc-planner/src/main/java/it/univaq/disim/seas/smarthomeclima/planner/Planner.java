package it.univaq.disim.seas.smarthomeclima.planner;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import it.univaq.disim.seas.smarthomeclima.knowledgebase.domain.Actuator;
import it.univaq.disim.seas.smarthomeclima.knowledgebase.domain.ActuatorType;
import it.univaq.disim.seas.smarthomeclima.knowledgebase.domain.Configuration;
import it.univaq.disim.seas.smarthomeclima.knowledgebase.domain.Configurator;
import it.univaq.disim.seas.smarthomeclima.knowledgebase.domain.Mode;
import it.univaq.disim.seas.smarthomeclima.knowledgebase.domain.SensorType;
import it.univaq.disim.seas.smarthomeclima.knowledgebase.model.Execution;
import it.univaq.disim.seas.smarthomeclima.knowledgebase.domain.Pianification;
import it.univaq.disim.seas.smarthomeclima.knowledgebase.domain.Season;
import it.univaq.disim.seas.smarthomeclima.knowledgebase.business.PianificationService;
import it.univaq.disim.seas.smarthomeclima.knowledgebase.business.exception.BusinessException;
import it.univaq.disim.seas.smarthomeclima.executor.Executor;

@Component
public class Planner {
	private static final Logger LOGGER = LoggerFactory.getLogger(Planner.class);

	@Autowired
	private Executor executor;
	
	@Autowired
	private PianificationService pianificationService;
	
	private Map<Integer, Pianification> activePianifications;

	/**
	 * Planning
	 * @param smartRoomStates
	 * @param actualConfigurations
	 * @param clock
	 * @throws BusinessException 
	 */
	public void planning(Map<Integer, HashMap<SensorType, Integer>> smartRoomStates, Map<Integer, Configuration> actualConfigurations, LocalDateTime clock) throws BusinessException {
		LOGGER.info("[Planner]::[planning] --- Run planner");
		
		Map<Integer, ArrayList<Execution>> actions = new HashMap<Integer, ArrayList<Execution>>();
		
		// Get all active pianifications for each smartroom
		this.activePianifications = this.pianificationService.getAllActive(actualConfigurations.keySet());
		
		for (Map.Entry<Integer, HashMap<SensorType, Integer>> entry : smartRoomStates.entrySet()) {

			actions.putIfAbsent(entry.getKey(), new ArrayList<Execution>());
			
			// Check if active plan can be deactivated
			if (this.activePianifications.containsKey(entry.getKey())) {
				
				// deactivate the plan if the opt temperature will be reached
				if (entry.getValue().containsKey(SensorType.TEMPERATURE) && entry.getValue().get(SensorType.TEMPERATURE) == Configurator.OPT_TEMP_CODE) {
								
					if (actualConfigurations.get(entry.getKey()).getPolicyGroup().getSeason().equals(Season.WINTER)) {
						// Get all actuator of type RADIATOR
						for (Actuator act : actualConfigurations.get(entry.getKey()).getSmartRoom().getActuators()) {
							if (act.getType().equals(ActuatorType.RADIATOR)) actions.get(entry.getKey()).add(new Execution(act.getId(), Configurator.OFF, 0));	
						}						
					} else {
						// Get all actuator of type CONDITIONER
						for (Actuator act : actualConfigurations.get(entry.getKey()).getSmartRoom().getActuators()) {
							if (act.getType().equals(ActuatorType.CONDITIONER)) actions.get(entry.getKey()).add(new Execution(act.getId(), Configurator.OFF, 0));
						}
					}
								
					this.activePianifications.get(entry.getKey()).setEndDate(clock);
					this.activePianifications.get(entry.getKey()).setActive(false);
					
					LOGGER.info("[Planner]::[plannig] --- Deactivate pianification -- " + entry.getKey());
					this.pianificationService.updatePianification(this.activePianifications.get(entry.getKey()));
				}
			} else {
				Mode currentMode = actualConfigurations.get(entry.getKey()).getPolicyGroup().getMode();
				
				// get the maximum power values from the current mode
				ArrayList<Integer> modeValues = Configurator.MODE_POWER.get(currentMode);
				
				// based on smart room state check if is necessary to activate a plan

				// Temperature
				Integer temperatureCode = entry.getValue().get(SensorType.TEMPERATURE);
				Integer motion = entry.getValue().containsKey(SensorType.MOTION) ? entry.getValue().get(SensorType.MOTION) : 0;
				Integer contact = entry.getValue().get(SensorType.CONTACT);
				
				// Set target pianification time
				LocalDateTime targetPianificationTime = clock;

				
				// Reactive case
				if (motion == 1 || temperatureCode == Configurator.LOW_TEMP_CODE || temperatureCode == Configurator.HIGH_TEMP_CODE) {
					if (actualConfigurations.get(entry.getKey()).getPolicyGroup().getSeason().equals(Season.WINTER)) {
						// Get all actuator of type RADIATOR
						for (Actuator act : actualConfigurations.get(entry.getKey()).getSmartRoom().getActuators()) {
							if (act.getType().equals(ActuatorType.RADIATOR)) {
								actions.get(entry.getKey()).add(new Execution(act.getId(), Configurator.ON, modeValues.get(0)));
							}
						}
					} else {
						for (Actuator act : actualConfigurations.get(entry.getKey()).getSmartRoom().getActuators()) {
							if (act.getType().equals(ActuatorType.CONDITIONER)) {
								actions.get(entry.getKey()).add(new Execution(act.getId(), Configurator.ON, modeValues.get(0)));								
							}
						}
					}
					targetPianificationTime.plusMinutes(Configurator.MODE_DURATION.get(actualConfigurations.get(entry.getKey()).getPolicyGroup().getMode()));
					// Danger case
				} else if (motion == 1 || temperatureCode == Configurator.DANGER_LOW_TEMP_CODE || temperatureCode == Configurator.DANGER_HIGH_TEMP_CODE) {
					if (actualConfigurations.get(entry.getKey()).getPolicyGroup().getSeason().equals(Season.WINTER)) {
						// Get all actuator of type RADIATOR
						for (Actuator act : actualConfigurations.get(entry.getKey()).getSmartRoom().getActuators()) {
							if (act.getType().equals(ActuatorType.RADIATOR)) {
								actions.get(entry.getKey()).add(new Execution(act.getId(), Configurator.ON, modeValues.size() > 1 ? modeValues.get(1) : modeValues.get(0)));
							}
						}
					} else {
						for (Actuator act : actualConfigurations.get(entry.getKey()).getSmartRoom().getActuators()) {
							if (act.getType().equals(ActuatorType.CONDITIONER)) {
								actions.get(entry.getKey()).add(new Execution(act.getId(), Configurator.ON, modeValues.size() > 1 ? modeValues.get(1) : modeValues.get(0)));
							}
						}
					}
					// close window
					for (Actuator act : actualConfigurations.get(entry.getKey()).getSmartRoom().getActuators()) {
						if (act.getType().equals(ActuatorType.WINDOW)) {
							actions.get(entry.getKey()).add(new Execution(act.getId(), Configurator.ON, 1));								
						}
					}
					targetPianificationTime.plusMinutes(Configurator.MODE_DURATION.get(actualConfigurations.get(entry.getKey()).getPolicyGroup().getMode()));

					// Danger Priority case
				} else if (temperatureCode == Configurator.DANGER_PRIORITY_LOW_TEMP_CODE || temperatureCode == Configurator.DANGER_PRIORITY_LOW_TEMP_CODE) {
					// Set current mode to POWER
					currentMode = Mode.POWER;
					
					if (actualConfigurations.get(entry.getKey()).getPolicyGroup().getSeason().equals(Season.WINTER)) {
						// Get all actuator of type RADIATOR
						for (Actuator act : actualConfigurations.get(entry.getKey()).getSmartRoom().getActuators()) {
							if (act.getType().equals(ActuatorType.RADIATOR)) {
								// use the maximum power of the power mode
								actions.get(entry.getKey()).add(
									new Execution(
										act.getId(),
										Configurator.ON,
										Configurator.MODE_POWER.get(Mode.POWER).get(Configurator.MODE_POWER.get(Mode.POWER).size()-1)
									)
								);								
							}
						}
					} else {
						for (Actuator act : actualConfigurations.get(entry.getKey()).getSmartRoom().getActuators()) {
							if (act.getType().equals(ActuatorType.CONDITIONER)) {
								actions.get(entry.getKey()).add(
									new Execution(
										act.getId(), 
										Configurator.ON,
										Configurator.MODE_POWER.get(Mode.POWER).get(Configurator.MODE_POWER.get(Mode.POWER).size()-1)
									)
								);
							}
						}
					}
					// close window
					for (Actuator act : actualConfigurations.get(entry.getKey()).getSmartRoom().getActuators()) {
						if (act.getType().equals(ActuatorType.WINDOW)) {
							if (contact == Configurator.OFF) actions.get(entry.getKey()).add(new Execution(act.getId(), Configurator.ON, 1));																
							
						}
					}
					targetPianificationTime.plusMinutes(Configurator.MODE_DURATION.get(Mode.POWER));
				}
				
				
				// Create pianification
				Pianification pianification = new Pianification(
					currentMode, 
					true,
					clock,
					targetPianificationTime,
					actualConfigurations.get(entry.getKey()).getSmartRoom()
				);
				
				LOGGER.info("[Planner]::[planning] --- Save new pianification --- SmartRoom ---  " + actualConfigurations.get(entry.getKey()).getSmartRoom().getId());
				this.pianificationService.createPianification(pianification);
				
			}
		}
								
		// Notify the Executor		
		executor.executor(actions);
	}
	
}							