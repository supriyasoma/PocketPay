package com.pocketpay.transactionservice.controller;

import com.pocketpay.transactionservice.dto.BusinessOwnerDto;
import com.pocketpay.transactionservice.services.BusinessOwnerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/business-owner")
public class BusinessOwnerController {

    @Autowired
    private BusinessOwnerService businessOwnerService;

    @PostMapping("")
    public BusinessOwnerDto saveBusinessOwner(@RequestBody BusinessOwnerDto theBusinessOwner){
       return businessOwnerService.saveBusinessOwner(theBusinessOwner);
    }
}
