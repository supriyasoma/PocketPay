package com.pocketpay.transactionservice.services;

import com.pocketpay.transactionservice.dto.BankMasterDto;



public interface BankMasterService {
    BankMasterDto saveBankMaster(BankMasterDto theBankMaster);

     BankMasterDto findBankMasterById(int id);
}
