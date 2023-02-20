package it.univaq.disim.seas.smarthomeclima.knowledgebase.business.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import it.univaq.disim.seas.smarthomeclima.knowledgebase.domain.Pianification;

@Repository
public interface PianificationRepository extends JpaRepository<Pianification, Integer> {
	
	List<Pianification> findByIsActiveTrue();

}
