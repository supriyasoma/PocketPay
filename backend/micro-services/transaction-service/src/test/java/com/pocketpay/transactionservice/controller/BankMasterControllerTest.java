package com.pocketpay.transactionservice.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.pocketpay.transactionservice.dto.BankMasterDto;
import com.pocketpay.transactionservice.services.BankMasterService;
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

class BankMasterControllerTest {

    @Mock
    private BankMasterService bankMasterService;

    @InjectMocks
    private BankMasterController bankMasterController;

    private MockMvc mockMvc;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.initMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(bankMasterController).build();
    }

    @Test
    void testSaveBankMaster() throws Exception {
        BankMasterDto inputDto = new BankMasterDto(/* initialize with necessary values */);
        BankMasterDto savedDto = new BankMasterDto(/* initialize with necessary values */);

        when(bankMasterService.saveBankMaster(any(BankMasterDto.class))).thenReturn(savedDto);

        mockMvc.perform(MockMvcRequestBuilders.post("/bank-master")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(JsonHelper.convertToJsonString(inputDto)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(savedDto.getId()))
                .andDo(print());
    }

    @Test
    void testFindBankMasterById() throws Exception {
        int bankMasterId = 1;
        BankMasterDto bankMasterDto = new BankMasterDto(/* initialize with necessary values */);

        when(bankMasterService.findBankMasterById(bankMasterId)).thenReturn(bankMasterDto);

        mockMvc.perform(MockMvcRequestBuilders.get("/bank-master/{id}", bankMasterId))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(bankMasterDto.getId()))
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
