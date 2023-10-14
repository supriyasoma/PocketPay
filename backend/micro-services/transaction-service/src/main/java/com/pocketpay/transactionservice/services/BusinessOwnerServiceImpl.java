package com.pocketpay.transactionservice.services;

import com.pocketpay.transactionservice.dto.BusinessOwnerDto;
import com.pocketpay.transactionservice.entity.BusinessOwner;
import com.pocketpay.transactionservice.repository.BusinessOwnerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BusinessOwnerServiceImpl implements BusinessOwnerService{

    @Autowired
    private BusinessOwnerRepository businessOwnerRepository;

    @Override
    public BusinessOwnerDto saveBusinessOwner(BusinessOwnerDto theBusinessOwner) {
        BusinessOwner saveEntity=businessOwnerRepository.save(BusinessOwnerDto.convertDtoToEntity(theBusinessOwner));
        return BusinessOwnerDto.convertEntityToDto(saveEntity);
    }
}
