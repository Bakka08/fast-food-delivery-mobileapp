package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.Deliveryman;
import com.example.demo.entity.User;

public interface DeliverymanRepository extends JpaRepository<Deliveryman, Integer> {

	List<Deliveryman> findAll();

	Deliveryman findById(int id);

	Deliveryman findByEmail(String email);
}
