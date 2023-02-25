package it.univaq.disim.seas.smarthomeclima.knowledgebase.business.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import it.univaq.disim.seas.smarthomeclima.knowledgebase.business.PolicyGroupService;
import it.univaq.disim.seas.smarthomeclima.knowledgebase.business.exception.BusinessException;
import it.univaq.disim.seas.smarthomeclima.knowledgebase.business.repositories.PolicyGroupRepository;
import it.univaq.disim.seas.smarthomeclima.knowledgebase.domain.PolicyGroup;

@Service
@Transactional
public class PolicyGroupServiceImpl implements PolicyGroupService {

	@Autowired
	private PolicyGroupRepository policyGroupRepository;
	
	@Override
	public PolicyGroup findById(Integer id) throws BusinessException {
		try {
			return this.policyGroupRepository.findById(id).get();	
		} catch (DataAccessException e) {
            throw new BusinessException(e);
        }
	}

	@Override
	public List<PolicyGroup> findAll() throws BusinessException {
		try {
			return this.policyGroupRepository.findAll();
		} catch (DataAccessException e) {
            throw new BusinessException(e);
        }
	}
	
	@Override
	public Map<Integer, List<PolicyGroup>> findAllBySmartRooms() throws BusinessException {
		Map<Integer, List<PolicyGroup>> response = new HashMap<Integer, List<PolicyGroup>>();
		List<PolicyGroup> queryResult = this.policyGroupRepository.findAll();
		
		try {
			if (queryResult.isEmpty()) return null;
			for (PolicyGroup group : queryResult) {
				if (response.containsKey(group.getSmartRoom().getId())) {
					response.get(group.getSmartRoom().getId()).add(group);
				} else {
					response.put(group.getSmartRoom().getId(), new ArrayList<PolicyGroup>() {{ add(group); }});
				}
			}
			return response;
		} catch (DataAccessException e) {
            throw new BusinessException(e);
        }
	}

	@Override
	public void createPolicyGroup(PolicyGroup policyGroup) throws BusinessException {
		try {
			this.policyGroupRepository.save(policyGroup);
		} catch (DataAccessException e) {
            throw new BusinessException(e);
        }		
	}

	@Override
	public void updatePolicyGroup(PolicyGroup policyGroup) throws BusinessException {
		try {
			this.policyGroupRepository.save(policyGroup);
		} catch (DataAccessException e) {
            throw new BusinessException(e);
        }		
	}

	@Override
	public void upsertMultiplePolicyGroups(List<PolicyGroup> policyGroups) throws BusinessException {
		try {
			this.policyGroupRepository.saveAll(policyGroups);
		} catch (DataAccessException e) {
            throw new BusinessException(e);
        }
	}

	@Override
	public void deletePolicyGroup(Integer id) throws BusinessException {
		try {
			this.policyGroupRepository.deleteById(id);
		} catch (DataAccessException e) {
            throw new BusinessException(e);
        }		
	}

}
