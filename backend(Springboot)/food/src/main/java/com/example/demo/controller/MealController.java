package com.example.demo.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.Meal;
import com.example.demo.repository.MealRepository;

@CrossOrigin
@RestController
@RequestMapping("/api/meals")
public class MealController {
	@Autowired
	private MealRepository mealRepository;

	@GetMapping("/allbycategory/{categoryid}")
	public List<Meal> getMealsByCategory(@PathVariable int categoryid) {
		List<Meal> allMeals = mealRepository.findAll();
		List<Meal> mealsInCategory = new ArrayList<Meal>();
		for (Meal meal : allMeals) {
			if (meal.getCategory().getId() == categoryid) {
				mealsInCategory.add(meal);
			}
		}

		return mealsInCategory;
	}
	
	
	@GetMapping("/allbyrestaurant/{restaurantid}")
	public List<Meal> getMealsByRestaurant(@PathVariable int restaurantid) {
	    List<Meal> allMeals = mealRepository.findAll();
	    List<Meal> mealsInRestaurant = new ArrayList<Meal>();
	    for (Meal meal : allMeals) {
	        if (meal.getRestaurant().getId() == restaurantid) {
	            mealsInRestaurant.add(meal);
	        }
	    }

	    return mealsInRestaurant;
	}


}
