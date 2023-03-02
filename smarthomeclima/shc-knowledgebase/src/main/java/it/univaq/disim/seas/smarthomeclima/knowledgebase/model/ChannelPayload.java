package it.univaq.disim.seas.smarthomeclima.knowledgebase.model;

import java.time.LocalDateTime;

import org.springframework.data.annotation.CreatedDate;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateTimeDeserializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateTimeSerializer;

import lombok.Data;

@Data
public class ChannelPayload {
	// device id
	private int id;
	
	private double value;
	
	@CreatedDate
	@JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd HH:mm:ss")
    @JsonDeserialize(using = LocalDateTimeDeserializer.class)
    @JsonSerialize(using = LocalDateTimeSerializer.class)
	private LocalDateTime createdDate;
	
	public ChannelPayload() { }
	
	public ChannelPayload(int id, double value) {
		this.id = id;
		this.value = value;
		this.createdDate = LocalDateTime.now();
	}
    
    @JsonCreator(mode = JsonCreator.Mode.PROPERTIES)
	public ChannelPayload(@JsonProperty("id") int id, @JsonProperty("value") double value, @JsonProperty("createdDate") LocalDateTime createdDate) {
		this.id = id;
		this.value = value;
		this.createdDate = createdDate;
	}
}
