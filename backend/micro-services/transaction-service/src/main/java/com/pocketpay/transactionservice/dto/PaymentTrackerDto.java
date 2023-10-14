package com.pocketpay.transactionservice.dto;

import com.pocketpay.transactionservice.entity.PaymentTracker;
import com.pocketpay.transactionservice.entity.Transaction;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;

import java.time.LocalDateTime;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class PaymentTrackerDto {
    private int id;
    private LocalDateTime trackTime;
    private String trackInfo;
    private Transaction transaction;

    @Autowired
    private static ModelMapper modelMapper;

    static{
        modelMapper=new ModelMapper();
    }

    public static PaymentTracker convertDtoToEntity(PaymentTrackerDto paymentTrackerDto){
        modelMapper.getConfiguration()
                .setMatchingStrategy(MatchingStrategies.LOOSE);
        return modelMapper.map(paymentTrackerDto,PaymentTracker.class);
    }

    public static PaymentTrackerDto convertEntityToDto(PaymentTracker paymentTracker){
        modelMapper.getConfiguration()
                .setMatchingStrategy(MatchingStrategies.LOOSE);
        return modelMapper.map(paymentTracker,PaymentTrackerDto.class);
    }
}
