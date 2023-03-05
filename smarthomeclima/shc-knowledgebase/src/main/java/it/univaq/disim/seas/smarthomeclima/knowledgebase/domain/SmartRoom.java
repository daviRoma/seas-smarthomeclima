package it.univaq.disim.seas.smarthomeclima.knowledgebase.domain;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import lombok.Data;

@Data
@Entity
@Table(name="SMART_ROOMS")
public class SmartRoom {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	private int number;
	private RoomType type;
	
	@OneToMany(cascade = CascadeType.ALL, mappedBy = "smartRoom")
	@LazyCollection(LazyCollectionOption.FALSE)
	@JsonManagedReference
	private List<PolicyGroup> policyGroups;
	
	@OneToMany(cascade = CascadeType.ALL, mappedBy = "smartRoom")
	@LazyCollection(LazyCollectionOption.FALSE)
	@JsonManagedReference
	private List<Sensor> sensors;
	
	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER, mappedBy = "smartRoom")
	@JsonManagedReference
	private List<Actuator> actuators;
		
	public void setSensor(Sensor sensor) {
		if (this.sensors.isEmpty()) this.sensors = new ArrayList<Sensor>();
		this.sensors.add(sensor);
	}
	
	public void setActuator(Actuator actuator) {
		if (this.actuators.isEmpty()) this.actuators = new ArrayList<Actuator>();
		this.actuators.add(actuator);
	}

}
