package com.pocketpay.transactionservice.controller;

import com.pocketpay.transactionservice.dto.BankMasterDto;
import com.pocketpay.transactionservice.services.BankMasterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping("/bank-master")
public class BankMasterController {
    @Autowired
    private BankMasterService bankMasterService;

    @PostMapping("")
    public BankMasterDto saveBankMaster(@RequestBody BankMasterDto theBankMaster){
        return bankMasterService.saveBankMaster(theBankMaster);
    }

    @GetMapping("/{id}")
    public BankMasterDto findBankMasterById(@PathVariable int id){
        return bankMasterService.findBankMasterById(id);
    }
}
