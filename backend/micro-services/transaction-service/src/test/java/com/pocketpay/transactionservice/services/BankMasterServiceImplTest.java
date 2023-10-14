package com.pocketpay.transactionservice.services;

import com.pocketpay.transactionservice.dto.BankMasterDto;
import com.pocketpay.transactionservice.entity.BankMaster;
import com.pocketpay.transactionservice.exceptions.BankMasterNotFoundException;
import com.pocketpay.transactionservice.repository.BankMasterRepository;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;


import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

 class BankMasterServiceImplTest {

    @Mock
    private BankMasterRepository bankMasterRepository;

    @InjectMocks
    private BankMasterServiceImpl bankMasterService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testSaveBankMaster() {
        // Given
        BankMasterDto bankMasterDto = new BankMasterDto();
        bankMasterDto.setName("Test Bank");
        BankMaster savedEntity = BankMasterDto.convertDtoToEntity(bankMasterDto);
        savedEntity.setId(1);

        when(bankMasterRepository.save(any(BankMaster.class))).thenReturn(savedEntity);

        // When
        BankMasterDto resultDto = bankMasterService.saveBankMaster(bankMasterDto);

        // Then
        Assertions.assertEquals(savedEntity.getId(), resultDto.getId());
        Assertions.assertEquals(savedEntity.getName(), resultDto.getName());
        verify(bankMasterRepository, times(1)).save(any(BankMaster.class));
    }

    @Test
     void testFindBankMasterById_ExistingId() {
        // Given
        int existingId = 1;
        BankMaster bankMaster = new BankMaster();
        bankMaster.setId(existingId);
        bankMaster.setName("Test Bank");

        when(bankMasterRepository.findById(existingId)).thenReturn(Optional.of(bankMaster));

        // When
        BankMasterDto resultDto = bankMasterService.findBankMasterById(existingId);

        // Then
        Assertions.assertEquals(bankMaster.getId(), resultDto.getId());
        Assertions.assertEquals(bankMaster.getName(), resultDto.getName());
        verify(bankMasterRepository, times(1)).findById(existingId);
    }

    @Test
   void testFindBankMasterById_NonExistingId() {
        // Given
        int nonExistingId = 100;

        when(bankMasterRepository.findById(nonExistingId)).thenReturn(Optional.empty());

        // When/Then
        Assertions.assertThrows(BankMasterNotFoundException.class,
                () -> bankMasterService.findBankMasterById(nonExistingId));
        verify(bankMasterRepository, times(1)).findById(nonExistingId);
    }
}
