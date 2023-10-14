package com.pocketpay.businessservice.dto;


import com.pocketpay.businessservice.entity.BusinessName;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BusinessNameDto {

    private int id;
    private String name;
    @Autowired
    public static ModelMapper modelMapper;

    static{
        modelMapper=new ModelMapper();
    }

    public static BusinessName convertDtoToEntity(BusinessNameDto businessNameDto){
        modelMapper.getConfiguration()
                .setMatchingStrategy(MatchingStrategies.LOOSE);
        return modelMapper.map(businessNameDto, BusinessName.class);
    }

    public static BusinessNameDto convertEntityToDto(BusinessName businessName){
        modelMapper.getConfiguration()
                .setMatchingStrategy(MatchingStrategies.LOOSE);
        return modelMapper.map(businessName,BusinessNameDto.class);
    }
}

