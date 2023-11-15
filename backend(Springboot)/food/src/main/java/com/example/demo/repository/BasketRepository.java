package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.Basket;

public interface BasketRepository extends JpaRepository<Basket, Integer> {
	List<Basket> findAll();

	Basket findById(int id);
}
