package com.pocketpay.businessservice.service;
import com.pocketpay.businessservice.dao.CategoryRepository;
import com.pocketpay.businessservice.dto.CategoryDto;
import com.pocketpay.businessservice.entity.Category;
import com.pocketpay.businessservice.exception.CategoryNotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

 class CategoryServiceImplTest {

    @Mock
    private CategoryRepository categoryRepository;

    @InjectMocks
    private CategoryServiceImpl categoryService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
     void testGetAllCategories() {
        Category category1 = new Category();
        category1.setId(1);
        category1.setName("Category 1");

        Category category2 = new Category();
        category2.setId(2);
        category2.setName("Category 2");

        List<Category> categories = List.of(category1, category2);

        when(categoryRepository.findAll()).thenReturn(categories);

        List<CategoryDto> result = categoryService.getAllCategories();

        assertEquals(2, result.size());
    }

    @Test
     void testGetCategoryById() {
        int categoryId = 1;
        Category category = new Category();
        category.setId(categoryId);
        category.setName("Category 1");

        when(categoryRepository.findById(categoryId)).thenReturn(Optional.of(category));

        CategoryDto result = categoryService.getCategoryById(categoryId);

        assertNotNull(result);
        assertEquals(categoryId, result.getId());
        assertEquals("Category 1", result.getName());
    }

    @Test
    void testGetCategoryById_CategoryNotFound() {
        int categoryId = 1;
        when(categoryRepository.findById(categoryId)).thenReturn(Optional.empty());
        assertThrows(CategoryNotFoundException.class, () -> categoryService.getCategoryById(categoryId));
    }

}
