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
import it.univaq.disim.seas.smarthomeclima.knowledgebase.business.PolicyService;
import it.univaq.disim.seas.smarthomeclima.knowledgebase.business.exception.BusinessException;
import it.univaq.disim.seas.smarthomeclima.knowledgebase.domain.Policy;
import it.univaq.disim.seas.smarthomeclima.knowledgebase.domain.PolicyGroup;
import it.univaq.disim.seas.smarthomeclima.service.model.PolicyRequest;

@Controller
@RequestMapping("/policies")
public class PolicyController {
	private static final Logger LOGGER = LoggerFactory.getLogger(PolicyController.class);

	@Autowired
	private PolicyService policyService;
	
	@Autowired
	private PolicyGroupService policyGroupService;

	@GetMapping
	@ResponseBody
	public List<Policy> getPolicies() throws BusinessException {
		return this.policyService.findAll();
	}
	
	@GetMapping("/{id}")
	@ResponseBody
	public Policy getPolicy(@PathVariable("id") Integer id) throws BusinessException {
		return this.policyService.findById(id);
	}
	
	@CrossOrigin(origins = "http://localhost:4200")
	@PostMapping
	public void createPolicy(@RequestBody PolicyRequest request) throws BusinessException {
		LOGGER.info("[PolicyController]::[createPolicy]");
		
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
	
	@CrossOrigin(origins = "http://localhost:4200")
	@PutMapping
	public ResponseEntity<Object> updatePolicy(@RequestBody PolicyRequest request) throws BusinessException {
		LOGGER.info("[PolicyController]::[updatePolicy]");
		
		PolicyGroup group = this.policyGroupService.findById(request.getPolicyGroupId());
		
		for (Policy p : request.getPolicies()) {
			p.setPolicyGroup(group);
		}
		this.policyService.upsertMultiplePolicy(request.getPolicies());
		return new ResponseEntity<>("Policy updated successfullty.", HttpStatus.OK);
	}
	
	@CrossOrigin(origins = "http://localhost:4200")
	@DeleteMapping
	public ResponseEntity<Object> deletePolicyGroup(@RequestBody PolicyRequest request) throws BusinessException {
		LOGGER.info("[PolicyController]::[deletePolicy]");
		
		for (Policy p : request.getPolicies()) {
			this.policyService.deletePolicy(p.getId());
		}
		return new ResponseEntity<>("Policy succesfully deleted.", HttpStatus.OK);
	}
}
