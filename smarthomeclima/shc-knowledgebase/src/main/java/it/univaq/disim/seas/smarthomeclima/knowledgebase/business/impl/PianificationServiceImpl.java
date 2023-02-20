package it.univaq.disim.seas.smarthomeclima.knowledgebase.business.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import it.univaq.disim.seas.smarthomeclima.knowledgebase.business.PianificationService;
import it.univaq.disim.seas.smarthomeclima.knowledgebase.business.exception.BusinessException;
import it.univaq.disim.seas.smarthomeclima.knowledgebase.business.repositories.PianificationRepository;
import it.univaq.disim.seas.smarthomeclima.knowledgebase.domain.Pianification;

@Service
@Transactional
public class PianificationServiceImpl implements PianificationService {

	@Autowired
	private PianificationRepository pianificationRepository;

	@Override
	public Pianification findById(Integer id) throws BusinessException {
		try {
			return this.pianificationRepository.findById(id).get();	
		} catch (DataAccessException e) {
            throw new BusinessException(e);
        }
	}

	@Override
	public List<Pianification> findAll() throws BusinessException {
		try {
			return this.pianificationRepository.findAll();
		} catch (DataAccessException e) {
            throw new BusinessException(e);
        }
	}
	
	@Override
	public Map<Integer, Pianification> getAllActive(Set<Integer> ids) throws BusinessException {
		Map<Integer, Pianification> pianifications = new HashMap<Integer, Pianification>();
		
		try {
			for (Pianification p : this.pianificationRepository.findByIsActiveTrue()) {
				if (p.isActive()) pianifications.put(p.getSmartRoom().getId(), p);
			}			
		} catch (DataAccessException e) {
            throw new BusinessException(e);
        }
		return pianifications;
	}
	
	@Override
	public void createPianification(Pianification pianification) throws BusinessException {
		try {
			this.pianificationRepository.save(pianification);
		} catch (DataAccessException e) {
            throw new BusinessException(e);
        }
	}

	@Override
	public void updatePianification(Pianification pianification) throws BusinessException {
		try {
			this.pianificationRepository.save(pianification);
		} catch (DataAccessException e) {
            throw new BusinessException(e);
        }
	}

	@Override
	public void deletePianification(Integer id) throws BusinessException {
		try {
			this.pianificationRepository.deleteById(id);
		} catch (DataAccessException e) {
            throw new BusinessException(e);
        }
	}
}
