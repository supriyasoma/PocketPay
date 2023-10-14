package com.pocketpay.businessservice.controller;

import com.pocketpay.businessservice.dto.TradingAddressDto;
import com.pocketpay.businessservice.service.TradingAddressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;

@RestController
@RequestMapping("/tradingaddress")
public class TradingAddressController {

    @Autowired
    private TradingAddressService tradingAddressService;

    @GetMapping("/{id}")
    public ResponseEntity<TradingAddressDto> getTradingAddressById(@PathVariable int id) {
        TradingAddressDto tradingAddressDTO = tradingAddressService.findById(id);
        return ResponseEntity.ok(tradingAddressDTO);
    }
    @PostMapping
    public ResponseEntity<TradingAddressDto> createTradingAddress(@RequestBody TradingAddressDto tradingAddressDto) {
        TradingAddressDto createdTradingAddress = tradingAddressService.save(tradingAddressDto);
        return ResponseEntity.ok(createdTradingAddress);
    }
    @PutMapping
    public ResponseEntity<TradingAddressDto> updateTradingAddress(@RequestBody TradingAddressDto updatedTradingAddressDto) {
        TradingAddressDto updatedTradingAddress = tradingAddressService.update(updatedTradingAddressDto);
        return new ResponseEntity<>(updatedTradingAddress, HttpStatus.OK);
    }

}
