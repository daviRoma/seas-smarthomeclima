package it.univaq.disim.seas.smarthomeclima.service.presentation;

import java.util.List;

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

import it.univaq.disim.seas.smarthomeclima.knowledgebase.business.SmartRoomService;
import it.univaq.disim.seas.smarthomeclima.knowledgebase.business.exception.BusinessException;
import it.univaq.disim.seas.smarthomeclima.knowledgebase.domain.Actuator;
import it.univaq.disim.seas.smarthomeclima.knowledgebase.domain.PolicyGroup;
import it.univaq.disim.seas.smarthomeclima.knowledgebase.domain.Sensor;
import it.univaq.disim.seas.smarthomeclima.knowledgebase.domain.SmartRoom;
import it.univaq.disim.seas.smarthomeclima.service.helpers.SmartRoomHelper;

@Controller
@RequestMapping("/smartrooms")
public class SmartRoomController {
	
	@Autowired
	private SmartRoomService service;
	
	@GetMapping
	@ResponseBody
	public List<SmartRoom> getAllSmartRooms() throws BusinessException {
		return SmartRoomHelper.setSmartRoomPolicies(this.service.findAll());
	}
	
	@GetMapping("/{id}")
	@ResponseBody
	public SmartRoom getSmartRoom(@PathVariable("id") Integer id) throws BusinessException {
		return this.service.findById(id);
	}
	
	@GetMapping("/{id}/sensors")
	@ResponseBody
	public List<Sensor> getSensors(@PathVariable("id") Integer id) throws BusinessException {
		SmartRoom sm = this.service.findById(id);
		return sm.getSensors();
	}
	
	@GetMapping("/{id}/actuators")
	@ResponseBody
	public List<Actuator> getActuators(@PathVariable("id") Integer id) throws BusinessException {
		SmartRoom sm = this.service.findById(id);
		return sm.getActuators();
	}
	
	@GetMapping("/{id}/policy_groups")
	@ResponseBody
	public List<PolicyGroup> getPolicyGroups(@PathVariable("id") Integer id) throws BusinessException {
		SmartRoom sm = this.service.findById(id);
		return sm.getPolicyGroups();
	}
	
	@CrossOrigin(origins = "http://localhost:4200")
	@PostMapping
	@ResponseBody
	public ResponseEntity<Object> create(@RequestBody SmartRoom request) throws BusinessException {
		this.service.createSmartRoom(request);
		return new ResponseEntity<>("Smart Room created succesfully", HttpStatus.OK);
	}
	
	@CrossOrigin(origins = "http://localhost:4200")
	@PutMapping
	public void update(@RequestBody SmartRoom request) throws BusinessException {
		this.service.updateSmartRoom(request);
	}
	
	@CrossOrigin(origins = "http://localhost:4200")
	@DeleteMapping("/{id}")
	@ResponseBody
	public ResponseEntity<Object> delete(@PathVariable("id") Integer id) throws BusinessException {
		this.service.deleteSmartRoom(id);
		return new ResponseEntity<>("Smart Room succesfully cancelled", HttpStatus.OK);
	}

}
