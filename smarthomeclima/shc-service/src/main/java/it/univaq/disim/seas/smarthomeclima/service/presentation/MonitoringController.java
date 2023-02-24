package it.univaq.disim.seas.smarthomeclima.service.presentation;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import it.univaq.disim.seas.smarthomeclima.knowledgebase.business.exception.BusinessException;
import it.univaq.disim.seas.smarthomeclima.monitor.Monitor;
import it.univaq.disim.seas.smarthomeclima.service.business.Simulator;

@Controller
@RequestMapping("/monitoring")
public class MonitoringController {
	private static final Logger LOGGER = LoggerFactory.getLogger(MonitoringController.class);

	@Autowired
	private Simulator simulator;

	@Autowired
	private Monitor monitor;
	
	@GetMapping("/start")
	@ResponseBody
	public Map<String, String> startMonitoring() throws BusinessException {
		LOGGER.info("[MonitoringController]::[startMonitoring] --- Starting monitoring");;
		
		this.simulator.start();
//		this.monitor.setClock(LocalDateTime.of(2023, 2, 1, 1, 0));
		this.monitor.start();
		
		return new HashMap<String, String>(){{ put("Message", "OK");}};
	}
	
	@GetMapping("/stop")
	@ResponseBody
	public Map<String, String> stopMonitoring() {
		LOGGER.info("[MonitoringController]::[stopMonitoring] --- Stop monitoring");
		try {
			this.simulator.terminate();
			this.monitor.terminate();
			
		} catch (InterruptedException ex) {
			ex.printStackTrace();
		}

		return new HashMap<String, String>(){{ put("Message", "Stopped");}};
	}
}
