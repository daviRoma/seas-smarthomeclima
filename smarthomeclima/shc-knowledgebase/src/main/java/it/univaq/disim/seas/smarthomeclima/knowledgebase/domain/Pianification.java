package it.univaq.disim.seas.smarthomeclima.knowledgebase.domain;

import java.time.LocalDateTime;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonFormat;

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
	
	@JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd@HH:mm:ss")
	private LocalDateTime startDate;
	@JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd@HH:mm:ss")
	private LocalDateTime endDate;
	
	@ManyToOne
	@JoinColumn(nullable=false)
	@JsonBackReference
	private SmartRoom smartRoom;
	
	public Pianification(){}
	
	public Pianification(
		Mode mode, 
		boolean isActive,
		LocalDateTime startDate,
		LocalDateTime endDate, 
		SmartRoom smartRoom
	) {
		this.mode = mode;
		this.setActive(isActive);
		this.startDate = startDate;
		this.endDate = endDate;
		this.setSmartRoom(smartRoom);
	}
	
}	