package it.univaq.disim.seas.smarthomeclima.knowledgebase.business;

import java.util.List;
import java.util.Map;

import it.univaq.disim.seas.smarthomeclima.knowledgebase.business.exception.BusinessException;
import it.univaq.disim.seas.smarthomeclima.knowledgebase.domain.PolicyGroup;
import it.univaq.disim.seas.smarthomeclima.knowledgebase.domain.SmartRoom;

public interface PolicyGroupService {

	PolicyGroup findById(Integer id) throws BusinessException;
	List<PolicyGroup> findAll() throws BusinessException;
	Map<Integer, List<PolicyGroup>> findAllBySmartRooms(List<SmartRoom> smartRooms) throws BusinessException;
	void createPolicyGroup(PolicyGroup policyGroup) throws BusinessException;
	void updatePolicyGroup(PolicyGroup policyGroup) throws BusinessException;
	void upsertMultiplePolicyGroups(List<PolicyGroup> policyGroups) throws BusinessException;
	void deletePolicyGroup(Integer id) throws BusinessException;
}
