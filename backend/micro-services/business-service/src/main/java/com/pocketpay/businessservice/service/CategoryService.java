package com.pocketpay.businessservice.service;

import com.pocketpay.businessservice.dto.CategoryDto;

import java.util.List;

public interface CategoryService {
    List<CategoryDto> getAllCategories();

    CategoryDto getCategoryById(int id);
}
