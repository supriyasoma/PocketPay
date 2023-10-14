package com.pocketpay.transactionservice.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.pocketpay.transactionservice.dto.PaymentTrackerDto;
import com.pocketpay.transactionservice.services.PaymentTrackerService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.*;

 class PaymentTrackerControllerTest {

    @Mock
    private PaymentTrackerService paymentTrackerService;

    @InjectMocks
    private PaymentTrackerController paymentTrackerController;

    private MockMvc mockMvc;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.initMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(paymentTrackerController).build();
    }

    @Test
    void testFindById() throws Exception {
        int paymentTrackerId = 1;
        PaymentTrackerDto paymentTrackerDto = new PaymentTrackerDto(/* initialize with necessary values */);

        when(paymentTrackerService.getPaymentTrackerById(paymentTrackerId)).thenReturn(paymentTrackerDto);

        mockMvc.perform(MockMvcRequestBuilders.get("/payment_tracker/{id}", paymentTrackerId))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(paymentTrackerDto.getId()))
                .andDo(print());
    }

    @Test
     void testSavePaymentTracker() throws Exception {
        PaymentTrackerDto inputDto = new PaymentTrackerDto(/* initialize with necessary values */);
        PaymentTrackerDto savedDto = new PaymentTrackerDto(/* initialize with necessary values */);

        when(paymentTrackerService.savePaymentTracker(any(PaymentTrackerDto.class))).thenReturn(savedDto);

        mockMvc.perform(MockMvcRequestBuilders.post("/payment_tracker")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(JsonHelper.convertToJsonString(inputDto)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(savedDto.getId()))
                .andDo(print());
    }

    // Helper class to convert objects to JSON strings
    private static class JsonHelper {
        public static String convertToJsonString(Object object) throws Exception {
            ObjectMapper objectMapper = new ObjectMapper();
            return objectMapper.writeValueAsString(object);
        }
    }
}
