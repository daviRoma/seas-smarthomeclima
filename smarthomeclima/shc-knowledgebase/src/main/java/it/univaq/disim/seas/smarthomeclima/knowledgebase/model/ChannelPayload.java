package it.univaq.disim.seas.smarthomeclima.knowledgebase.model;

import java.time.LocalDateTime;

import org.springframework.data.annotation.CreatedDate;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;

@Data
public class ChannelPayload {
	// device id
	private int id;
	
	private double value;
	
	@CreatedDate
	@JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd@HH:mm:ss")
	private LocalDateTime createdDate;
	
	public ChannelPayload(int id, double value) {
		this.id = id;
		this.value = value;
		this.createdDate = LocalDateTime.now();
	}
}
