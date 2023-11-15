package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.Category;
import com.example.demo.entity.User;

public interface CategoryRepository extends JpaRepository<Category, Integer> {
	List<Category> findAll();

	Category findById(int id);
}
