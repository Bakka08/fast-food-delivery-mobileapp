package com.example.demo.service;

import java.util.List;

import com.example.demo.entity.Restaurant;
import com.example.demo.idao.IDao;
import com.example.demo.repository.RestaurantRepository;

public class RestaurantService implements IDao<Restaurant> {
	

	
		RestaurantRepository restaurantRepository;;

		@Override
		public void save(Restaurant o) {
			restaurantRepository.save(o);

		}

		@Override 
		public void delete(Restaurant o) {
			restaurantRepository.delete(o);

		}

		@Override
		public void update(Restaurant o) {
			restaurantRepository.save(o);

		}

		@Override
		public Restaurant FindById(int id) {

			return restaurantRepository.findById(id);
		}

		@Override
		public List<Restaurant> findAll() {

			return restaurantRepository.findAll();
		}

	}


