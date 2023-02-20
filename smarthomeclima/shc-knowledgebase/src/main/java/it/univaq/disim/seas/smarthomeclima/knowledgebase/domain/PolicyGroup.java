package it.univaq.disim.seas.smarthomeclima.knowledgebase.domain;

import java.time.LocalDate;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import lombok.Data;

@Data
@Entity
@Table(name="POLICY_GROUPS")
public class PolicyGroup {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	private Season season;
	private Mode mode;
	
	@JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd")
	private LocalDate startDate;
	@JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd")
	private LocalDate endDate;
	
	private boolean isActive;
	
	@ManyToOne
	@JoinColumn(nullable=false)
	@JsonBackReference
	private SmartRoom smartRoom;
	
	@OneToMany(cascade = CascadeType.ALL, mappedBy = "policyGroup")
	@JsonManagedReference
	private List<Policy> policies;
	
	public PolicyGroup() {}

}
