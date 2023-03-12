package it.univaq.disim.seas.smarthomeclima.service.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

import it.univaq.disim.seas.smarthomeclima.knowledgebase.domain.Policy;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode
@Builder
public class PolicyRequest {
	private Integer policyGroupId;
	private List<Policy> policies;
	
	@JsonCreator
    public PolicyRequest(@JsonProperty("policyGroupId") Integer policyGroupId, @JsonProperty("policies") List<Policy> policies) {
        this.policyGroupId = policyGroupId;
        this.policies = policies;
    }
}
