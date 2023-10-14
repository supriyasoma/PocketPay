package com.pocketpay.businessservice.service;

import com.pocketpay.businessservice.dao.SubCategoryRepository;
import com.pocketpay.businessservice.dto.SubCategoryDto;
import com.pocketpay.businessservice.entity.SubCategory;
import com.pocketpay.businessservice.exception.SubCategoryNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class SubCategoryServiceImpl implements SubCategoryService {
    @Autowired
    private SubCategoryRepository subcategoryRepository;
    @Override
    public List<SubCategoryDto> getAllSubCategories() {
        List<SubCategory> subcategories = subcategoryRepository.findAll();
        return subcategories.stream()
                .map(SubCategoryDto::SubConvertEntityToDto)
                .toList();
    }
    @Override
    public SubCategoryDto getSubCategoryById(int id) {
        SubCategory subcategory = subcategoryRepository.findById(id)
                .orElseThrow(() -> new SubCategoryNotFoundException("Subcategory not found"));
        return SubCategoryDto.SubConvertEntityToDto(subcategory);
    }

}
