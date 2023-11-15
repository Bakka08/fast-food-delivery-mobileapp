package com.example.demo.entity;

import java.sql.Date;
import java.text.SimpleDateFormat;
import java.util.Random;

import jakarta.persistence.*;

@Entity
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String latitude;
    private String longitude;
    private String etat;
    private String names;
    private String QR;
    private Date date1;
    private String time;
    
    @ManyToOne
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

    private double totalPrice;

    @ManyToOne
    @JoinColumn(name = "deliveryman_id")
    private Deliveryman deliveryman;

    public Order() {
        // Default constructor
    }

    public Order(String latitude, String longitude, User user, Meal mainMeal, Meal optionalMeal1,
            Meal optionalMeal2, Meal optionalMeal3, double totalPrice) {
        this.latitude = latitude;
        this.longitude = longitude;
        this.user = user;
        this.mainMeal = mainMeal;
        this.optionalMeal1 = optionalMeal1;
        this.optionalMeal2 = optionalMeal2;
        this.optionalMeal3 = optionalMeal3;
        this.totalPrice = totalPrice + 12;
        this.etat = "WAITING FOR DELIVERY MAN TO ACCEPT";
        this.deliveryman = null;
        this.names = "";
        this.time = "";

        // Generate a random 15-character string for the QR field
        this.QR = generateRandomString(15);

        // Set the date1 field to the current date
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        this.date1 = Date.valueOf(dateFormat.format(new Date(System.currentTimeMillis())));

    }

    // Function to generate a random string of a given length
    private String generateRandomString(int length) {
        String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        StringBuilder randomString = new StringBuilder(length);
        Random random = new Random();
        for (int i = 0; i < length; i++) {
            randomString.append(characters.charAt(random.nextInt(characters.length())));
        }
        return randomString.toString();
    }

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
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

	public String getEtat() {
		return etat;
	}

	public void setEtat(String etat) {
		this.etat = etat;
	}

	public String getNames() {
		return names;
	}

	public void setNames(String names) {
		this.names = names;
	}

	public String getQR() {
		return QR;
	}

	public void setQR(String qR) {
		QR = qR;
	}


	public Date getDate1() {
		return date1;
	}

	public void setDate1(Date date1) {
		this.date1 = date1;
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

	public double getTotalPrice() {
		return totalPrice;
	}

	public void setTotalPrice(double totalPrice) {
		this.totalPrice = totalPrice;
	}

	public Deliveryman getDeliveryman() {
		return deliveryman;
	}

	public void setDeliveryman(Deliveryman deliveryman) {
		this.deliveryman = deliveryman;
	}

	public String getTime() {
		return time;
	}

	public void setTime(String time) {
		this.time = time;
	}
	
    
    
}