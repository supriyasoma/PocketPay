package com.pocketpay.businessservice.service;

import com.pocketpay.businessservice.dto.SubCategoryDto;

import java.util.List;

public interface SubCategoryService {
    List<SubCategoryDto> getAllSubCategories();

    SubCategoryDto getSubCategoryById(int id);

}
