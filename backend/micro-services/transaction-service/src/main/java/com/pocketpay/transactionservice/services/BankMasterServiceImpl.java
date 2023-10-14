package com.pocketpay.transactionservice.services;

import com.pocketpay.transactionservice.dto.BankMasterDto;
import com.pocketpay.transactionservice.entity.BankMaster;
import com.pocketpay.transactionservice.exceptions.BankMasterNotFoundException;
import com.pocketpay.transactionservice.repository.BankMasterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Component
@Service
public class BankMasterServiceImpl implements BankMasterService{

    @Autowired
    private BankMasterRepository bankMasterRepository;

    @Override
    public BankMasterDto saveBankMaster(BankMasterDto theBankMaster) {
        BankMaster saveEntity=bankMasterRepository.save(BankMasterDto.convertDtoToEntity(theBankMaster));
        return BankMasterDto.convertEntityToDto((saveEntity));
    }

    @Override
    public BankMasterDto findBankMasterById(int id) {
        Optional<BankMaster> bankMaster=bankMasterRepository.findById(id);
        if(bankMaster.isPresent()){
            return BankMasterDto.convertEntityToDto(bankMaster.get());
        }
        else{
            throw new BankMasterNotFoundException("BankMaster not found");
        }
    }
}
