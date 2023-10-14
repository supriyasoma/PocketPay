package com.pocketpay.businessservice.service;

import com.pocketpay.businessservice.dao.BusinessNameRepository;
import com.pocketpay.businessservice.dao.BusinessRepository;
import com.pocketpay.businessservice.dao.CategoryRepository;
import com.pocketpay.businessservice.dao.SubCategoryRepository;
import com.pocketpay.businessservice.dto.BusinessDto;
import com.pocketpay.businessservice.entity.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

 class BusinessServiceImplTest {

    @Mock
    private BusinessRepository businessRepository;

    @Mock
    private BusinessNameRepository businessNameRepository;

    @Mock
    private CategoryRepository categoryRepository;

    @Mock
    private SubCategoryRepository subcategoryRepository;

    @InjectMocks
    private BusinessServiceImpl businessService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    void testGetAllBusinesses() {
        Business business1 = new Business();
        business1.setId(1);
        business1.setName(new BusinessName());
        business1.setRegistration("Reg1");
        business1.setRegistrationAddress("Address1");

        Business business2 = new Business();
        business2.setId(2);
        business2.setName(new BusinessName());
        business2.setRegistration("Reg2");
        business2.setRegistrationAddress("Address2");

        List<Business> businesses = List.of(business1, business2);

        when(businessRepository.findAll()).thenReturn(businesses);

        List<BusinessDto> result = businessService.getAllBusinesses();

        assertEquals(2, result.size());
    }

    @Test
     void testGetBusinessById() {
        int businessId = 1;
        Business business = new Business();
        business.setId(businessId);
        business.setName(new BusinessName());
        business.setRegistration("Reg1");
        business.setRegistrationAddress("Address1");

        when(businessRepository.findById(businessId)).thenReturn(Optional.of(business));

        BusinessDto result = businessService.getBusinessById(businessId);

        assertNotNull(result);
        assertEquals(businessId, result.getId());
    }

    @Test
     void testCreateBusiness() {
        BusinessDto businessDto = new BusinessDto();
        businessDto.setName("Business Name");
        businessDto.setRegistration("Reg1");
        businessDto.setRegistrationAddress("Address1");

        BusinessName existingBusinessName = new BusinessName();
        existingBusinessName.setName("Existing Business Name");

        when(businessNameRepository.findByName("Business Name")).thenReturn(null);
        when(businessNameRepository.save(any(BusinessName.class))).thenReturn(existingBusinessName);

        Business savedBusiness = new Business();
        savedBusiness.setId(1);
        savedBusiness.setName(existingBusinessName);
        savedBusiness.setRegistration("Reg1");
        savedBusiness.setRegistrationAddress("Address1");
        when(businessRepository.save(any(Business.class))).thenReturn(savedBusiness);

        BusinessDto result = businessService.createBusiness(businessDto);

        assertNotNull(result);
        assertEquals(1, result.getId());
        assertEquals("Existing Business Name", result.getName());
        assertEquals("Reg1", result.getRegistration());
        assertEquals("Address1", result.getRegistrationAddress());

    }

}
