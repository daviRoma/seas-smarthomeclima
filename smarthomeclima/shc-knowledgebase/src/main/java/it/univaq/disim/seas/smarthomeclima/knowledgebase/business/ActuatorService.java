package it.univaq.disim.seas.smarthomeclima.knowledgebase.business;

import java.util.List;

import it.univaq.disim.seas.smarthomeclima.knowledgebase.business.exception.BusinessException;
import it.univaq.disim.seas.smarthomeclima.knowledgebase.domain.Actuator;

public interface ActuatorService {

	Actuator findById(Integer id) throws BusinessException;
	List<Actuator> findAll() throws BusinessException;
	void createActuator(Actuator act) throws BusinessException;
	void updateActuator(Actuator act) throws BusinessException;
	void upsertMultipleActuators(List<Actuator> actuators) throws BusinessException;
	void deleteActuator(Integer id) throws BusinessException;	
}
