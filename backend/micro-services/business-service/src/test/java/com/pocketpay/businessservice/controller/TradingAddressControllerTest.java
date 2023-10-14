package com.pocketpay.businessservice.controller;

import com.pocketpay.businessservice.dto.TradingAddressDto;
import com.pocketpay.businessservice.service.TradingAddressService;
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

import java.time.LocalDateTime;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
 class TradingAddressControllerTest {

    @Mock
    private TradingAddressService tradingAddressService;

    @InjectMocks
    private TradingAddressController tradingAddressController;

    @Test
   void getTradingAddressById_ShouldReturnTradingAddressDto() throws Exception {
        TradingAddressDto tradingAddressDto = new TradingAddressDto();
        tradingAddressDto.setId(1);
        tradingAddressDto.setAddress("123 Main St");

        when(tradingAddressService.findById(1)).thenReturn(tradingAddressDto);

        MockMvc mockMvc = MockMvcBuilders.standaloneSetup(tradingAddressController).build();

        mockMvc.perform(MockMvcRequestBuilders.get("/tradingaddress/1"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.id").value(1))
                .andExpect(MockMvcResultMatchers.jsonPath("$.address").value("123 Main St"));
    }

    @Test
     void createTradingAddress_ShouldReturnCreatedTradingAddressDto() throws Exception {
        TradingAddressDto tradingAddressDto = new TradingAddressDto();
        tradingAddressDto.setId(1);
        tradingAddressDto.setAddress("123 Main St");

        when(tradingAddressService.save(any(TradingAddressDto.class))).thenReturn(tradingAddressDto);

        MockMvc mockMvc = MockMvcBuilders.standaloneSetup(tradingAddressController).build();

        mockMvc.perform(MockMvcRequestBuilders.post("/tradingaddress")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{ \"id\": 1, \"address\": \"123 Main St\" }"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.id").value(1))
                .andExpect(MockMvcResultMatchers.jsonPath("$.address").value("123 Main St"));
    }

    @Test
    void updateTradingAddress_ShouldReturnUpdatedTradingAddressDto() throws Exception {
        TradingAddressDto updatedTradingAddressDto = new TradingAddressDto();
        updatedTradingAddressDto.setId(1);
        updatedTradingAddressDto.setAddress("456 Oak St");

        when(tradingAddressService.update(any(TradingAddressDto.class))).thenReturn(updatedTradingAddressDto);

        MockMvc mockMvc = MockMvcBuilders.standaloneSetup(tradingAddressController).build();

        mockMvc.perform(MockMvcRequestBuilders.put("/tradingaddress")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{ \"id\": 1, \"address\": \"456 Oak St\" }"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.id").value(1))
                .andExpect(MockMvcResultMatchers.jsonPath("$.address").value("456 Oak St"));
    }
}
