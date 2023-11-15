package com.example.demo.service;

import java.util.List;

import com.example.demo.entity.User;
import com.example.demo.idao.IDao;
import com.example.demo.repository.UserRepository;

public class UserService implements IDao<User> {
	UserRepository userRepository;

	@Override
	public void save(User o) {
		userRepository.save(o);

	}

	@Override 
	public void delete(User o) {
		userRepository.delete(o);

	}

	@Override
	public void update(User o) {
		userRepository.save(o);

	}

	@Override
	public User FindById(int id) {

		return userRepository.findById(id);
	}

	@Override
	public List<User> findAll() {

		return userRepository.findAll();
	}

}
