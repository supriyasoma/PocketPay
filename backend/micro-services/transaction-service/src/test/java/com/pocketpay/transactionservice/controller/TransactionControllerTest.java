package com.pocketpay.transactionservice.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.pocketpay.transactionservice.dto.TransactionDto;
import com.pocketpay.transactionservice.services.TransactionService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.Arrays;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.*;

class TransactionControllerTest {

    @Mock
    private TransactionService transactionService;

    @InjectMocks
    private TransactionController transactionController;

    private MockMvc mockMvc;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.initMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(transactionController).build();
    }

    @Test
    void testSaveTransaction() throws Exception {
        TransactionDto inputDto = new TransactionDto(/* initialize with necessary values */);
        TransactionDto savedDto = new TransactionDto(/* initialize with necessary values */);

        when(transactionService.saveTransaction(any(TransactionDto.class))).thenReturn(savedDto);

        mockMvc.perform(MockMvcRequestBuilders.post("/transaction")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(JsonHelper.convertToJsonString(inputDto)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(savedDto.getId()))
                .andDo(print());
    }

    @Test
     void testFindById() throws Exception {
        int transactionId = 1;
        TransactionDto transactionDto = new TransactionDto(/* initialize with necessary values */);

        when(transactionService.getByTransactionId(transactionId)).thenReturn(transactionDto);

        mockMvc.perform(MockMvcRequestBuilders.get("/transaction/{id}", transactionId))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(transactionDto.getId()))
                .andDo(print());
    }

    @Test
   void testFindBySenderId() throws Exception {
        int senderId = 1;
        TransactionDto transactionDto1 = new TransactionDto(/* initialize with necessary values */);
        TransactionDto transactionDto2 = new TransactionDto(/* initialize with necessary values */);
        List<TransactionDto> transactionDtos = Arrays.asList(transactionDto1, transactionDto2);

        when(transactionService.getTransactionBySenderId(senderId)).thenReturn(transactionDtos);

        mockMvc.perform(MockMvcRequestBuilders.get("/transaction")
                        .param("senderId", String.valueOf(senderId)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id").value(transactionDto1.getId()))
                .andExpect(jsonPath("$[1].id").value(transactionDto2.getId()))
                .andDo(print());
    }

    @Test
     void testUpdateTransactionData() throws Exception {
        TransactionDto inputDto = new TransactionDto(/* initialize with necessary values */);
        TransactionDto updatedDto = new TransactionDto(/* initialize with updated values */);

        when(transactionService.updateTransaction(any(TransactionDto.class))).thenReturn(updatedDto);

        mockMvc.perform(MockMvcRequestBuilders.patch("/transaction")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(JsonHelper.convertToJsonString(inputDto)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(updatedDto.getId()))
                .andDo(print());
    }

    // Add more test methods as needed

    // Helper class to convert objects to JSON strings
    private static class JsonHelper {
        public static String convertToJsonString(Object object) throws Exception {
            ObjectMapper objectMapper = new ObjectMapper();
            return objectMapper.writeValueAsString(object);
        }
    }
}
