package it.univaq.disim.seas.smarthomeclima.service.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

import it.univaq.disim.seas.smarthomeclima.knowledgebase.domain.PolicyGroup;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode
@Builder
public class PolicyGroupRequest {
	private Integer smartRoomId;
	private List<PolicyGroup> policyGroups;
	
	@JsonCreator
    public PolicyGroupRequest(@JsonProperty("smartRoomId") Integer smartRoomId, @JsonProperty("policyGroup") List<PolicyGroup> policyGroups) {
        this.smartRoomId = smartRoomId;
        this.policyGroups = policyGroups;
    }
}
