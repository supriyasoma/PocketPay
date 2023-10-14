package com.pocketpay.businessservice.service;
import com.pocketpay.businessservice.dao.SubCategoryRepository;
import com.pocketpay.businessservice.dto.SubCategoryDto;
import com.pocketpay.businessservice.entity.SubCategory;
import com.pocketpay.businessservice.exception.SubCategoryNotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

 class SubCategoryServiceImplTest {

    @Mock
    private SubCategoryRepository subcategoryRepository;

    @InjectMocks
    private SubCategoryServiceImpl subcategoryService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
     void testGetAllSubcategories() {
        SubCategory subcategory1 = new SubCategory();
        subcategory1.setId(1);
        subcategory1.setName("Subcategory 1");

        SubCategory subcategory2 = new SubCategory();
        subcategory2.setId(2);
        subcategory2.setName("Subcategory 2");

        List<SubCategory> subcategories = List.of(subcategory1, subcategory2);

        when(subcategoryRepository.findAll()).thenReturn(subcategories);

        List<SubCategoryDto> result = subcategoryService.getAllSubCategories();

        assertEquals(2, result.size());
    }

    @Test
    void testGetSubcategoryById() {
        int subcategoryId = 1;
        SubCategory subcategory = new SubCategory();
        subcategory.setId(subcategoryId);
        subcategory.setName("Subcategory 1");

        when(subcategoryRepository.findById(subcategoryId)).thenReturn(Optional.of(subcategory));

        SubCategoryDto result = subcategoryService.getSubCategoryById(subcategoryId);

        assertNotNull(result);
        assertEquals(subcategoryId, result.getId());
        assertEquals("Subcategory 1", result.getName());
    }

    @Test
   void testGetSubcategoryById_SubcategoryNotFound() {
        int subcategoryId = 1;

        when(subcategoryRepository.findById(subcategoryId)).thenReturn(Optional.empty());

        assertThrows(SubCategoryNotFoundException.class, () -> subcategoryService.getSubCategoryById(subcategoryId));
    }

}
