package it.univaq.disim.seas.smarthomeclima.knowledgebase.business.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import it.univaq.disim.seas.smarthomeclima.knowledgebase.business.ActuatorService;
import it.univaq.disim.seas.smarthomeclima.knowledgebase.business.exception.BusinessException;
import it.univaq.disim.seas.smarthomeclima.knowledgebase.business.repositories.ActuatorRepository;
import it.univaq.disim.seas.smarthomeclima.knowledgebase.domain.Actuator;

@Service
@Transactional
public class ActuatorServiceImpl implements ActuatorService {

	@Autowired
	private ActuatorRepository actuatorRepository;
	
	@Override
	public Actuator findById(Integer id) throws BusinessException {
		try {
			return this.actuatorRepository.findById(id).get();	
		} catch (DataAccessException e) {
            throw new BusinessException(e);
        }
	}

	@Override
	public List<Actuator> findAll() throws BusinessException {
		try {
			return this.actuatorRepository.findAll();	
		} catch (DataAccessException e) {
            throw new BusinessException(e);
        }
	}

	@Override
	public void createActuator(Actuator act) throws BusinessException {
		try {
			this.actuatorRepository.save(act);
		} catch (DataAccessException e) {
            throw new BusinessException(e);
        }
	}

	@Override
	public void updateActuator(Actuator act) throws BusinessException {
		try {
			this.actuatorRepository.save(act);
		} catch (DataAccessException e) {
            throw new BusinessException(e);
        }		
	}

	@Override
	public void upsertMultipleActuators(List<Actuator> actuators) throws BusinessException {
		try {
			this.actuatorRepository.saveAll(actuators);
		} catch (DataAccessException e) {
            throw new BusinessException(e);
        }		
	}
	
	@Override
	public void deleteActuator(Integer id) throws BusinessException {
		try {
			this.actuatorRepository.deleteById(id);
		} catch (DataAccessException e) {
            throw new BusinessException(e);
        }		
	}

}
