package it.univaq.disim.seas.smarthomeclima.service.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

import it.univaq.disim.seas.smarthomeclima.knowledgebase.domain.Sensor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode
@Builder
public class SensorRequest {
	@JsonProperty("smartRoomId")
	private Integer smartRoomId;
	@JsonProperty("sensors")
	private List<Sensor> sensors;
	
	@JsonCreator
    public SensorRequest(@JsonProperty("smartRoomId") Integer smartRoomId, @JsonProperty("sensors") List<Sensor> sensors) {
        this.smartRoomId = smartRoomId;
        this.sensors = sensors;
    }
}
