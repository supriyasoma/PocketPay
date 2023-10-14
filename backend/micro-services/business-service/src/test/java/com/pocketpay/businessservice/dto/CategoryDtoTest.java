package com.pocketpay.businessservice.dto;

import com.pocketpay.businessservice.entity.Category;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

 class CategoryDtoTest {

    @Test
    void testCatConvertDtoToEntity() {
        // Arrange
        CategoryDto categoryDto = CategoryDto.builder()
                .id(1)
                .name("Sample Category")
                .build();

        // Act
        Category category = CategoryDto.CatConvertDtoToEntity(categoryDto);

        // Assert
        assertNotNull(category);
        assertEquals(categoryDto.getId(), category.getId());
        assertEquals(categoryDto.getName(), category.getName());
    }

    @Test
    void testCatConvertEntityToDto() {
        // Arrange
        Category category = new Category(2, "Another Category");

        // Act
        CategoryDto categoryDto = CategoryDto.CatConvertEntityToDto(category);

        // Assert
        assertNotNull(categoryDto);
        assertEquals(category.getId(), categoryDto.getId());
        assertEquals(category.getName(), categoryDto.getName());
    }
}
