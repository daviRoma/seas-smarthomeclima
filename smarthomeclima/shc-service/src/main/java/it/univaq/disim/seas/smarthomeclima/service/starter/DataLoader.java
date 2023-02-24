package it.univaq.disim.seas.smarthomeclima.service.starter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import it.univaq.disim.seas.smarthomeclima.knowledgebase.business.ActuatorService;
import it.univaq.disim.seas.smarthomeclima.knowledgebase.business.PolicyGroupService;
import it.univaq.disim.seas.smarthomeclima.knowledgebase.business.PolicyService;
import it.univaq.disim.seas.smarthomeclima.knowledgebase.business.SensorService;
import it.univaq.disim.seas.smarthomeclima.knowledgebase.business.SmartRoomService;
import it.univaq.disim.seas.smarthomeclima.knowledgebase.business.exception.BusinessException;
import it.univaq.disim.seas.smarthomeclima.knowledgebase.domain.Actuator;
import it.univaq.disim.seas.smarthomeclima.knowledgebase.domain.ActuatorType;
import it.univaq.disim.seas.smarthomeclima.knowledgebase.domain.Mode;
import it.univaq.disim.seas.smarthomeclima.knowledgebase.domain.Policy;
import it.univaq.disim.seas.smarthomeclima.knowledgebase.domain.PolicyGroup;
import it.univaq.disim.seas.smarthomeclima.knowledgebase.domain.RoomType;
import it.univaq.disim.seas.smarthomeclima.knowledgebase.domain.Season;
import it.univaq.disim.seas.smarthomeclima.knowledgebase.domain.Sensor;
import it.univaq.disim.seas.smarthomeclima.knowledgebase.domain.SensorType;
import it.univaq.disim.seas.smarthomeclima.knowledgebase.domain.SmartRoom;

@Component
public class DataLoader implements CommandLineRunner {
	
	private static final Logger LOGGER = LoggerFactory.getLogger(DataLoader.class);
	
	@Autowired
	private SmartRoomService smartRoomService;
	
	@Autowired
	private SensorService sensorService;
	
	@Autowired
	private ActuatorService actuatorService;
	
	@Autowired
	private PolicyGroupService policyGroupService;
	
	@Autowired
	private PolicyService policyService;
	
	@Override
	public void run(String... args) {
		LOGGER.info("[Service]::[DataLoader]::[run] --- Start creating data.");
		
		try {
			// Living room
			createData(1, RoomType.LIVING_ROOM);
			// Dining room
			createData(2, RoomType.DINING_ROOM);		
			// bed room
			createData(3, RoomType.BED_ROOM);
			// bed room
			createData(4, RoomType.BED_ROOM);			
		} catch (BusinessException e) {
			LOGGER.error("[Service]::[DataLoader]::[run] --- Error");
			e.printStackTrace();
		}
	}
	
