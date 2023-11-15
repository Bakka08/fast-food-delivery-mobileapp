package com.example.demo.service;

import java.util.List;

import com.example.demo.entity.Basket;
import com.example.demo.idao.IDao;
import com.example.demo.repository.BasketRepository;

public class BasketService implements IDao<Basket> {
	BasketRepository basketRepository;

	@Override
	public void save(Basket o) {
		basketRepository.save(o);

	}

	@Override
	public void delete(Basket o) {
		basketRepository.delete(o);

	}

	@Override
	public void update(Basket o) {
		basketRepository.save(o);

	}

	@Override
	public Basket FindById(int id) {

		return basketRepository.findById(id);
	}

	@Override
	public List<Basket> findAll() {

		return basketRepository.findAll();
	}
}
