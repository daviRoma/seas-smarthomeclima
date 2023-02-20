package it.univaq.disim.seas.smarthomeclima.knowledgebase.domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Transient;

import com.fasterxml.jackson.annotation.JsonBackReference;

import lombok.Data;

@Data
@Entity
@Table(name="SENSORS")
public class Sensor {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	private String name;
	private SensorType type;
	
	@Transient
	private double value;
	
	private boolean isActive;
	
	@ManyToOne
	@JoinColumn(name="smartroom_id", nullable=false)
	@JsonBackReference
	private SmartRoom smartRoom;
	
	public Sensor(){}
	
	public Sensor(int id, SensorType type, String name, double val) {
		this.id = id; 
		this.type = type;
		this.name = name;
		this.value = val;
	}
	
}