package com.pocketpay.businessservice.dto;

import com.pocketpay.businessservice.entity.TradingAddress;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

 class TradingAddressDtoTest {
    @Test
     void testConvertDtoToEntity() {
        // Given
        TradingAddressDto dto = TradingAddressDto.builder()
                .id(1)
                .address("123 Main St")
                .businessId(1001)
                .build();

        // When
        TradingAddress entity = TradingAddressDto.convertDtoToEntity(dto);

        // Then
        assertEquals(dto.getId(), entity.getId());
        assertEquals(dto.getAddress(), entity.getAddress());
    }


}