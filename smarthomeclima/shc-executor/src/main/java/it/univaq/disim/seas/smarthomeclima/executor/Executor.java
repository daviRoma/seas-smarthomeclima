package it.univaq.disim.seas.smarthomeclima.executor;

import java.util.ArrayList;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import it.univaq.disim.seas.smarthomeclima.broker.MqttBroker;
import it.univaq.disim.seas.smarthomeclima.knowledgebase.domain.MessageChannel;
import it.univaq.disim.seas.smarthomeclima.knowledgebase.model.ChannelPayload;
import it.univaq.disim.seas.smarthomeclima.knowledgebase.model.Execution;

@Component
public class Executor {

	private static final Logger LOGGER = LoggerFactory.getLogger(Executor.class);

	@Autowired
	private MqttBroker broker;

	/**
	 * Executor.
	 * For each room sends the actions generated from the planner. 
	 * @param actions
	 */
	public void executor(Map<Integer, ArrayList<Execution>> actions) {
		LOGGER.info("[Executor]::[executor] --- Perform the planned actions");
		
		ObjectMapper objectMapper = new ObjectMapper();

		for (Map.Entry<Integer, ArrayList<Execution>> action : actions.entrySet()) {
			
			for (Execution exec : action.getValue()) {
									
				try {
					String payload = objectMapper.writeValueAsString(new ChannelPayload(exec.getActuatorId(), exec.getAction()));
					
					this.broker.publish(
						MessageChannel.MONITOR_EXECUTOR_CHANNEL
							.replace("{srId}", Integer.toString(action.getKey()))
							.replace("{actId}", Integer.toString(exec.getActuatorId())),
							payload
						);
					
					// actuators are listening
					this.broker.publish(
						MessageChannel.ACTUATOR_CHANNEL
							.replace("{srId}", Integer.toString(action.getKey()))
							.replace("{actId}", Integer.toString(exec.getActuatorId())),
							payload
						);
					
				} catch (JsonProcessingException e) {
					LOGGER.error("[Executor]::[executor] --- Error performing actions");
					e.printStackTrace();
				}
			}	
		}
	}
	
}