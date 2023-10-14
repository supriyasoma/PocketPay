package com.pocketpay.transactionservice.services;

import com.pocketpay.transactionservice.dto.RecipientDto;
import com.pocketpay.transactionservice.entity.Recipient;
import com.pocketpay.transactionservice.exceptions.RecipientNotFoundException;
import com.pocketpay.transactionservice.repository.RecipientRepository;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;


import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

 class RecipientServiceImplTest {

    @Mock
    private RecipientRepository recipientRepository;

    @InjectMocks
    private RecipientServiceImpl recipientService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
   void testSaveRecipient() {
        // Given
        RecipientDto recipientDto = new RecipientDto();
        recipientDto.setFirstName("John");
        recipientDto.setLastName("Doe");

        Recipient savedEntity = RecipientDto.convertDtoToEntity(recipientDto);
        savedEntity.setId(1);

        when(recipientRepository.save(any(Recipient.class))).thenReturn(savedEntity);

        // When
        RecipientDto resultDto = recipientService.saveRecipient(recipientDto);

        // Then
        Assertions.assertEquals(savedEntity.getId(), resultDto.getId());
        Assertions.assertEquals(savedEntity.getFirstName(), resultDto.getFirstName());
        Assertions.assertEquals(savedEntity.getLastName(), resultDto.getLastName());
        verify(recipientRepository, times(1)).save(any(Recipient.class));
    }

    @Test
  void testFindRecipientById_ExistingId() {
        // Given
        int existingId = 1;
        Recipient recipient = new Recipient();
        recipient.setId(existingId);
        recipient.setFirstName("John");
        recipient.setLastName("Doe");

        when(recipientRepository.findById(existingId)).thenReturn(Optional.of(recipient));

        // When
        RecipientDto resultDto = recipientService.findRecipientById(existingId);

        // Then
        Assertions.assertEquals(recipient.getId(), resultDto.getId());
        Assertions.assertEquals(recipient.getFirstName(), resultDto.getFirstName());
        Assertions.assertEquals(recipient.getLastName(), resultDto.getLastName());
        verify(recipientRepository, times(1)).findById(existingId);
    }

    @Test
    void testFindRecipientById_NonExistingId() {
        // Given
        int nonExistingId = 100;

        when(recipientRepository.findById(nonExistingId)).thenReturn(Optional.empty());

        // When/Then
        Assertions.assertThrows(RecipientNotFoundException.class,
                () -> recipientService.findRecipientById(nonExistingId));
        verify(recipientRepository, times(1)).findById(nonExistingId);
    }

    @Test
    void testUpdateRecipient_ExistingId() {
        // Given
        int existingId = 1;
        RecipientDto recipientDto = new RecipientDto();
        recipientDto.setFirstName("Jane");

        Recipient existingRecipient = new Recipient();
        existingRecipient.setId(existingId);
        existingRecipient.setFirstName("John");
        existingRecipient.setLastName("Doe");

        when(recipientRepository.findById(existingId)).thenReturn(Optional.of(existingRecipient));
        when(recipientRepository.save(any(Recipient.class))).thenReturn(existingRecipient);

        // When
        RecipientDto resultDto = recipientService.updateRecipient(existingId, recipientDto);

        // Then
        Assertions.assertEquals(existingRecipient.getId(), resultDto.getId());
        Assertions.assertEquals(recipientDto.getFirstName(), resultDto.getFirstName());
        Assertions.assertEquals(existingRecipient.getLastName(), resultDto.getLastName());
        verify(recipientRepository, times(1)).findById(existingId);
        verify(recipientRepository, times(1)).save(any(Recipient.class));
    }

    @Test
   void testUpdateRecipient_NonExistingId() {
        // Given
        int nonExistingId = 100;
        RecipientDto recipientDto = new RecipientDto();
        recipientDto.setFirstName("Jane");

        when(recipientRepository.findById(nonExistingId)).thenReturn(Optional.empty());

        // When/Then
        Assertions.assertThrows(RecipientNotFoundException.class,
                () -> recipientService.updateRecipient(nonExistingId, recipientDto));
        verify(recipientRepository, times(1)).findById(nonExistingId);
        verify(recipientRepository, times(0)).save(any(Recipient.class));

    }


     @Test
     void testUpdateRecipient_UpdateFields() {
         // Given
         int existingId = 1;
         RecipientDto recipientDto = new RecipientDto();
         recipientDto.setLastName("Doe");
         recipientDto.setEmail("jane@example.com");
         recipientDto.setAccountNumber("123456");
         recipientDto.setAccountType("Savings");

         Recipient existingRecipient = new Recipient();
         existingRecipient.setId(existingId);
         existingRecipient.setFirstName("John");
         existingRecipient.setLastName("Smith");
         existingRecipient.setEmail("john@example.com");
         existingRecipient.setAccountNumber("654321");
         existingRecipient.setAccountType("Checking");

         when(recipientRepository.findById(existingId)).thenReturn(Optional.of(existingRecipient));
         when(recipientRepository.save(any(Recipient.class))).thenReturn(existingRecipient);

         // When
         RecipientDto resultDto = recipientService.updateRecipient(existingId, recipientDto);

         // Then
         Assertions.assertEquals(existingRecipient.getId(), resultDto.getId());
         Assertions.assertEquals(existingRecipient.getFirstName(), resultDto.getFirstName());
         Assertions.assertEquals(recipientDto.getLastName(), resultDto.getLastName());
         Assertions.assertEquals(recipientDto.getEmail(), resultDto.getEmail());
         Assertions.assertEquals(recipientDto.getAccountNumber(), resultDto.getAccountNumber());
         Assertions.assertEquals(recipientDto.getAccountType(), resultDto.getAccountType());
         verify(recipientRepository, times(1)).findById(existingId);
         verify(recipientRepository, times(1)).save(any(Recipient.class));
     }

 }
