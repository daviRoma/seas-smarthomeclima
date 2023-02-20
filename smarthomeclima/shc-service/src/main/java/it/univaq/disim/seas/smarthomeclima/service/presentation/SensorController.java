package it.univaq.disim.seas.smarthomeclima.service.presentation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import it.univaq.disim.seas.smarthomeclima.knowledgebase.business.SensorService;
import it.univaq.disim.seas.smarthomeclima.knowledgebase.business.SmartRoomService;
import it.univaq.disim.seas.smarthomeclima.knowledgebase.business.exception.BusinessException;
import it.univaq.disim.seas.smarthomeclima.knowledgebase.domain.Sensor;
import it.univaq.disim.seas.smarthomeclima.knowledgebase.domain.SmartRoom;
import it.univaq.disim.seas.smarthomeclima.service.model.SensorRequest;


@Controller
@RequestMapping("/sensors")
public class SensorController {

	@Autowired
	private SensorService service;
	
	@Autowired
	private SmartRoomService smartroomService;

	@GetMapping("/{id}")
	public ResponseEntity<Sensor> getSensor(@PathVariable("id") Integer id) throws BusinessException {
		return new ResponseEntity<Sensor>(this.service.findById(id), HttpStatus.OK);
	}
	
	@PostMapping
	public ResponseEntity<Object> createSensor(@RequestBody SensorRequest request) throws BusinessException {
		SmartRoom sm = this.smartroomService.findById(request.getSmartRoomId());
		
		for (Sensor s : request.getSensors()) {
			s.setSmartRoom(sm);
			this.service.createSensor(s);
		}
		
		return new ResponseEntity<>("Sensor created succesfully", HttpStatus.OK);
	}
	
	@PutMapping
	public ResponseEntity<Object> updateSensor(@RequestBody SensorRequest request) throws BusinessException {
		SmartRoom sm = this.smartroomService.findById(request.getSmartRoomId());
		
		for (Sensor s : request.getSensors()) {
			s.setSmartRoom(sm);
			this.service.updateSensor(s);
		}
		
		return new ResponseEntity<>("Sensor updated succesfully", HttpStatus.OK);
	}
	
	@DeleteMapping
	public ResponseEntity<Object> deleteSensor(@RequestBody SensorRequest request) throws BusinessException {
		for (Sensor s : request.getSensors()) {
			this.service.deleteSensor(s.getId());
		}
		return new ResponseEntity<>("Sensor deleted succesfully", HttpStatus.OK);
	}
}
