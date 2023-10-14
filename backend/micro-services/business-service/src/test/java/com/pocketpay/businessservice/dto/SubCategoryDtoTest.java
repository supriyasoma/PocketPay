package com.pocketpay.businessservice.dto;

import com.pocketpay.businessservice.entity.SubCategory;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

 class SubCategoryDtoTest {

    @Test
    void testSubConvertDtoToEntity() {
        // Arrange
        SubCategoryDto subCategoryDto = SubCategoryDto.builder()
                .id(1)
                .name("Sample SubCategory")
                .build();

        // Act
        SubCategory subCategory = SubCategoryDto.SubConvertDtoToEntity(subCategoryDto);

        // Assert
        assertNotNull(subCategory);
        assertEquals(subCategoryDto.getId(), subCategory.getId());
        assertEquals(subCategoryDto.getName(), subCategory.getName());
    }

    @Test
     void testSubConvertEntityToDto() {
        // Arrange
        SubCategory subCategory = new SubCategory(2, "Another SubCategory");

        // Act
        SubCategoryDto subCategoryDto = SubCategoryDto.SubConvertEntityToDto(subCategory);

        // Assert
        assertNotNull(subCategoryDto);
        assertEquals(subCategory.getId(), subCategoryDto.getId());
        assertEquals(subCategory.getName(), subCategoryDto.getName());
    }
}
