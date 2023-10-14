package com.pocketpay.businessservice.controller;

import com.pocketpay.businessservice.dto.BusinessNameDto;
import com.pocketpay.businessservice.service.BusinessNameService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.Arrays;
import java.util.List;

import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
 class BusinessNameControllerTest {

    @Mock
    private BusinessNameService businessNameService;

    @InjectMocks
    private BusinessNameController businessNameController;

    @Test
     void getAllBusinessNames_ShouldReturnListOfBusinessNames() throws Exception {
        BusinessNameDto businessName1 = new BusinessNameDto();
        businessName1.setId(1);
        businessName1.setName("Business 1");

        BusinessNameDto businessName2 = new BusinessNameDto();
        businessName2.setId(2);
        businessName2.setName("Business 2");

        List<BusinessNameDto> businessNames = Arrays.asList(businessName1, businessName2);

        when(businessNameService.getAllBusinessNames()).thenReturn(businessNames);

        MockMvc mockMvc = MockMvcBuilders.standaloneSetup(businessNameController).build();

        mockMvc.perform(MockMvcRequestBuilders.get("/businessnames"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].id").value(1))
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].name").value("Business 1"))
                .andExpect(MockMvcResultMatchers.jsonPath("$[1].id").value(2))
                .andExpect(MockMvcResultMatchers.jsonPath("$[1].name").value("Business 2"));
    }

    @Test
    void getBusinessNameById_ShouldReturnBusinessNameDto() throws Exception {
        BusinessNameDto businessNameDto = new BusinessNameDto();
        businessNameDto.setId(1);
        businessNameDto.setName("Business 1");

        when(businessNameService.getBusinessNameById(1)).thenReturn(businessNameDto);

        MockMvc mockMvc = MockMvcBuilders.standaloneSetup(businessNameController).build();

        mockMvc.perform(MockMvcRequestBuilders.get("/businessnames/1"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.id").value(1))
                .andExpect(MockMvcResultMatchers.jsonPath("$.name").value("Business 1"));
    }

    @Test
     void getBusinessNameById_NotFound_ShouldReturn404() throws Exception {
        when(businessNameService.getBusinessNameById(1)).thenReturn(null);

        MockMvc mockMvc = MockMvcBuilders.standaloneSetup(businessNameController).build();

        mockMvc.perform(MockMvcRequestBuilders.get("/businessnames/1"))
                .andExpect(MockMvcResultMatchers.status().isNotFound());
    }
}
