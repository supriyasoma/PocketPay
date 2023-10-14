package com.pocketpay.businessservice.service;


import com.pocketpay.businessservice.dao.CategoryRepository;
import com.pocketpay.businessservice.dto.CategoryDto;
import com.pocketpay.businessservice.entity.Category;
import com.pocketpay.businessservice.exception.CategoryNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class CategoryServiceImpl implements CategoryService {
    @Autowired
    private CategoryRepository categoryRepository;
    @Override
    public List<CategoryDto> getAllCategories() {
        List<Category> categories = categoryRepository.findAll();
        return categories.stream()
                .map(CategoryDto::CatConvertEntityToDto)
                .toList();
    }

    @Override
    public CategoryDto getCategoryById(int id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new CategoryNotFoundException("Category not found with ID"));
        return CategoryDto.CatConvertEntityToDto(category);
    }
}
