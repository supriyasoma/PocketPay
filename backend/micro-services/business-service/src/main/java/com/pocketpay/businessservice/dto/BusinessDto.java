package com.pocketpay.businessservice.dto;

import com.pocketpay.businessservice.entity.Business;
import com.pocketpay.businessservice.entity.SizeEnum;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

@Data
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class BusinessDto {

    private int id;
    private String name;
    private String registration;
    private String registrationAddress;
    private int subCategoryId;
    private int categoryId;
    private SizeEnum businessSize;
    private List<TradingAddressDto> tradingAddresses;

    @Autowired
    public static ModelMapper modelMapper;

    static{
        modelMapper=new ModelMapper();
    }

    public static Business convertDtoToEntity(BusinessDto businessDto){
        modelMapper.getConfiguration()
                .setMatchingStrategy(MatchingStrategies.LOOSE);
        return modelMapper.map(businessDto,Business.class);
    }

    public static BusinessDto convertEntityToDto(Business business){
        modelMapper.getConfiguration()
                .setMatchingStrategy(MatchingStrategies.LOOSE);
        return modelMapper.map(business,BusinessDto.class);
    }

}
