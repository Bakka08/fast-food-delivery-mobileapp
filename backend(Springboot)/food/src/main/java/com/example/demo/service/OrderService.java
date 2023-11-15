package com.example.demo.service;

import java.util.List;

import com.example.demo.entity.Order;
import com.example.demo.idao.IDao;
import com.example.demo.repository.OrderRepository;

public class OrderService implements IDao<Order> {
	OrderRepository orderRepository;

	@Override
	public void save(Order o) {
		orderRepository.save(o);

	}

	@Override
	public void delete(Order o) {
		orderRepository.delete(o);

	}

	@Override
	public void update(Order o) {
		orderRepository.save(o);

	}

	@Override
	public Order FindById(int id) {

		return orderRepository.findById(id);
	}

	@Override
	public List<Order> findAll() {

		return orderRepository.findAll();
	}

}
