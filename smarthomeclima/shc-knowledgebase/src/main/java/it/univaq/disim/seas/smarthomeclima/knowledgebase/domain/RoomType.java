package it.univaq.disim.seas.smarthomeclima.knowledgebase.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonFormat(shape = JsonFormat.Shape.STRING)
public enum RoomType {
	
	@JsonProperty("BED_ROOM")
	BED_ROOM("BED_ROOM"),
	@JsonProperty("BATH_ROOM")
	BATH_ROOM("BATH_ROOM"),
	@JsonProperty("LIVING_ROOM")
	LIVING_ROOM("LIVING_ROOM"),
	@JsonProperty("DINING_ROOM")
	DINING_ROOM("DINING_ROOM"),
	@JsonProperty("KITCHEN_ROOM")
	KITCHEN_ROOM("KITCHEN_ROOM");

	private String displayValue;
	
	private RoomType(String value) {
		this.displayValue = value;
	}
	
	public String getDisplayValue() {
		return this.displayValue;
	}
}
