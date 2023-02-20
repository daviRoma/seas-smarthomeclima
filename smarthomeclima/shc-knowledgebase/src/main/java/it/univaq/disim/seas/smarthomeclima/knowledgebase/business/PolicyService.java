package it.univaq.disim.seas.smarthomeclima.knowledgebase.business;

import java.util.List;

import it.univaq.disim.seas.smarthomeclima.knowledgebase.business.exception.BusinessException;
import it.univaq.disim.seas.smarthomeclima.knowledgebase.domain.Policy;

public interface PolicyService {

	Policy findById(Integer id) throws BusinessException;
	List<Policy> findAll() throws BusinessException;
	void createPolicy(Policy policy) throws BusinessException;
	void updatePolicy(Policy policy) throws BusinessException;
	void upsertMultiplePolicy(List<Policy> policies) throws BusinessException;
	void deletePolicy(Integer id) throws BusinessException;
	void deleteMultiplePolicy(List<Policy> policies) throws BusinessException;
	
}
