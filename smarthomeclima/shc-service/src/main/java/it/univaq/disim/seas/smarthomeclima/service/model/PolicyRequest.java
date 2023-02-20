package it.univaq.disim.seas.smarthomeclima.service.model;

import java.util.List;

import it.univaq.disim.seas.smarthomeclima.knowledgebase.domain.Policy;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode
public class PolicyRequest {
	private Integer policyGroupId;
	private List<Policy> policies;
}
