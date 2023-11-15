package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.demo.entity.Restaurant;

public interface RestaurantRepository extends JpaRepository<Restaurant, Integer> {

	List<Restaurant> findAll();

	Restaurant findById(int id);

    

}
