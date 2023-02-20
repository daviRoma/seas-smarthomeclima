package it.univaq.disim.seas.smarthomeclima.knowledgebase.domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;

import lombok.Data;

@Data
@Entity
@Table(name="ACTUATORS")
public class Actuator {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	private int power;
	private String name;
	private ActuatorType type;
	private boolean isActive;
	
	@ManyToOne
	@JoinColumn(nullable=false)
	@JsonBackReference
	private SmartRoom smartRoom;
	
	public Actuator(){}

	public Actuator(int id, ActuatorType type, String name, int power){
		this.id = id;
		this.type = type;
		this.name = name;
		this.power = power;
	}

}