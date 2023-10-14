package com.pocketpay.transactionservice.dto;

import com.pocketpay.transactionservice.entity.BankMaster;
import lombok.Getter;
import lombok.Setter;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class BankMasterDto {
    private int id;
    private String name;
    private String logoSrc;
    @Autowired
    private static ModelMapper modelMapper;
    static {
        modelMapper=new ModelMapper();
    }
    public static BankMaster convertDtoToEntity(BankMasterDto bankMasterDto){
        modelMapper.getConfiguration()
                .setMatchingStrategy(MatchingStrategies.LOOSE);
        return modelMapper.map(bankMasterDto, BankMaster.class);
    }

    public static BankMasterDto convertEntityToDto(BankMaster bankMaster){
        modelMapper.getConfiguration()
                .setMatchingStrategy(MatchingStrategies.LOOSE);
        return modelMapper.map(bankMaster,BankMasterDto.class);
    }
}
