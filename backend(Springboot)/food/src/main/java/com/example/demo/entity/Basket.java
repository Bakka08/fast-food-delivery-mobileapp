package com.example.demo.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Basket {
	@Id
	@Column(unique = true) 
	private int id;

	@ManyToOne
	@JsonIgnore
	@JoinColumn(name = "user_id")
	private User user;

	@ManyToOne
	@JoinColumn(name = "main_meal_id")
	private Meal mainMeal;

	@ManyToOne
	@JoinColumn(name = "optional_meal1_id")
	private Meal optionalMeal1;

	@ManyToOne
	@JoinColumn(name = "optional_meal2_id")
	private Meal optionalMeal2;

	@ManyToOne
	@JoinColumn(name = "optional_meal3_id")
	private Meal optionalMeal3;
	// Constructors, getters, and setters

	public Basket() {
		// Default constructor
	}

	public Basket(int id ,User user, Meal mainMeal, Meal optionalMeal1, Meal optionalMeal2, Meal optionalMeal3) {
		this.id = id ;
		this.user = user;
		this.mainMeal = mainMeal;
		this.optionalMeal1 = optionalMeal1;
		this.optionalMeal2 = optionalMeal2;
		this.optionalMeal3 = optionalMeal3;
	}

	// Getter and Setter methods
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Meal getMainMeal() {
		return mainMeal;
	}

	public void setMainMeal(Meal mainMeal) {
		this.mainMeal = mainMeal;
	}

	public Meal getOptionalMeal1() {
		return optionalMeal1;
	}

	public void setOptionalMeal1(Meal optionalMeal1) {
		this.optionalMeal1 = optionalMeal1;
	}

	public Meal getOptionalMeal2() {
		return optionalMeal2;
	}

	public void setOptionalMeal2(Meal optionalMeal2) {
		this.optionalMeal2 = optionalMeal2;
	}

	public Meal getOptionalMeal3() {
		return optionalMeal3;
	}

	public void setOptionalMeal3(Meal optionalMeal3) {
		this.optionalMeal3 = optionalMeal3;
	}
}
