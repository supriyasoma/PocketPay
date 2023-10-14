package com.pocketpay.businessservice.service;



import com.pocketpay.businessservice.dto.BusinessNameDto;

import java.util.List;

public interface BusinessNameService {
    List<BusinessNameDto> getAllBusinessNames();

    BusinessNameDto getBusinessNameById(int id);

}


