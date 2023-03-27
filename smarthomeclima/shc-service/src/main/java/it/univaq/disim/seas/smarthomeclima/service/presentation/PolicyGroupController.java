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

import it.univaq.disim.seas.smarthomeclima.knowledgebase.business.PolicyGroupService;
import it.univaq.disim.seas.smarthomeclima.knowledgebase.business.SmartRoomService;
import it.univaq.disim.seas.smarthomeclima.knowledgebase.business.exception.BusinessException;
import it.univaq.disim.seas.smarthomeclima.knowledgebase.domain.Policy;
import it.univaq.disim.seas.smarthomeclima.knowledgebase.domain.PolicyGroup;
import it.univaq.disim.seas.smarthomeclima.knowledgebase.domain.SmartRoom;
import it.univaq.disim.seas.smarthomeclima.service.model.PolicyGroupRequest;

@Controller
@RequestMapping("/policy_groups")
public class PolicyGroupController {

	private static final Logger LOGGER = LoggerFactory.getLogger(PolicyGroupController.class);
	
	@Autowired
	private PolicyGroupService policyGroupService;
	
	@Autowired
	private SmartRoomService smartRoomService;
	
	@GetMapping
	@ResponseBody
	public List<PolicyGroup> getPolicyGroups() throws BusinessException {
		return this.policyGroupService.findAll();
	}
	
	@GetMapping("/{id}")
	@ResponseBody
	public PolicyGroup getPolicyGroup(@PathVariable("id") Integer id) throws BusinessException {
		return this.policyGroupService.findById(id);
	}

	@GetMapping("/{id}/policies")
	@ResponseBody
	public List<Policy> getPolicies(@PathVariable("id") Integer id) throws BusinessException {
		return this.policyGroupService.findById(id).getPolicies();
	}
	
	@CrossOrigin(origins = "http://localhost:4200")
	@PostMapping
	public ResponseEntity<Object> createPolicyGroup(@RequestBody PolicyGroupRequest request) throws BusinessException {
		LOGGER.info("[PolicyGroupController]::[createPolicyGroup]");

		SmartRoom sm = this.smartRoomService.findById(request.getSmartRoomId());
		
		for (PolicyGroup pg : request.getPolicyGroups()) {
			pg.setSmartRoom(sm);
			this.policyGroupService.createPolicyGroup(pg);
		}
		return new ResponseEntity<>("Policy Groups succesfully created.", HttpStatus.OK);
	}
	
	@CrossOrigin(origins = "http://localhost:4200")
	@PutMapping
	public ResponseEntity<Object> updatePolicyGroup(@RequestBody PolicyGroupRequest request) throws BusinessException {
		LOGGER.info("[PolicyGroupController]::[updatePolicyGroup]");

		SmartRoom sm = this.smartRoomService.findById(request.getSmartRoomId());
		
		for (PolicyGroup pg : request.getPolicyGroups()) {
			pg.setSmartRoom(sm);
			this.policyGroupService.updatePolicyGroup(pg);
		}
		return new ResponseEntity<>("Policy Groups succesfully updated.", HttpStatus.OK);
	}
	
	@CrossOrigin(origins = "http://localhost:4200")
	@DeleteMapping
	public ResponseEntity<Object> deletePolicyGroup(@RequestBody PolicyGroupRequest request) throws BusinessException {
		LOGGER.info("[PolicyGroupController]::[deletePolicyGroup]");
		
		for (PolicyGroup pg : request.getPolicyGroups()) {
			this.policyGroupService.deletePolicyGroup(pg.getId());
		}
		return new ResponseEntity<>("Policy Groups succesfully deleted.", HttpStatus.OK);
	}
}
