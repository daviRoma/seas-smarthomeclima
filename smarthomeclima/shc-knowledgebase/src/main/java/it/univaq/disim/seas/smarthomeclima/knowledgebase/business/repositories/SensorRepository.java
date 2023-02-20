package it.univaq.disim.seas.smarthomeclima.knowledgebase.business.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import it.univaq.disim.seas.smarthomeclima.knowledgebase.domain.Sensor;
import it.univaq.disim.seas.smarthomeclima.knowledgebase.domain.SmartRoom;


@Repository
public interface SensorRepository extends JpaRepository<Sensor, Integer>{

	/**
	 * Find all sensors by smart room
	 * @param smartRoom
	 * @return List<Sensor>
	 */
	List<Sensor> findAllBySmartRoom(SmartRoom smartRoom);
}
