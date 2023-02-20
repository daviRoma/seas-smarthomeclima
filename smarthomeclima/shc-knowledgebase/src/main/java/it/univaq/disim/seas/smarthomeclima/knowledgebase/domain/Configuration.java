package it.univaq.disim.seas.smarthomeclima.knowledgebase.domain;

import java.util.HashMap;
import java.util.Map;

import lombok.Data;

@Data
public class Configuration {

	private SmartRoom smartRoom;
	private PolicyGroup policyGroup;
	private Policy policy;
	private Map<SensorType, Sensor> sensors;
	
	public Configuration(SmartRoom sm, PolicyGroup policyGroup, Policy policy) {
		this.setSmartRoom(sm);
		this.setPolicyGroup(policyGroup);
		this.setPolicy(policy);
		this.sensors = new HashMap<SensorType, Sensor>() {{ 
			put(SensorType.TEMPERATURE, null);
			put(SensorType.MOTION, null);
			put(SensorType.CONTACT, null);
		}};
	}

}
