package it.univaq.disim.seas.smarthomeclima.knowledgebase.business;

import java.util.List;

import it.univaq.disim.seas.smarthomeclima.knowledgebase.business.exception.BusinessException;
import it.univaq.disim.seas.smarthomeclima.knowledgebase.domain.SmartRoom;

public interface SmartRoomService {

	SmartRoom findById(Integer id) throws BusinessException;
	List<SmartRoom> findByIds(List<Integer> ids) throws BusinessException;
	List<SmartRoom> findAll() throws BusinessException;
	
	void createSmartRoom(SmartRoom smartRoom) throws BusinessException;
	void updateSmartRoom(SmartRoom smartRoom) throws BusinessException;
	void deleteSmartRoom(Integer id)throws BusinessException;
	
}
