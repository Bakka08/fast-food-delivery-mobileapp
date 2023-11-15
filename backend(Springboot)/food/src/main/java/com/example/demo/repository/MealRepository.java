package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.Meal;

public interface MealRepository extends JpaRepository<Meal, Integer> {

	List<Meal> findAll();

	Meal findById(int id);

}
