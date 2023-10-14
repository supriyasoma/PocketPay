package com.pocketpay.businessservice.service;

import com.pocketpay.businessservice.dto.BusinessNameDto;
import com.pocketpay.businessservice.entity.BusinessName;
import com.pocketpay.businessservice.dao.BusinessNameRepository;
import com.pocketpay.businessservice.exception.BusinessNameNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class BusinessNameServiceImpl implements BusinessNameService {
    @Autowired
    private BusinessNameRepository businessNameRepository;

    @Override
    public List<BusinessNameDto> getAllBusinessNames() {
        List<BusinessName> businessNames = businessNameRepository.findAll();
        return businessNames.stream()
                .map(BusinessNameDto::convertEntityToDto)
                .toList();
    }

    @Override
    public BusinessNameDto getBusinessNameById(int id) {
        BusinessName businessName = businessNameRepository.findById(id).orElse(null);
        if (businessName != null) {
            return BusinessNameDto.convertEntityToDto(businessName);
        } else {
            throw new BusinessNameNotFoundException("BusinessName not found");
        }
    }
}
