package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.repository.OrderRepository;

@CrossOrigin
@RestController
@RequestMapping("/api/orders")
public class OrderController {

	@Autowired
	private OrderRepository orderRepository;

}
