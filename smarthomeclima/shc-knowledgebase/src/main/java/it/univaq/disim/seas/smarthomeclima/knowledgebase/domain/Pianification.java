package it.univaq.disim.seas.smarthomeclima.knowledgebase.domain;

import java.util.Calendar;

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
@Table(name="PIANIFICATIONS")
public class Pianification {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	private Mode mode;
	private boolean isActive;
	private Calendar startDate;
	private Calendar endDate;
	
	@ManyToOne
	@JoinColumn(nullable=false)
	@JsonBackReference
	private SmartRoom smartRoom;
	
	public Pianification(){}
	
	public Pianification(
		Mode mode, 
		boolean isActive,
		Calendar startDate,
		Calendar endDate, 
		SmartRoom smartRoom
	) {
		this.mode = mode;
		this.setActive(isActive);
		this.startDate = startDate;
		this.endDate = endDate;
		this.setSmartRoom(smartRoom);
	}
	
}	