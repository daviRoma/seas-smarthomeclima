package it.univaq.disim.seas.smarthomeclima.knowledgebase.business.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import it.univaq.disim.seas.smarthomeclima.knowledgebase.domain.Actuator;

@Repository
public interface ActuatorRepository extends JpaRepository<Actuator, Integer>{

}
