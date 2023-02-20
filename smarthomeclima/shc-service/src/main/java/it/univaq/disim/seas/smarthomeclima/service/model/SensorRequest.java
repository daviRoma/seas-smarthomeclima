package it.univaq.disim.seas.smarthomeclima.service.model;

import java.util.List;

import it.univaq.disim.seas.smarthomeclima.knowledgebase.domain.Sensor;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode
public class SensorRequest {
	private Integer smartRoomId;
	private List<Sensor> sensors;
}
