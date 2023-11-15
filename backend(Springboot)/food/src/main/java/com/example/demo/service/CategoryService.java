package com.example.demo.service;

import java.util.List;

import com.example.demo.entity.Category;
import com.example.demo.idao.IDao;
import com.example.demo.repository.CategoryRepository;

public class CategoryService implements IDao<Category> {

	CategoryRepository categoryRepository;

	@Override
	public void save(Category o) {
		categoryRepository.save(o);

	}

	@Override
	public void delete(Category o) {
		categoryRepository.delete(o);

	}

	@Override
	public void update(Category o) {
		categoryRepository.save(o);

	}

	@Override
	public Category FindById(int id) {

		return categoryRepository.findById(id);
	}

	@Override
	public List<Category> findAll() {

		return categoryRepository.findAll();
	}

}
