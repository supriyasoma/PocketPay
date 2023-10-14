package com.pocketpay.transactionservice.services;

import com.pocketpay.transactionservice.dto.RecipientDto;
import com.pocketpay.transactionservice.dto.TransactionDto;
import com.pocketpay.transactionservice.entity.Recipient;
import com.pocketpay.transactionservice.entity.Transaction;
import com.pocketpay.transactionservice.exceptions.TransactionNotFoundException;
import com.pocketpay.transactionservice.repository.TransactionRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

 class TransactionServiceImplTest {

    @Mock
    private TransactionRepository transactionRepository;

    @InjectMocks
    private TransactionServiceImpl transactionService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    void testSaveTransaction() {
        TransactionDto inputDto = new TransactionDto(/* initialize with necessary values */);
        Transaction savedTransaction = new Transaction(/* initialize with necessary values */);

        when(transactionRepository.save(any(Transaction.class))).thenReturn(savedTransaction);

        TransactionDto resultDto = transactionService.saveTransaction(inputDto);

        assertNotNull(resultDto);
        assertEquals(savedTransaction.getId(), resultDto.getId());
        // Add more assertions based on your requirements
    }

    @Test
    void testGetTransactionBySenderId() {
        int senderId = 1;
        Transaction transaction1 = new Transaction(/* initialize with necessary values */);
        Transaction transaction2 = new Transaction(/* initialize with necessary values */);
        List<Transaction> transactions = Arrays.asList(transaction1, transaction2);

        when(transactionRepository.findAllBySenderId(senderId)).thenReturn(transactions);

        List<TransactionDto> resultDtos = transactionService.getTransactionBySenderId(senderId);

        assertNotNull(resultDtos);
        assertEquals(transactions.size(), resultDtos.size());
        // Add more assertions based on your requirements
    }

    @Test
    void testGetByTransactionId() {
        int transactionId = 1;
        Transaction transaction = new Transaction(/* initialize with necessary values */);

        when(transactionRepository.findById(transactionId)).thenReturn(Optional.of(transaction));

        TransactionDto resultDto = transactionService.getByTransactionId(transactionId);

        assertNotNull(resultDto);
        assertEquals(transaction.getId(), resultDto.getId());
        // Add more assertions based on your requirements
    }

    @Test
    void testUpdateTransaction() {
        TransactionDto inputDto = new TransactionDto(/* initialize with necessary values */);
        Transaction existingTransaction = new Transaction(/* initialize with necessary values */);

        when(transactionRepository.findById(anyInt())).thenReturn(Optional.of(existingTransaction));
        when(transactionRepository.save(any(Transaction.class))).thenReturn(existingTransaction);

        TransactionDto resultDto = transactionService.updateTransaction(inputDto);

        assertNotNull(resultDto);
        // Add more assertions based on your requirements
    }

    @Test
     void testUpdateTransactionNotFound() {
        TransactionDto inputDto = new TransactionDto(/* initialize with necessary values */);

        when(transactionRepository.findById(anyInt())).thenReturn(Optional.empty());

        assertThrows(TransactionNotFoundException.class, () -> {
            transactionService.updateTransaction(inputDto);
        });
    }

     @Test
     void testUpdateTransactionAmount() {
         int transactionId = 1;
         double newAmount = 500.0;

         TransactionDto inputDto = new TransactionDto();
         inputDto.setId(transactionId);
         inputDto.setAmount(newAmount);

         Transaction existingTransaction = new Transaction(/* initialize with necessary values */);

         when(transactionRepository.findById(anyInt())).thenReturn(Optional.of(existingTransaction));
         when(transactionRepository.save(any(Transaction.class))).thenReturn(existingTransaction);

         TransactionDto resultDto = transactionService.updateTransaction(inputDto);

         assertNotNull(resultDto);

         ArgumentCaptor<Transaction> transactionCaptor = ArgumentCaptor.forClass(Transaction.class);
         verify(transactionRepository).save(transactionCaptor.capture());

         Transaction savedTransaction = transactionCaptor.getValue();
         assertEquals(newAmount, savedTransaction.getAmount());
         // Add more assertions based on your requirements
     }

     @Test
     void testUpdateTransactionRecipient() {
         int transactionId = 1;

         Recipient recipientDto = new Recipient(/* initialize with necessary values */);

         TransactionDto inputDto = new TransactionDto();
         inputDto.setId(transactionId);
         inputDto.setRecipient(recipientDto);

         Transaction existingTransaction = new Transaction(/* initialize with necessary values */);

         when(transactionRepository.findById(anyInt())).thenReturn(Optional.of(existingTransaction));
         when(transactionRepository.save(any(Transaction.class))).thenReturn(existingTransaction);

         TransactionDto resultDto = transactionService.updateTransaction(inputDto);

         assertNotNull(resultDto);

         ArgumentCaptor<Transaction> transactionCaptor = ArgumentCaptor.forClass(Transaction.class);
         verify(transactionRepository).save(transactionCaptor.capture());

         Transaction savedTransaction = transactionCaptor.getValue();
         assertEquals(recipientDto.getId(), savedTransaction.getRecipient().getId());
         // Add more assertions based on your requirements
     }
    // Add more test methods as needed

}