	public void createData(int number, RoomType type) throws BusinessException {
		SmartRoom sr = new SmartRoom();
		sr.setNumber(number);
		sr.setType(type);
		smartRoomService.createSmartRoom(sr);
		
		Sensor sn1 = new Sensor();
		sn1.setActive(true);
		sn1.setName("Temperature Sensor " + String.valueOf(number));
		sn1.setType(SensorType.TEMPERATURE);
		sn1.setSmartRoom(sr);
		sensorService.createSensor(sn1);
		
		Sensor sn2 = new Sensor();
		sn2.setActive(true);
		sn2.setName("Motion Sensor " + String.valueOf(number));
		sn2.setType(SensorType.MOTION);
		sn2.setSmartRoom(sr);
		sensorService.createSensor(sn2);
		
		Sensor sn3 = new Sensor();
		sn3.setActive(true);
		sn3.setName("Contact Sensor " + String.valueOf(number));
		sn3.setType(SensorType.CONTACT);
		sn3.setSmartRoom(sr);
		sensorService.createSensor(sn3);
		
		Actuator act1 = new Actuator();
		act1.setActive(false);
		act1.setName("Conditioner " + String.valueOf(number));
		act1.setPower(0);
		act1.setType(ActuatorType.CONDITIONER);
		act1.setSmartRoom(sr);
		actuatorService.createActuator(act1);
		
		Actuator act2 = new Actuator();
		act2.setActive(false);
		act2.setName("Radiator " + String.valueOf(number));
		act2.setPower(0);
		act2.setType(ActuatorType.RADIATOR);
		act2.setSmartRoom(sr);
		actuatorService.createActuator(act2);
		
		Actuator act3 = new Actuator();
		act3.setActive(false);
		act3.setName("Window " + String.valueOf(number));
		act3.setPower(0);
		act3.setType(ActuatorType.WINDOW);
		act3.setSmartRoom(sr);
		actuatorService.createActuator(act3);
		
		// Policy Groups
		PolicyGroup pg = new PolicyGroup();
		pg.setActive(true);
		pg.setMode(Mode.ECO);
		pg.setSeason(Season.WINTER);
		pg.setStartDate(LocalDate.of(2023, 2, 1));
		pg.setEndDate(LocalDate.of(2023, 4, 15));
		pg.setSmartRoom(sr);
		policyGroupService.createPolicyGroup(pg);
		
		PolicyGroup pg1 = new PolicyGroup();
		pg1.setActive(false);
		pg1.setMode(Mode.COMFORT);
		pg1.setSeason(Season.WINTER);
		pg1.setStartDate(LocalDate.of(2023, 1, 31));
		pg1.setEndDate(LocalDate.of(2022, 12, 1));
		pg1.setSmartRoom(sr);
		policyGroupService.createPolicyGroup(pg1);
		
		PolicyGroup pg2 = new PolicyGroup();
		pg2.setActive(false);
		pg2.setMode(Mode.ECO);
		pg2.setSeason(Season.SUMMER);
		pg2.setStartDate(LocalDate.of(2023, 6, 1));
		pg2.setEndDate(LocalDate.of(2023, 8, 31));	
		pg2.setSmartRoom(sr);
		policyGroupService.createPolicyGroup(pg2);
		
		// Default winter
		policyService.upsertMultiplePolicy(createPolicyData(pg, 20, true));
		// Power winter
		policyService.upsertMultiplePolicy(createPolicyData(pg1, 21, true));
		// Eco summer
		policyService.upsertMultiplePolicy(createPolicyData(pg2, 26, false));
		
	}
	
	public List<Policy> createPolicyData(PolicyGroup pg, double temp, boolean winter) {
		List<Policy> policies = new ArrayList<Policy>();
		
		for (int i = 0; i < 23; i++) {
			Policy policy = new Policy();
			
			switch (i) {
				case 0:
				case 1:
				case 2:
				case 3:
				case 4:
				case 5:
				case 6:
					policy.setDangerMargin(2);
					policy.setReactiveMargin(1);
					policy.setOptimalTemperature(winter ? temp - 2 : temp + 2);
					break;
				case 7:
				case 8:
				case 9:
				case 10:
				case 18:
				case 19:
				case 20:
					policy.setDangerMargin(3);
					policy.setReactiveMargin(1);
					policy.setOptimalTemperature(temp);
					break;
				case 11:
				case 15:
				case 16:
				case 17:
				case 23:
				case 24:
					policy.setDangerMargin(3);
					policy.setReactiveMargin(1);
					policy.setOptimalTemperature(winter ? temp - 1 : temp + 1);
					break;
				case 12:
				case 13:
				case 14:
					policy.setDangerMargin(3);
					policy.setReactiveMargin(1);
					policy.setOptimalTemperature(winter ? temp - 2 : temp + 2);
					break;
				case 21:
				case 22:
					policy.setDangerMargin(2.5);
					policy.setReactiveMargin(1);
					policy.setOptimalTemperature(winter ? temp + 0.5 : temp + 0.5);
					break;
				default:
					break;
			}
			policy.setStartHour(LocalDateTime.of(2023, 2, 1, i, 1));
			policy.setEndHour(LocalDateTime.of(2023, 2, 1, i+1, 0));
			if (policy.getStartHour().getHour() <= LocalDateTime.now().getHour() && LocalDateTime.now().getHour() < policy.getEndHour().getHour()) {
				policy.setActive(true);
			} else {
				policy.setActive(false);				
			}
			policy.setPolicyGroup(pg);	
			policies.add(policy);
		}
		return policies;
		
	}
	
}
