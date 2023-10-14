package com.pocketpay.transactionservice.controller;

import com.pocketpay.transactionservice.dto.BusinessOwnerDto;
import com.pocketpay.transactionservice.services.BusinessOwnerService;
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

import java.util.Date;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class BusinessOwnerControllerTest {

    @Mock
    private BusinessOwnerService businessOwnerService;

    @InjectMocks
    private BusinessOwnerController businessOwnerController;

    @Test
    void saveBusinessOwner_ShouldReturnBusinessOwnerDto() throws Exception {
        BusinessOwnerDto businessOwnerDto = new BusinessOwnerDto();
        businessOwnerDto.setId(1);
        businessOwnerDto.setFirstName("John");
        businessOwnerDto.setLastName("Doe");


        when(businessOwnerService.saveBusinessOwner(any(BusinessOwnerDto.class))).thenReturn(businessOwnerDto);

        MockMvc mockMvc = MockMvcBuilders.standaloneSetup(businessOwnerController).build();

        mockMvc.perform(MockMvcRequestBuilders.post("/business-owner")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{ \"id\": 1, \"firstName\": \"John\", \"lastName\": \"Doe\", \"dob\": \"1690531423842\", \"role\": \"DIRECTOR\" }"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.id").value(1))
                .andExpect(MockMvcResultMatchers.jsonPath("$.firstName").value("John"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.lastName").value("Doe"));
    }
}
