package com.pocketpay.businessservice.service;

import com.pocketpay.businessservice.dto.BusinessDto;
import java.util.List;
public interface BusinessService {

    List<BusinessDto> getAllBusinesses();

    BusinessDto getBusinessById(int id);

    BusinessDto createBusiness(BusinessDto businessDto);

}