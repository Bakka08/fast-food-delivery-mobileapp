package com.example.demo.service;

import java.util.List;

import com.example.demo.entity.Meal;
import com.example.demo.idao.IDao;
import com.example.demo.repository.MealRepository;

public class MealService implements IDao<Meal> {
	MealRepository mealRepository;
	

	@Override
	public void save(Meal o) {
		mealRepository.save(o);

	}

	@Override 
	public void delete(Meal o) {
		mealRepository.delete(o);

	}

	@Override
	public void update(Meal o) {
		mealRepository.save(o);

	}

	@Override
	public Meal FindById(int id) {

		return mealRepository.findById(id);
	}

	@Override
	public List<Meal> findAll() {

		return mealRepository.findAll();
	}


}





	


