package com.pocketpay.businessservice.dto;

import com.pocketpay.businessservice.entity.TradingAddress;

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
public class TradingAddressDto {
    private int id;
    private String address;
    private int businessId;

    @Autowired
    private static ModelMapper modelMapper;

    static{
        modelMapper=new ModelMapper();
    }
    public static TradingAddress convertDtoToEntity(TradingAddressDto tradingAddressDto){
        modelMapper.getConfiguration()
                .setMatchingStrategy(MatchingStrategies.LOOSE);
        return modelMapper.map(tradingAddressDto, TradingAddress.class);
    }

    public static TradingAddressDto convertEntityToDto(TradingAddress tradingAddress){
        modelMapper.getConfiguration()
                .setMatchingStrategy(MatchingStrategies.LOOSE);
        return modelMapper.map(tradingAddress,TradingAddressDto.class);
    }


}

