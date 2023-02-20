package it.univaq.disim.seas.smarthomeclima.knowledgebase.model;

import lombok.Data;

@Data
public class Execution {
	private int actuatorId;
	private int action;
	
	public Execution(int id, int action) {
		this.actuatorId = id;
		this.action = action;
	}
}
