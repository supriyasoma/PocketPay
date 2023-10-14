package com.pocketpay.businessservice.controller;//package com.pocketpay.businessservice.controller;

import com.pocketpay.businessservice.dto.BusinessDto;
import com.pocketpay.businessservice.service.BusinessService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@RestController
@RequestMapping("/business")
public class BusinessController {
    @Autowired
    private BusinessService businessService;

    @GetMapping
    public ResponseEntity<List<BusinessDto>> getAllBusinesses() {
        List<BusinessDto> businesses = businessService.getAllBusinesses();
        return new ResponseEntity<>(businesses, HttpStatus.OK);
    }
    @GetMapping("/{id}")
    public ResponseEntity<BusinessDto> getBusinessById(@PathVariable int id) {
        BusinessDto businessDto = businessService.getBusinessById(id);
        if (businessDto != null) {
            return new ResponseEntity<>(businessDto, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @PostMapping
    public ResponseEntity<BusinessDto> createBusiness(@RequestBody BusinessDto businessDto) {
        BusinessDto createdBusiness = businessService.createBusiness(businessDto);
        return new ResponseEntity<>(createdBusiness, HttpStatus.CREATED);
    }

}
