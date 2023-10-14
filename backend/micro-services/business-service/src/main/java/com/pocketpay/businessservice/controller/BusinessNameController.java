package com.pocketpay.businessservice.controller;

import com.pocketpay.businessservice.dto.BusinessNameDto;
import com.pocketpay.businessservice.service.BusinessNameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/businessnames")
public class BusinessNameController {

    private final BusinessNameService businessNameService;

    @Autowired
    public BusinessNameController(BusinessNameService businessNameService) {
        this.businessNameService = businessNameService;
    }

    @GetMapping
    public ResponseEntity<List<BusinessNameDto>> getAllBusinessNames() {
        List<BusinessNameDto> businessNames = businessNameService.getAllBusinessNames();
        return new ResponseEntity<>(businessNames, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<BusinessNameDto> getBusinessNameById(@PathVariable int id) {
        BusinessNameDto businessName = businessNameService.getBusinessNameById(id);
        if (businessName != null) {
            return new ResponseEntity<>(businessName, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
