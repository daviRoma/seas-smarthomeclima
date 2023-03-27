package it.univaq.disim.seas.smarthomeclima.service.model;


import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class GenericResponse {
	
	private String message;
	private ResponseStatus status;
	
	@JsonCreator
	public GenericResponse(@JsonProperty("message") String message, @JsonProperty("status") ResponseStatus status) {
		this.message = message;
		this.status = status;
	}
}
