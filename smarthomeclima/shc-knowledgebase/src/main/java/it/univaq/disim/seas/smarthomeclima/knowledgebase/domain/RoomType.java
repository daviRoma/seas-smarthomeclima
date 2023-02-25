package it.univaq.disim.seas.smarthomeclima.knowledgebase.domain;

public enum RoomType {
	
	BED_ROOM("BED_ROOM"),
	BATH_ROOM("BATH_ROOM"),
	LIVING_ROOM("LIVING_ROOM"),
	DINING_ROOM("DINING_ROOM"),
	KITCHEN_ROOM("KITCHEN_ROOM");

	
	private String displayValue;
	
	private RoomType(String value) {
		this.displayValue = value;
	}
	
	public String getDisplayValue() {
		return this.displayValue;
	}
}
