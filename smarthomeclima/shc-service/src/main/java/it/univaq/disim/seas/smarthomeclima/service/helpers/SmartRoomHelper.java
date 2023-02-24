package it.univaq.disim.seas.smarthomeclima.service.helpers;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import it.univaq.disim.seas.smarthomeclima.knowledgebase.domain.Policy;
import it.univaq.disim.seas.smarthomeclima.knowledgebase.domain.PolicyGroup;
import it.univaq.disim.seas.smarthomeclima.knowledgebase.domain.SmartRoom;

public class SmartRoomHelper {

	/**
	 * Set the active policies.
	 * @param smartRooms
	 */
	public static List<SmartRoom> setSmartRoomPolicies(List<SmartRoom> smartRooms) {
		
		for (SmartRoom sm : smartRooms) {
			PolicyGroup activeGroup = null;
			for (PolicyGroup group : sm.getPolicyGroups()) {
				if (!group.isActive() && group.getStartDate().compareTo(LocalDate.now()) <= 0 && group.getEndDate().compareTo(LocalDate.now()) > 0) {
					group.setActive(true);
					activeGroup = group; 
				}
			}
			if (activeGroup != null) {
				for (Policy policy : activeGroup.getPolicies()) {
					if (!policy.isActive() && policy.getStartHour().getHour() <= LocalDateTime.now().getHour() && LocalDateTime.now().getHour() < policy.getEndHour().getHour()) {
						policy.setActive(true);
					}
				}				
			}
		}
		return smartRooms;
	}
}
