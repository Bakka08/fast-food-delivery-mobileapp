package com.example.demo.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "deliverymen") // You can change the table name if needed
public class Deliveryman {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private String name; 
	@Column(unique = true)
	private String email;
	private String password;
	private String telephone;
	 private String latitude;
	 private String longitude;

	public Deliveryman() {
	}

	public Deliveryman(String name, String email, String password) {
		this.name = name;
		this.email = email;
		this.password = password;
	}

	// Getter and Setter methods

	public Deliveryman(int id, String name, String email, String password, String latitude, String longitude , String telephone) {
		this.id = id;
		this.name = name;
		this.email = email;
		this.password = password;
		this.latitude = latitude;
		this.longitude = longitude;
		this.telephone = telephone;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getLatitude() {
		return latitude;
	}

	public void setLatitude(String latitude) {
		this.latitude = latitude;
	}

	public String getLongitude() {
		return longitude;
	}

	public void setLongitude(String longitude) {
		this.longitude = longitude;
	}

	public String getTelephone() {
		return telephone;
	}

	public void setTelephone(String telephone) {
		this.telephone = telephone;
	}
	
}
