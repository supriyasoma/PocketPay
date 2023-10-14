package com.pocketpay.businessservice.dto;

import com.pocketpay.businessservice.entity.BusinessName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

class BusinessNameDtoTest {


    @Test
    void testConvertDtoToEntity() {
        // Arrange
        BusinessNameDto businessNameDto = BusinessNameDto.builder()
                .id(1)
                .name("Sample Business")
                .build();

        // Act
        BusinessName businessName = BusinessNameDto.convertDtoToEntity(businessNameDto);

        // Assert
        assertNotNull(businessName);
        assertEquals(businessNameDto.getId(), businessName.getId());
        assertEquals(businessNameDto.getName(), businessName.getName());
    }

    @Test
    void testConvertEntityToDto() {
        // Arrange
        BusinessName businessName = new BusinessName(2, "Another Business");

        // Act
        BusinessNameDto businessNameDto = BusinessNameDto.convertEntityToDto(businessName);

        // Assert
        assertNotNull(businessNameDto);
        assertEquals(businessName.getId(), businessNameDto.getId());
        assertEquals(businessName.getName(), businessNameDto.getName());
    }
}

