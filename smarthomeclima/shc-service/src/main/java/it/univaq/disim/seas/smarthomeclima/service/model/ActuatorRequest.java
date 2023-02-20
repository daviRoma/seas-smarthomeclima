package it.univaq.disim.seas.smarthomeclima.service.model;

import java.util.List;

import it.univaq.disim.seas.smarthomeclima.knowledgebase.domain.Actuator;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode
public class ActuatorRequest {
	private Integer smartRoomId;
	private List<Actuator> actuators;
}
