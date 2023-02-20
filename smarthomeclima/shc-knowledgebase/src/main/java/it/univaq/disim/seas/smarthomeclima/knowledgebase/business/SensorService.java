package it.univaq.disim.seas.smarthomeclima.knowledgebase.business;

import java.util.List;

import it.univaq.disim.seas.smarthomeclima.knowledgebase.business.exception.BusinessException;
import it.univaq.disim.seas.smarthomeclima.knowledgebase.domain.Sensor;
import it.univaq.disim.seas.smarthomeclima.knowledgebase.domain.SmartRoom;

public interface SensorService {

	Sensor findById(Integer id) throws BusinessException;
	List<Sensor> findAll() throws BusinessException;
	List<Sensor> findAllBySmartRoom(SmartRoom smartRoom) throws BusinessException;
	void createSensor(Sensor sensor) throws BusinessException;
	void updateSensor(Sensor sensor) throws BusinessException;
	void deleteSensor(Integer id) throws BusinessException;
	
}
