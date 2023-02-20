package it.univaq.disim.seas.smarthomeclima.knowledgebase.business.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import it.univaq.disim.seas.smarthomeclima.knowledgebase.business.PolicyService;
import it.univaq.disim.seas.smarthomeclima.knowledgebase.business.exception.BusinessException;
import it.univaq.disim.seas.smarthomeclima.knowledgebase.business.repositories.PolicyRepository;
import it.univaq.disim.seas.smarthomeclima.knowledgebase.domain.Policy;

@Service
@Transactional
public class PolicyServiceImpl implements PolicyService {

	@Autowired
	private PolicyRepository policyRepository;
	
	@Override
	public Policy findById(Integer id) throws BusinessException {
		try {
			return this.policyRepository.findById(id).get();	
		} catch (DataAccessException e) {
            throw new BusinessException(e);
        }
	}

	@Override
	public List<Policy> findAll() throws BusinessException {
		try {
			return this.policyRepository.findAll();	
		} catch (DataAccessException e) {
            throw new BusinessException(e);
        }
	}

	@Override
	public void createPolicy(Policy policy) throws BusinessException {
		try {
			this.policyRepository.save(policy);	
		} catch (DataAccessException e) {
            throw new BusinessException(e);
        }		
	}

	@Override
	public void updatePolicy(Policy policy) throws BusinessException {
		try {
			this.policyRepository.save(policy);	
		} catch (DataAccessException e) {
            throw new BusinessException(e);
        }		
	}

	@Override
	public void upsertMultiplePolicy(List<Policy> policies) throws BusinessException {
		try {
			this.policyRepository.saveAll(policies);
		} catch (DataAccessException e) {
            throw new BusinessException(e);
        }	
	}
	
	@Override
	public void deletePolicy(Integer id) throws BusinessException {
		try {
			this.policyRepository.deleteById(id);
		} catch (DataAccessException e) {
            throw new BusinessException(e);
        }		
	}

	@Override
	public void deleteMultiplePolicy(List<Policy> policies) throws BusinessException {
		try {
			this.policyRepository.deleteAll(policies);
		} catch (DataAccessException e) {
            throw new BusinessException(e);
        }		
	}

}
