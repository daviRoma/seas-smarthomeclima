package it.univaq.disim.seas.smarthomeclima.service.presentation;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import it.univaq.disim.seas.smarthomeclima.knowledgebase.business.ActuatorService;
import it.univaq.disim.seas.smarthomeclima.knowledgebase.business.SmartRoomService;
import it.univaq.disim.seas.smarthomeclima.knowledgebase.business.exception.BusinessException;
import it.univaq.disim.seas.smarthomeclima.knowledgebase.domain.Actuator;
import it.univaq.disim.seas.smarthomeclima.knowledgebase.domain.SmartRoom;
import it.univaq.disim.seas.smarthomeclima.service.model.ActuatorRequest;

@Controller
@RequestMapping("/actuators")
public class ActuatorController {
	private static final Logger LOGGER = LoggerFactory.getLogger(ActuatorController.class);

	@Autowired
	private SmartRoomService smartRoomService;
	
	@Autowired
	private ActuatorService actuatorService;
	
	@GetMapping
	@ResponseBody
	public List<Actuator> getActuators() throws BusinessException {
		return this.actuatorService.findAll();
	}
	
	@GetMapping("/{id}")
	@ResponseBody
	public Actuator getActuator(@PathVariable("id") Integer id) throws BusinessException {
		return this.actuatorService.findById(id);
	}
	
	@CrossOrigin(origins = "http://localhost:4200")
	@PostMapping
	public void createActuator(@RequestBody ActuatorRequest request) throws BusinessException {
		LOGGER.info("[ActuatorController]::[createActuator]");
		
		SmartRoom sm = this.smartRoomService.findById(request.getSmartRoomId());
		
		for (Actuator act : request.getActuators()) {
			act.setSmartRoom(sm);
			this.actuatorService.createActuator(act); 
		}
	}
	
	@CrossOrigin(origins = "http://localhost:4200")
	@PutMapping
	public ResponseEntity<Object> updateActuator(@RequestBody ActuatorRequest request) throws BusinessException {
		LOGGER.info("[ActuatorController]::[updateActuator]");
		
		SmartRoom sm = this.smartRoomService.findById(request.getSmartRoomId());
		
		for (Actuator act : request.getActuators()) {
			act.setSmartRoom(sm);
			this.actuatorService.updateActuator(act);
		}
		return new ResponseEntity<>("Actuator updated succesfully", HttpStatus.OK);
	}
	
	@CrossOrigin(origins = "http://localhost:4200")
	@DeleteMapping
	public ResponseEntity<Object> deleteActuator(@RequestBody ActuatorRequest request) throws BusinessException {
		LOGGER.info("[ActuatorController]::[deleteActuator]");
		
		for (Actuator act : request.getActuators()) {
			this.actuatorService.deleteActuator(act.getId());
		}
		return new ResponseEntity<>("Actuator succesfully deleted.", HttpStatus.OK);
	}
}
