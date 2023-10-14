package com.pocketpay.businessservice.service;

import com.pocketpay.businessservice.dao.BusinessNameRepository;
import com.pocketpay.businessservice.dao.BusinessRepository;
import com.pocketpay.businessservice.dao.CategoryRepository;
import com.pocketpay.businessservice.dao.SubCategoryRepository;
import com.pocketpay.businessservice.dto.BusinessDto;
import com.pocketpay.businessservice.entity.Business;
import com.pocketpay.businessservice.entity.BusinessName;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
public class BusinessServiceImpl implements BusinessService {
    @Autowired
    private BusinessRepository businessRepository;
    @Autowired
    private BusinessNameRepository businessNameRepository;
    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private SubCategoryRepository subcategoryRepository;

    @Override
    public List<BusinessDto> getAllBusinesses() {
        List<Business> businesses = businessRepository.findAll();
        return businesses.stream()
                .map(BusinessDto::convertEntityToDto)
                .toList();
    }

    @Override
    public BusinessDto getBusinessById(int id) {
        Optional<Business> businessOptional = businessRepository.findById(id);
        return businessOptional.map(BusinessDto::convertEntityToDto).orElse(null);
    }

    @Override
    public BusinessDto createBusiness(BusinessDto businessDto) {
        String businessNameString = businessDto.getName();

        BusinessName existingBusinessName = businessNameRepository.findByName(businessNameString);

        BusinessName businessName;
        if (existingBusinessName == null) {
            businessName = new BusinessName();
            businessName.setName(businessNameString);
            businessName = businessNameRepository.save(businessName);
        } else {
            businessName = existingBusinessName;
        }

        Business business = new Business();
        business.setName(businessName);
        business.setRegistration(businessDto.getRegistration());
        business.setRegistrationAddress(businessDto.getRegistrationAddress());

        Business savedBusiness = businessRepository.save(business);

        BusinessDto savedBusinessDto = new BusinessDto();
        savedBusinessDto.setId(savedBusiness.getId());
        savedBusinessDto.setName(savedBusiness.getName().getName());
        savedBusinessDto.setRegistration(savedBusiness.getRegistration());
        savedBusinessDto.setRegistrationAddress(savedBusiness.getRegistrationAddress());
        return savedBusinessDto;
    }

}
