package com.pocketpay.businessservice.controller;

import com.pocketpay.businessservice.dto.BusinessDto;
import com.pocketpay.businessservice.service.BusinessService;
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

import java.util.Arrays;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
 class BusinessControllerTest {

    @Mock
    private BusinessService businessService;

    @InjectMocks
    private BusinessController businessController;

    @Test
    void getAllBusinesses_ShouldReturnListOfBusinessDtos() throws Exception {
        BusinessDto businessDto1 = new BusinessDto();
        businessDto1.setId(1);
        businessDto1.setName("Business 1");

        BusinessDto businessDto2 = new BusinessDto();
        businessDto2.setId(2);
        businessDto2.setName("Business 2");

        List<BusinessDto> businessDtoList = Arrays.asList(businessDto1, businessDto2);

        when(businessService.getAllBusinesses()).thenReturn(businessDtoList);

        MockMvc mockMvc = MockMvcBuilders.standaloneSetup(businessController).build();

        mockMvc.perform(MockMvcRequestBuilders.get("/business"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].id").value(1))
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].name").value("Business 1"))
                .andExpect(MockMvcResultMatchers.jsonPath("$[1].id").value(2))
                .andExpect(MockMvcResultMatchers.jsonPath("$[1].name").value("Business 2"));
    }

    @Test
     void getBusinessById_ExistingBusinessId_ShouldReturnBusinessDto() throws Exception {
        BusinessDto businessDto = new BusinessDto();
        businessDto.setId(1);
        businessDto.setName("Business 1");

        when(businessService.getBusinessById(1)).thenReturn(businessDto);

        MockMvc mockMvc = MockMvcBuilders.standaloneSetup(businessController).build();

        mockMvc.perform(MockMvcRequestBuilders.get("/business/1"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.id").value(1))
                .andExpect(MockMvcResultMatchers.jsonPath("$.name").value("Business 1"));
    }

    @Test
    void getBusinessById_NonExistingBusinessId_ShouldReturnNotFound() throws Exception {
        when(businessService.getBusinessById(100)).thenReturn(null);

        MockMvc mockMvc = MockMvcBuilders.standaloneSetup(businessController).build();

        mockMvc.perform(MockMvcRequestBuilders.get("/business/100"))
                .andExpect(MockMvcResultMatchers.status().isNotFound());
    }

    @Test
     void createBusiness_ValidBusinessDto_ShouldReturnCreatedBusinessDto() throws Exception {
        BusinessDto businessDto = new BusinessDto();
        businessDto.setName("New Business");

        BusinessDto createdBusinessDto = new BusinessDto();
        createdBusinessDto.setId(1);
        createdBusinessDto.setName("New Business");

        when(businessService.createBusiness(any(BusinessDto.class))).thenReturn(createdBusinessDto);

        MockMvc mockMvc = MockMvcBuilders.standaloneSetup(businessController).build();

        mockMvc.perform(MockMvcRequestBuilders.post("/business")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{ \"name\": \"New Business\" }"))
                .andExpect(MockMvcResultMatchers.status().isCreated())
                .andExpect(MockMvcResultMatchers.jsonPath("$.id").value(1))
                .andExpect(MockMvcResultMatchers.jsonPath("$.name").value("New Business"));
    }

}
