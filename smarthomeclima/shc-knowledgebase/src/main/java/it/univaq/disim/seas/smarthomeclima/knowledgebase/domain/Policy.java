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
@Table(name="POLICIES")
public class Policy {

	public static final double OPTIMAL_MARGIN = 0.5;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	private double predictiveMargin;
	private double dangerMargin;
	private double optimalTemperature;
	
	@JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd@HH:mm:ss")
	private LocalDateTime startHour;
	@JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd@HH:mm:ss")
	private LocalDateTime endHour;
	
	private boolean isActive;
	
	@ManyToOne
	@JoinColumn(nullable=false)
	@JsonBackReference
	private PolicyGroup policyGroup;
	
	public Policy() {}
	
}
