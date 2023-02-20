package it.univaq.disim.seas.smarthomeclima.service.presentation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
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

	@Autowired
	private SmartRoomService smartRoomService;
	@Autowired
	private ActuatorService actuatorService;
	
	
	@GetMapping("/{id}")
	@ResponseBody
	public Actuator getActuator(@PathVariable("id") Integer id) throws BusinessException {
		return this.actuatorService.findById(id);
	}
	
	@PostMapping("")
	public void createActuator(@RequestBody ActuatorRequest request) throws BusinessException {
		SmartRoom sm = this.smartRoomService.findById(request.getSmartRoomId());
		
		for (Actuator act : request.getActuators()) {
			act.setSmartRoom(sm);
			this.actuatorService.createActuator(act);
		}
	}
	
	@PutMapping("")
	public void updateActuator(@RequestBody ActuatorRequest request) throws BusinessException {
		SmartRoom sm = this.smartRoomService.findById(request.getSmartRoomId());
		
		for (Actuator act : request.getActuators()) {
			act.setSmartRoom(sm);
			this.actuatorService.updateActuator(act);
		}
	}
	
	@DeleteMapping("/{id}")
	public void deleteActuator(@PathVariable("id") Integer id) throws BusinessException {
		this.actuatorService.deleteActuator(id);
	}
}
