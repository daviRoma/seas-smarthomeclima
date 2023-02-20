package it.univaq.disim.seas.smarthomeclima.service.model;

import it.univaq.disim.seas.smarthomeclima.knowledgebase.domain.PolicyGroup;
import lombok.Data;

@Data
public class PolicyGroupRequest {
	private Integer smartRoomId;
	private PolicyGroup policyGroup;
}
