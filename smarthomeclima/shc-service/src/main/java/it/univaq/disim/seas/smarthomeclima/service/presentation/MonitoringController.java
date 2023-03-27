package it.univaq.disim.seas.smarthomeclima.service.presentation;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import it.univaq.disim.seas.smarthomeclima.knowledgebase.business.exception.BusinessException;
import it.univaq.disim.seas.smarthomeclima.monitor.Monitor;
import it.univaq.disim.seas.smarthomeclima.service.business.Simulator;
import it.univaq.disim.seas.smarthomeclima.service.model.GenericResponse;
import it.univaq.disim.seas.smarthomeclima.service.model.ResponseStatus;

@Controller
@RequestMapping("/monitoring")
public class MonitoringController {
	private static final Logger LOGGER = LoggerFactory.getLogger(MonitoringController.class);

	@Autowired
	private Simulator simulator;

	@Autowired
	private Monitor monitor;
	
	private Thread simulatorThread = null;
	private Thread monitorThread = null;
	
	@GetMapping("/start")
	@ResponseBody
	public ResponseEntity<GenericResponse> startMonitoring() throws BusinessException {
		LOGGER.info("[MonitoringController]::[startMonitoring] --- Starting monitoring");;
		
		try {
			monitorThread = new Thread(this.monitor);
			simulatorThread = new Thread(this.simulator);
			
			monitorThread.start();
			simulatorThread.start();
		} catch (Exception e) {
			return new ResponseEntity<GenericResponse>(new GenericResponse(e.getMessage(), ResponseStatus.ERROR), HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		return new ResponseEntity<GenericResponse>(new GenericResponse("Monitoring started.", ResponseStatus.OK), HttpStatus.OK);
	}
	
	@GetMapping("/stop")
	@ResponseBody
	public ResponseEntity<GenericResponse> stopMonitoring() {
		LOGGER.info("[MonitoringController]::[stopMonitoring] --- Stop monitoring...");
		
		try {
			// Stop Simulator
			if (this.simulatorThread != null) {
				this.simulator.terminate();
				this.simulatorThread.join();
	            LOGGER.info("[MonitoringController]::Simulator Thread successfully stopped.");
	        }
			
			// Stor Monitor
			if (this.monitorThread != null) {
				this.monitor.terminate();
				this.monitorThread.join();
	            LOGGER.info("[MonitoringController]::Monitor Thread successfully stopped.");
	        }
			
		} catch (InterruptedException e) {
			LOGGER.error("[MonitoringController]::stopMonitoring", e);
			return new ResponseEntity<GenericResponse>(new GenericResponse(e.getMessage(), ResponseStatus.ERROR), HttpStatus.INTERNAL_SERVER_ERROR);
		}

		return new ResponseEntity<GenericResponse>(new GenericResponse("Monitoring stopped.", ResponseStatus.OK), HttpStatus.OK);
	}
}
