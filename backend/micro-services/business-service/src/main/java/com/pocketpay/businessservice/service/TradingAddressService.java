package com.pocketpay.businessservice.service;

import com.pocketpay.businessservice.dto.TradingAddressDto;

public interface TradingAddressService {
    TradingAddressDto save(TradingAddressDto tradingAddressDto);
    TradingAddressDto findById(int id);
    TradingAddressDto update(TradingAddressDto updatedTradingAddressDto);

}
