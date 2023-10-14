package com.pocketpay.businessservice.controller;

import com.pocketpay.businessservice.dto.SubCategoryDto;
import com.pocketpay.businessservice.service.SubCategoryService;
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
 class SubCategoryControllerTest {

    @Mock
    private SubCategoryService subcategoryService;

    @InjectMocks
    private SubCategoryController subcategoryController;

    @Test
     void getAllSubcategories_ShouldReturnListOfSubcategories() throws Exception {
        SubCategoryDto subcategory1 = new SubCategoryDto();
        subcategory1.setId(1);
        subcategory1.setName("Subcategory 1");

        SubCategoryDto subcategory2 = new SubCategoryDto();
        subcategory2.setId(2);
        subcategory2.setName("Subcategory 2");

        List<SubCategoryDto> subcategories = Arrays.asList(subcategory1, subcategory2);

        when(subcategoryService.getAllSubCategories()).thenReturn(subcategories);

        MockMvc mockMvc = MockMvcBuilders.standaloneSetup(subcategoryController).build();

        mockMvc.perform(MockMvcRequestBuilders.get("/subCategories"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].id").value(1))
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].name").value("Subcategory 1"))
                .andExpect(MockMvcResultMatchers.jsonPath("$[1].id").value(2))
                .andExpect(MockMvcResultMatchers.jsonPath("$[1].name").value("Subcategory 2"));
    }

    @Test
     void getSubcategoryById_ShouldReturnSubcategoryDto() throws Exception {
        SubCategoryDto subcategoryDto = new SubCategoryDto();
        subcategoryDto.setId(1);
        subcategoryDto.setName("Subcategory 1");

        when(subcategoryService.getSubCategoryById(1)).thenReturn(subcategoryDto);

        MockMvc mockMvc = MockMvcBuilders.standaloneSetup(subcategoryController).build();

        mockMvc.perform(MockMvcRequestBuilders.get("/subCategories/1"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.id").value(1))
                .andExpect(MockMvcResultMatchers.jsonPath("$.name").value("Subcategory 1"));
    }

    @Test
    void getSubcategoryById_NotFound_ShouldReturn404() throws Exception {
        when(subcategoryService.getSubCategoryById(1)).thenReturn(null);

        MockMvc mockMvc = MockMvcBuilders.standaloneSetup(subcategoryController).build();

        mockMvc.perform(MockMvcRequestBuilders.get("/subCategories/1"))
                .andExpect(MockMvcResultMatchers.status().isNotFound());
    }
}
