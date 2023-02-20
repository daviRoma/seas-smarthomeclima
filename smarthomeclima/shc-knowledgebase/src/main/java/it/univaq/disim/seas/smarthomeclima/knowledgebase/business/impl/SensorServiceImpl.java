package it.univaq.disim.seas.smarthomeclima.knowledgebase.business.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import it.univaq.disim.seas.smarthomeclima.knowledgebase.business.SensorService;
import it.univaq.disim.seas.smarthomeclima.knowledgebase.business.exception.BusinessException;
import it.univaq.disim.seas.smarthomeclima.knowledgebase.business.repositories.SensorRepository;
import it.univaq.disim.seas.smarthomeclima.knowledgebase.domain.Sensor;
import it.univaq.disim.seas.smarthomeclima.knowledgebase.domain.SmartRoom;

@Service
@Transactional
public class SensorServiceImpl implements SensorService {

	@Autowired
	private SensorRepository sensorRepository;
	
	@Override
	public Sensor findById(Integer id) throws BusinessException {
		try {
			return this.sensorRepository.findById(id).get();	
		} catch (DataAccessException e) {
            throw new BusinessException(e);
        }
	}

	@Override
	public List<Sensor> findAll() throws BusinessException {
		try {
			return this.sensorRepository.findAll();	
		} catch (DataAccessException e) {
            throw new BusinessException(e);
        }
	}
	
	@Override
	public List<Sensor> findAllBySmartRoom(SmartRoom smartRoom) throws BusinessException {
		try {
			return this.sensorRepository.findAllBySmartRoom(smartRoom);	
		} catch (DataAccessException e) {
            throw new BusinessException(e);
        }
	}

	@Override
	public void createSensor(Sensor sensor) throws BusinessException {
		try {
			this.sensorRepository.save(sensor);
		} catch (DataAccessException e) {
            throw new BusinessException(e);
        }
	}

	@Override
	public void updateSensor(Sensor sensor) throws BusinessException {
		try {
			this.sensorRepository.save(sensor);
		} catch (DataAccessException e) {
            throw new BusinessException(e);
        }		
	}

	@Override
	public void deleteSensor(Integer id) throws BusinessException {
		try {
			this.sensorRepository.deleteById(id);
		} catch (DataAccessException e) {
            throw new BusinessException(e);
        }		
	}

}
