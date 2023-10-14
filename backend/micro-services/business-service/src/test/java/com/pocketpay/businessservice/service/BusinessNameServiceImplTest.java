package com.pocketpay.businessservice.service;

import com.pocketpay.businessservice.dao.BusinessNameRepository;
import com.pocketpay.businessservice.dto.BusinessNameDto;
import com.pocketpay.businessservice.entity.BusinessName;
import com.pocketpay.businessservice.exception.BusinessNameNotFoundException;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.mockito.Mockito.*;

 class BusinessNameServiceImplTest {

    @Mock
    private BusinessNameRepository businessNameRepository;

    @InjectMocks
    private BusinessNameServiceImpl businessNameService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
   void testGetAllBusinessNames() {
        List<BusinessName> businessNameList = new ArrayList<>();
        businessNameList.add(new BusinessName(1, "BusinessName1"));
        businessNameList.add(new BusinessName(2, "BusinessName2"));

        when(businessNameRepository.findAll()).thenReturn(businessNameList);

        List<BusinessNameDto> result = businessNameService.getAllBusinessNames();

        Assertions.assertEquals(businessNameList.size(), result.size());
        verify(businessNameRepository, times(1)).findAll();
    }

    @Test
    void testGetBusinessNameById_ExistingId() {
        int existingId = 1;
        BusinessName businessName = new BusinessName(existingId, "BusinessName1");

        when(businessNameRepository.findById(existingId)).thenReturn(Optional.of(businessName));

        BusinessNameDto resultDto = businessNameService.getBusinessNameById(existingId);

        Assertions.assertEquals(businessName.getId(), resultDto.getId());
        Assertions.assertEquals(businessName.getName(), resultDto.getName());
        verify(businessNameRepository, times(1)).findById(existingId);
    }

    @Test
     void testGetBusinessNameById_NonExistingId() {
        int nonExistingId = 100;

        when(businessNameRepository.findById(nonExistingId)).thenReturn(Optional.empty());

        Assertions.assertThrows(BusinessNameNotFoundException.class,
                () -> businessNameService.getBusinessNameById(nonExistingId));
        verify(businessNameRepository, times(1)).findById(nonExistingId);
    }
}
