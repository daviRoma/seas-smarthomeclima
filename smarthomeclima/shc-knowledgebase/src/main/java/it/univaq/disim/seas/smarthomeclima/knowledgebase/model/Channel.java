package it.univaq.disim.seas.smarthomeclima.knowledgebase.model;

import java.util.ArrayList;
import java.util.List;

import lombok.Data;

@Data
public class Channel {

	private String topic;
	private List<String> messages;
	
	public Channel(String topic, String mess) {
		this.topic = topic;
		this.messages = new ArrayList<String>() {{ add(mess); }};
	}
	
	public Channel(String topic) {
		this.topic = topic;
		this.messages = new ArrayList<String>();
	}
}
