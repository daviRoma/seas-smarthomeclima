package it.univaq.disim.seas.smarthomeclima.service.presentation;

import java.util.List;

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
	
	@PostMapping("")
	public void createPolicyGroup(@RequestBody PolicyGroupRequest request) throws BusinessException {
		SmartRoom sm = this.smartRoomService.findById(request.getSmartRoomId());
		
		PolicyGroup policyGroup = request.getPolicyGroup();
		policyGroup.setSmartRoom(sm);
		
		this.policyGroupService.createPolicyGroup(policyGroup);
	}
	
	@PutMapping("")
	public void updatePolicyGroup(@RequestBody PolicyGroupRequest request) throws BusinessException {
		SmartRoom sm = this.smartRoomService.findById(request.getSmartRoomId());
		
		PolicyGroup policyGroup = request.getPolicyGroup();
		policyGroup.setSmartRoom(sm);
		
		this.policyGroupService.updatePolicyGroup(policyGroup);
	}
	
	@DeleteMapping("/{id}")
	public void deletePolicyGroup(@PathVariable("id") Integer id) throws BusinessException {
		this.policyGroupService.deletePolicyGroup(id);
	}
}
