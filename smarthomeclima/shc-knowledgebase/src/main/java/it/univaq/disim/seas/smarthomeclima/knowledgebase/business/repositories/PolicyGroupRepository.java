package it.univaq.disim.seas.smarthomeclima.knowledgebase.business.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import it.univaq.disim.seas.smarthomeclima.knowledgebase.domain.PolicyGroup;

@Repository
public interface PolicyGroupRepository extends JpaRepository<PolicyGroup, Integer>{

}
