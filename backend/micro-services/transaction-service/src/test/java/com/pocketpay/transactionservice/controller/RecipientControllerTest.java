package com.pocketpay.transactionservice.controller;

import com.pocketpay.transactionservice.dto.RecipientDto;
import com.pocketpay.transactionservice.services.RecipientService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class RecipientControllerTest {

    @Mock
    private RecipientService recipientService;

    @InjectMocks
    private RecipientController recipientController;

    @Test
    void saveRecipient_ShouldReturnRecipientDto() throws Exception {
        RecipientDto recipientDto = new RecipientDto();
        recipientDto.setId(1);
        recipientDto.setFirstName("John");
        recipientDto.setLastName("Doe");
        recipientDto.setEmail("john@example.com");
        recipientDto.setAccountNumber("1234567890");
        recipientDto.setIfsc("ABCD1234");
        recipientDto.setAccountType("Savings");

        when(recipientService.saveRecipient(any(RecipientDto.class))).thenReturn(recipientDto);

        MockMvc mockMvc = MockMvcBuilders.standaloneSetup(recipientController).build();

        mockMvc.perform(MockMvcRequestBuilders.post("/recipient")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{ \"id\": 1, \"firstName\": \"John\", \"lastName\": \"Doe\", \"email\": \"john@example.com\", \"accountNumber\": \"1234567890\", \"ifsc\": \"ABCD1234\", \"accountType\": \"Savings\" }"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.id").value(1))
                .andExpect(MockMvcResultMatchers.jsonPath("$.firstName").value("John"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.lastName").value("Doe"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.email").value("john@example.com"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.accountNumber").value("1234567890"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.ifsc").value("ABCD1234"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.accountType").value("Savings"));
    }

    @Test
     void findById_ShouldReturnRecipientDto() throws Exception {
        RecipientDto recipientDto = new RecipientDto();
        recipientDto.setId(1);
        recipientDto.setFirstName("John");
        recipientDto.setLastName("Doe");
        recipientDto.setEmail("john@example.com");
        recipientDto.setAccountNumber("1234567890");
        recipientDto.setIfsc("ABCD1234");
        recipientDto.setAccountType("Savings");

        when(recipientService.findRecipientById(1)).thenReturn(recipientDto);

        MockMvc mockMvc = MockMvcBuilders.standaloneSetup(recipientController).build();

        mockMvc.perform(MockMvcRequestBuilders.get("/recipient/1"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.id").value(1))
                .andExpect(MockMvcResultMatchers.jsonPath("$.firstName").value("John"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.lastName").value("Doe"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.email").value("john@example.com"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.accountNumber").value("1234567890"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.ifsc").value("ABCD1234"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.accountType").value("Savings"));
    }
    @Test
    void updateRecipientData_ShouldReturnUpdatedRecipientDto() throws Exception {
        RecipientDto recipientDto = new RecipientDto();
        recipientDto.setId(1);
        recipientDto.setFirstName("Jane");
        recipientDto.setLastName("Doe");
        recipientDto.setEmail("jane@example.com");
        recipientDto.setAccountNumber("1234567890");
        recipientDto.setIfsc("ABCD1234");
        recipientDto.setAccountType("Savings");

        when(recipientService.updateRecipient(eq(1), any(RecipientDto.class))).thenReturn(recipientDto);

        MockMvc mockMvc = MockMvcBuilders.standaloneSetup(recipientController).build();

        mockMvc.perform(MockMvcRequestBuilders.patch("/recipient/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{ \"id\": 1, \"firstName\": \"Jane\", \"lastName\": \"Doe\", \"email\": \"jane@example.com\", \"accountNumber\": \"1234567890\", \"ifsc\": \"ABCD1234\", \"accountType\": \"Savings\" }"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.id").value(1))
                .andExpect(MockMvcResultMatchers.jsonPath("$.firstName").value("Jane"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.lastName").value("Doe"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.email").value("jane@example.com"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.accountNumber").value("1234567890"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.ifsc").value("ABCD1234"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.accountType").value("Savings"));
    }

}
