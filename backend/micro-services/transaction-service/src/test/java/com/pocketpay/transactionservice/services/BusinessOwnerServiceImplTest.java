package com.pocketpay.transactionservice.services;

import com.pocketpay.transactionservice.dto.BusinessOwnerDto;
import com.pocketpay.transactionservice.entity.BusinessOwner;
import com.pocketpay.transactionservice.repository.BusinessOwnerRepository;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;

import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;


import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class BusinessOwnerServiceImplTest {
    @Mock
    private BusinessOwnerRepository businessOwnerRepository;

    @InjectMocks
    private BusinessOwnerServiceImpl businessOwnerService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testSaveBusinessOwner() {
        // Given
        BusinessOwnerDto businessOwnerDto = new BusinessOwnerDto();
        businessOwnerDto.setId(1);
        businessOwnerDto.setFirstName("John ");
        businessOwnerDto.setLastName("Doe");

        BusinessOwner savedEntity = BusinessOwnerDto.convertDtoToEntity(businessOwnerDto);
        savedEntity.setId(1);

        when(businessOwnerRepository.save(any(BusinessOwner.class))).thenReturn(savedEntity);

        // When
        BusinessOwnerDto resultDto = businessOwnerService.saveBusinessOwner(businessOwnerDto);

        // Then
        Assertions.assertEquals(savedEntity.getId(), resultDto.getId());
        Assertions.assertEquals(savedEntity.getFirstName(), resultDto.getFirstName());
        verify(businessOwnerRepository, times(1)).save(any(BusinessOwner.class));
    }
}



