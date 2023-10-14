package com.pocketpay.businessservice.service;

import com.pocketpay.businessservice.dao.TradingAddressRepository;
import com.pocketpay.businessservice.dto.BusinessDto;
import com.pocketpay.businessservice.dto.TradingAddressDto;
import com.pocketpay.businessservice.entity.Business;
import com.pocketpay.businessservice.entity.TradingAddress;
import com.pocketpay.businessservice.exception.TradingAddressNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TradingAddressServiceImpl implements TradingAddressService {

    @Autowired
    private TradingAddressRepository tradingAddressRepository;
    @Autowired
    private BusinessService businessService;

    @Override
    public TradingAddressDto findById(int id) {
        TradingAddress tradingAddress = tradingAddressRepository.findById(id)
                .orElseThrow(() -> new TradingAddressNotFoundException("TradingAddress not found"));
        return TradingAddressDto.convertEntityToDto(tradingAddress);
    }
    @Override
    public TradingAddressDto save(TradingAddressDto tradingAddressDto) {
        TradingAddress tradingAddress = TradingAddressDto.convertDtoToEntity(tradingAddressDto);
        BusinessDto businessDto = businessService.getBusinessById(tradingAddressDto.getBusinessId());
        if (businessDto == null) {
            throw new TradingAddressNotFoundException("TradingAddress not found ");
        }
        Business business = BusinessDto.convertDtoToEntity(businessDto);
        tradingAddress.setBusiness(business);
        tradingAddress = tradingAddressRepository.save(tradingAddress);

        return TradingAddressDto.convertEntityToDto(tradingAddress);

    }
    @Override
    public TradingAddressDto update(TradingAddressDto updatedTradingAddressDto) {
        TradingAddress existingTradingAddress = tradingAddressRepository.findById(updatedTradingAddressDto.getId())
                .orElseThrow(() -> new TradingAddressNotFoundException("TradingAddress not found"));

        existingTradingAddress.setAddress(updatedTradingAddressDto.getAddress());
        existingTradingAddress = tradingAddressRepository.save(existingTradingAddress);

        return TradingAddressDto.convertEntityToDto(existingTradingAddress);
    }

}