package com.pocketpay.transactionservice.dto;

import com.pocketpay.transactionservice.entity.BusinessOwner;
import com.pocketpay.transactionservice.entity.Transaction;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Date;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class BusinessOwnerDto {
    private int id;
    private String firstName;
    private String lastName;
    private Date dob;
    private BusinessOwner.Role role;
    private Transaction transaction;

    @Autowired
    private static ModelMapper modelMapper;

    static{
        modelMapper=new ModelMapper();
    }

    public static BusinessOwner convertDtoToEntity(BusinessOwnerDto businessOwnerDto){
        modelMapper.getConfiguration()
                .setMatchingStrategy(MatchingStrategies.LOOSE);
       return modelMapper.map(businessOwnerDto,BusinessOwner.class);
    }

    public static BusinessOwnerDto convertEntityToDto(BusinessOwner businessOwner){
        modelMapper.getConfiguration()
                .setMatchingStrategy(MatchingStrategies.LOOSE);
        return modelMapper.map(businessOwner,BusinessOwnerDto.class);
    }
}
