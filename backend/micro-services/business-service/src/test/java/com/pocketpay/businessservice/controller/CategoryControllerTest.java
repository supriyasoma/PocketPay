package com.pocketpay.businessservice.controller;

import com.pocketpay.businessservice.dto.CategoryDto;
import com.pocketpay.businessservice.service.CategoryService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.Arrays;
import java.util.List;

import static org.mockito.Mockito.when;
@ExtendWith(MockitoExtension.class)
class CategoryControllerTest {

    @Mock
    private CategoryService categoryService;

    @InjectMocks
    private CategoryController categoryController;

    @Test
     void getAllCategories_ShouldReturnListOfCategories() throws Exception {
        CategoryDto category1 = new CategoryDto();
        category1.setId(1);
        category1.setName("Category 1");

        CategoryDto category2 = new CategoryDto();
        category2.setId(2);
        category2.setName("Category 2");

        List<CategoryDto> categories = Arrays.asList(category1, category2);

        when(categoryService.getAllCategories()).thenReturn(categories);

        MockMvc mockMvc = MockMvcBuilders.standaloneSetup(categoryController).build();

        mockMvc.perform(MockMvcRequestBuilders.get("/categories"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].id").value(1))
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].name").value("Category 1"))
                .andExpect(MockMvcResultMatchers.jsonPath("$[1].id").value(2))
                .andExpect(MockMvcResultMatchers.jsonPath("$[1].name").value("Category 2"));
    }

    @Test
     void getCategoryById_ShouldReturnCategoryDto() throws Exception {
        CategoryDto categoryDto = new CategoryDto();
        categoryDto.setId(1);
        categoryDto.setName("Category 1");

        when(categoryService.getCategoryById(1)).thenReturn(categoryDto);

        MockMvc mockMvc = MockMvcBuilders.standaloneSetup(categoryController).build();

        mockMvc.perform(MockMvcRequestBuilders.get("/categories/1"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.id").value(1))
                .andExpect(MockMvcResultMatchers.jsonPath("$.name").value("Category 1"));
    }

    @Test
     void getCategoryById_NotFound_ShouldReturn404() throws Exception {
        when(categoryService.getCategoryById(1)).thenReturn(null);

        MockMvc mockMvc = MockMvcBuilders.standaloneSetup(categoryController).build();

        mockMvc.perform(MockMvcRequestBuilders.get("/categories/1"))
                .andExpect(MockMvcResultMatchers.status().isNotFound());
    }
}
