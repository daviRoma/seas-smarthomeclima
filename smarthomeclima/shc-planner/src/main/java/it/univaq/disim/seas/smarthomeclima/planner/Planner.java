package it.univaq.disim.seas.smarthomeclima.planner;

import java.util.ArrayList;
import java.util.Calendar;
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
	public void planning(Map<Integer, HashMap<SensorType, Integer>> smartRoomStates, Map<Integer, Configuration> actualConfigurations, Calendar clock) throws BusinessException {
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
							if (act.getType().equals(ActuatorType.RADIATOR)) actions.get(entry.getKey()).add(new Execution(act.getId(), Configurator.OFF));
						}						
					} else {
						// Get all actuator of type CONDITIONER
						for (Actuator act : actualConfigurations.get(entry.getKey()).getSmartRoom().getActuators()) {
							if (act.getType().equals(ActuatorType.CONDITIONER)) actions.get(entry.getKey()).add(new Execution(act.getId(), Configurator.OFF));
						}
					}
								
					this.activePianifications.get(entry.getKey()).setEndDate(clock);
					this.activePianifications.get(entry.getKey()).setActive(false);
					
					LOGGER.info("[Planner]::[plannig] --- Deactivate pianification");
					this.pianificationService.updatePianification(this.activePianifications.get(entry.getKey()));
				}
			} else {
				// ottengo il set dei possibili valori dei power impostabili per gli attuatori secondo la modalità corrente
				ArrayList<Integer> modeValues = Configurator.MODE_POWER.get(
					actualConfigurations.get(entry.getKey()).getPolicyGroup().getMode()
				);
				
				// based on smart room state check if is necessary to activate a plan

				// Temperature
				Integer temperature = entry.getValue().get(SensorType.TEMPERATURE);
				Integer motion = entry.getValue().get(SensorType.MOTION);
				Integer contact = entry.getValue().get(SensorType.CONTACT);
				
				if (motion == 1 || temperature == Configurator.LOW_TEMP_CODE || temperature == Configurator.HIGH_TEMP_CODE) {
					if (actualConfigurations.get(entry.getKey()).getPolicyGroup().getSeason().equals(Season.WINTER)) {
						// Get all actuator of type RADIATOR
						for (Actuator act : actualConfigurations.get(entry.getKey()).getSmartRoom().getActuators()) {
							if (act.getType().equals(ActuatorType.RADIATOR)) {
								actions.get(entry.getKey()).add(this.setRadiator(temperature, modeValues.get(0), act.getId()));								
							}
						}
					} else {
						for (Actuator act : actualConfigurations.get(entry.getKey()).getSmartRoom().getActuators()) {
							if (act.getType().equals(ActuatorType.CONDITIONER)) {
								actions.get(entry.getKey()).add(this.setConditioner(temperature, modeValues.get(0), act.getId()));								
							}
						}
					}
					// Danger case
				} else if (motion == 1 || temperature == Configurator.DANGER_LOW_TEMP_CODE || temperature == Configurator.DANGER_HIGH_TEMP_CODE) {
					if (actualConfigurations.get(entry.getKey()).getPolicyGroup().getSeason().equals(Season.WINTER)) {
						// Get all actuator of type RADIATOR
						for (Actuator act : actualConfigurations.get(entry.getKey()).getSmartRoom().getActuators()) {
							if (act.getType().equals(ActuatorType.RADIATOR)) {
								actions.get(entry.getKey()).add(this.setRadiator(temperature, modeValues.size() > 1 ? modeValues.get(1) : modeValues.get(0), act.getId()));								
							}
						}
					} else {
						for (Actuator act : actualConfigurations.get(entry.getKey()).getSmartRoom().getActuators()) {
							if (act.getType().equals(ActuatorType.CONDITIONER)) {
								actions.get(entry.getKey()).add(this.setConditioner(temperature, modeValues.size() > 1 ? modeValues.get(1) : modeValues.get(0), act.getId()));								
							}
						}
					}
					// close window
					for (Actuator act : actualConfigurations.get(entry.getKey()).getSmartRoom().getActuators()) {
						if (act.getType().equals(ActuatorType.WINDOW)) {
							actions.get(entry.getKey()).add(this.closeWindow(contact, act.getId()));								
						}
					}
				}
				
				// Create pianification
				Calendar targetTime = clock;
				targetTime.add(Calendar.MINUTE, Configurator.MODE_DURATION.get(actualConfigurations.get(entry.getKey()).getPolicyGroup().getMode()));
				
				Pianification pianification = new Pianification(
					actualConfigurations.get(entry.getKey()).getPolicyGroup().getMode(), 
					true,
					clock,
					targetTime,
					actualConfigurations.get(entry.getKey()).getSmartRoom()
				);
				
				LOGGER.info("[Planner]::[planning] --- Save new pianification");
				this.pianificationService.createPianification(pianification);
				
			}
		}
								
		// Notify the Executor		
		executor.executor(actions);
	}
	

	/**
	 * Set the room conditioner power
	 * @param temp
	 * @param power
	 * @param actuatorId
	 * @return Execution
	 */
	private Execution setConditioner(Integer temp, int power, int actuatorId) {

		// set the conditioner to the power selected 
		if (temp == Configurator.LOW_TEMP_CODE) {
			return new Execution(actuatorId, power);
		}
		return null;
	}
	
	/**
	 * Set the room radiator power
	 * @param temp
	 * @param power
	 * @param actuatorId
	 * @return Execution
	 */
	private Execution setRadiator(Integer temp, int power, int actuatorId) {

		// set the radiator to the power selected
		if ( temp == Configurator.HIGH_TEMP_CODE) {	
			return new Execution(actuatorId, power);
		}
		return null;
	}
	
	/**
	 * Close the smart window.
	 * @param contact
	 * @param actuatorId
	 * @return Execution
	 */
	private Execution closeWindow(Integer contact, int actuatorId) {

		if ( contact == Configurator.OFF) {	
			return new Execution(actuatorId, Configurator.ON);
		}
		return null;
	}
	
}							