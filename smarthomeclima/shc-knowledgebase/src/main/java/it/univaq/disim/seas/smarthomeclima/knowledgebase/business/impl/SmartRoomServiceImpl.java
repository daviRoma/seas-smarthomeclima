package it.univaq.disim.seas.smarthomeclima.knowledgebase.business.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import it.univaq.disim.seas.smarthomeclima.knowledgebase.business.SmartRoomService;
import it.univaq.disim.seas.smarthomeclima.knowledgebase.business.exception.BusinessException;
import it.univaq.disim.seas.smarthomeclima.knowledgebase.business.repositories.SmartRoomRepository;
import it.univaq.disim.seas.smarthomeclima.knowledgebase.domain.SmartRoom;

@Service
@Transactional
public class SmartRoomServiceImpl implements SmartRoomService {
	
	@Autowired
	private SmartRoomRepository smartRoomRepository;

	@Override
	public SmartRoom findById(Integer id) throws BusinessException {
		try {
			return this.smartRoomRepository.findById(id).get();			
		} catch (DataAccessException e) {
            throw new BusinessException(e);
        }
	}

	@Override
	public List<SmartRoom> findByIds(List<Integer> ids) throws BusinessException {
		try {
			return this.smartRoomRepository.findAllById(ids);	
		} catch (DataAccessException e) {
            throw new BusinessException(e);
        }
	}

	@Override
	public List<SmartRoom> findAll() throws BusinessException {
		try {
			return this.smartRoomRepository.findAll();	
		} catch (DataAccessException e) {
            throw new BusinessException(e);
        }
	}

	@Override
	public void createSmartRoom(SmartRoom smartRoom) throws BusinessException {
		try {
			this.smartRoomRepository.save(smartRoom);
		} catch (DataAccessException e) {
            throw new BusinessException(e);
        }
	}

	@Override
	public void updateSmartRoom(SmartRoom smartRoom) throws BusinessException {
		try {
			this.smartRoomRepository.save(smartRoom);
		} catch (DataAccessException e) {
            throw new BusinessException(e);
        }	
	}

	@Override
	public void deleteSmartRoom(Integer id) throws BusinessException {
		try {
			this.smartRoomRepository.deleteById(id);
		} catch (DataAccessException e) {
            throw new BusinessException(e);
        }	
	}
}
