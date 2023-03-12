package it.univaq.disim.seas.smarthomeclima.service.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

import it.univaq.disim.seas.smarthomeclima.knowledgebase.domain.Actuator;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode
@Builder
public class ActuatorRequest {
	private Integer smartRoomId;
	private List<Actuator> actuators;
	
	@JsonCreator
    public ActuatorRequest(@JsonProperty("smartRoomId") Integer smartRoomId, @JsonProperty("actuators") List<Actuator> actuators) {
        this.smartRoomId = smartRoomId;
        this.actuators = actuators;
    }
}
