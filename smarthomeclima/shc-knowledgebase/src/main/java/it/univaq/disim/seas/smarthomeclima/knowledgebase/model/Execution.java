package it.univaq.disim.seas.smarthomeclima.knowledgebase.model;

import lombok.Data;

@Data
public class Execution {
	private int actuatorId;
	private int action;
	private int value;
	
	public Execution(int id, int action, int value) {
		this.actuatorId = id;
		this.action = action;
		this.value = value;
	}
}
