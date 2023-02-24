package it.univaq.disim.seas.smarthomeclima.knowledgebase.business.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import it.univaq.disim.seas.smarthomeclima.knowledgebase.domain.PolicyGroup;
import it.univaq.disim.seas.smarthomeclima.knowledgebase.domain.SmartRoom;

@Repository
public interface PolicyGroupRepository extends JpaRepository<PolicyGroup, Integer>{

	List<PolicyGroup> findBySmartRoomList(List<SmartRoom> smartRooms);
}
