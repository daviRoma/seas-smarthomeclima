package it.univaq.disim.seas.smarthomeclima.service.model;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

import it.univaq.disim.seas.smarthomeclima.knowledgebase.domain.PolicyGroup;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class PolicyGroupRequest {
	private Integer smartRoomId;
	private PolicyGroup policyGroup;
	
	@JsonCreator
    public PolicyGroupRequest(@JsonProperty("smartRoomId") Integer smartRoomId, @JsonProperty("policyGroup") PolicyGroup policyGroup) {
        this.smartRoomId = smartRoomId;
        this.policyGroup = policyGroup;
    }
}
