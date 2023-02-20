package it.univaq.disim.seas.smarthomeclima.knowledgebase.business;

import java.util.List;

import java.util.Map;
import java.util.Set;

import it.univaq.disim.seas.smarthomeclima.knowledgebase.business.exception.BusinessException;
import it.univaq.disim.seas.smarthomeclima.knowledgebase.domain.Pianification;

public interface PianificationService {

	Pianification findById(Integer id) throws BusinessException;
	List<Pianification> findAll() throws BusinessException;
	Map<Integer, Pianification> getAllActive(Set<Integer> ids) throws BusinessException;
	
	void createPianification(Pianification pianification) throws BusinessException;
	void updatePianification(Pianification pianification) throws BusinessException;
	void deletePianification(Integer id) throws BusinessException;
	
}
