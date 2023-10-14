package com.pocketpay.businessservice.service;

import com.pocketpay.businessservice.dao.TradingAddressRepository;
import com.pocketpay.businessservice.dto.BusinessDto;
import com.pocketpay.businessservice.dto.TradingAddressDto;
import com.pocketpay.businessservice.entity.Business;
import com.pocketpay.businessservice.entity.TradingAddress;
import com.pocketpay.businessservice.exception.TradingAddressNotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;
import java.util.Optional;
 class TradingAddressServiceImplTest {

    @Mock
    private TradingAddressRepository tradingAddressRepository;

    @Mock
    private BusinessService businessService;

    @InjectMocks
    private TradingAddressServiceImpl tradingAddressService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
     void testFindById() {
        int tradingAddressId = 1;
        TradingAddress tradingAddress = new TradingAddress();
        tradingAddress.setId(tradingAddressId);
        tradingAddress.setAddress("Trading Address 1");

        when(tradingAddressRepository.findById(tradingAddressId)).thenReturn(Optional.of(tradingAddress));

        TradingAddressDto result = tradingAddressService.findById(tradingAddressId);

        assertNotNull(result);
        assertEquals(tradingAddressId, result.getId());
        assertEquals("Trading Address 1", result.getAddress());
    }

    @Test
     void testFindById_TradingAddressNotFound() {
        int tradingAddressId = 1;

        when(tradingAddressRepository.findById(tradingAddressId)).thenReturn(Optional.empty());

        assertThrows(TradingAddressNotFoundException.class, () -> tradingAddressService.findById(tradingAddressId));
    }

    @Test
     void testSave() {
        int businessId = 1;
        BusinessDto businessDto = new BusinessDto();
        businessDto.setId(businessId);

        TradingAddressDto tradingAddressDto = new TradingAddressDto();
        tradingAddressDto.setBusinessId(businessId);
        tradingAddressDto.setAddress("New Trading Address");

        Business business = BusinessDto.convertDtoToEntity(businessDto);
        TradingAddress tradingAddress = TradingAddressDto.convertDtoToEntity(tradingAddressDto);

        when(businessService.getBusinessById(businessId)).thenReturn(BusinessDto.convertEntityToDto(business));

        when(tradingAddressRepository.save(any(TradingAddress.class))).thenReturn(tradingAddress);

        TradingAddressDto result = tradingAddressService.save(tradingAddressDto);

        assertNotNull(result);
        assertEquals(businessId, result.getBusinessId());
        assertEquals("New Trading Address", result.getAddress());

    }

    @Test
    void testSave_TradingAddressNotFound() {
        int businessId = 1;
        TradingAddressDto tradingAddressDto = new TradingAddressDto();
        tradingAddressDto.setBusinessId(businessId);
        tradingAddressDto.setAddress("New Trading Address");

        when(businessService.getBusinessById(businessId)).thenReturn(null);

        assertThrows(TradingAddressNotFoundException.class, () -> tradingAddressService.save(tradingAddressDto));
    }

    @Test
     void testUpdate() {
        int tradingAddressId = 1;
        TradingAddressDto updatedTradingAddressDto = new TradingAddressDto();
        updatedTradingAddressDto.setId(tradingAddressId);
        updatedTradingAddressDto.setAddress("Updated Trading Address");

        TradingAddress existingTradingAddress = new TradingAddress();
        existingTradingAddress.setId(tradingAddressId);
        existingTradingAddress.setAddress("Old Trading Address");

        when(tradingAddressRepository.findById(tradingAddressId)).thenReturn(Optional.of(existingTradingAddress));

        when(tradingAddressRepository.save(any(TradingAddress.class))).thenAnswer(invocation -> invocation.getArgument(0));

        TradingAddressDto result = tradingAddressService.update(updatedTradingAddressDto);

        assertNotNull(result);
        assertEquals(tradingAddressId, result.getId());
        assertEquals("Updated Trading Address", result.getAddress());

    }

    @Test
   void testUpdate_TradingAddressNotFound() {
        int tradingAddressId = 1;
        TradingAddressDto updatedTradingAddressDto = new TradingAddressDto();
        updatedTradingAddressDto.setId(tradingAddressId);
        updatedTradingAddressDto.setAddress("Updated Trading Address");

        when(tradingAddressRepository.findById(tradingAddressId)).thenReturn(Optional.empty());

        assertThrows(TradingAddressNotFoundException.class, () -> tradingAddressService.update(updatedTradingAddressDto));
    }

}
