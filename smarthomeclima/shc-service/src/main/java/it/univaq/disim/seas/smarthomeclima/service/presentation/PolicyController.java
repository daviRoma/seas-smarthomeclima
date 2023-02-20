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

import it.univaq.disim.seas.smarthomeclima.knowledgebase.business.PolicyGroupService;
import it.univaq.disim.seas.smarthomeclima.knowledgebase.business.PolicyService;
import it.univaq.disim.seas.smarthomeclima.knowledgebase.business.exception.BusinessException;
import it.univaq.disim.seas.smarthomeclima.knowledgebase.domain.Policy;
import it.univaq.disim.seas.smarthomeclima.knowledgebase.domain.PolicyGroup;
import it.univaq.disim.seas.smarthomeclima.service.model.PolicyRequest;

@Controller
@RequestMapping("/policies")
public class PolicyController {
	
	@Autowired
	private PolicyService policyService;
	
	@Autowired
	private PolicyGroupService policyGroupService;
	
	@GetMapping("/{id}")
	@ResponseBody
	public Policy getPolicy(@PathVariable("id") Integer id) throws BusinessException {
		return this.policyService.findById(id);
	}
	
	@PostMapping
	public void createPolicy(@RequestBody PolicyRequest request) throws BusinessException {
		PolicyGroup group = this.policyGroupService.findById(request.getPolicyGroupId());
		
		if (request.getPolicies().size() > 1) {
			for (Policy p : request.getPolicies()) {
				p.setPolicyGroup(group);
			}
			this.policyService.upsertMultiplePolicy(request.getPolicies());
		} else {
			request.getPolicies().get(0).setPolicyGroup(group);
			this.policyService.createPolicy(request.getPolicies().get(0));
		}
	}
	
	@PutMapping
	public void updatePolicy(@RequestBody PolicyRequest request) throws BusinessException {		
		PolicyGroup group = this.policyGroupService.findById(request.getPolicyGroupId());
		
		for (Policy p : request.getPolicies()) {
			p.setPolicyGroup(group);
			this.policyService.upsertMultiplePolicy(request.getPolicies());;
		}
	}
	
	@DeleteMapping("")
	public void deletePolicyGroup(@RequestBody PolicyRequest request) throws BusinessException {
		for (Policy p : request.getPolicies()) {
			this.policyService.deletePolicy(p.getId());
		}
	}
}
