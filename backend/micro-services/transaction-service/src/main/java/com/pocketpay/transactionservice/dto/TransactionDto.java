package com.pocketpay.transactionservice.dto;

import com.pocketpay.transactionservice.entity.BankMaster;
import com.pocketpay.transactionservice.entity.Recipient;
import com.pocketpay.transactionservice.entity.Transaction;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TransactionDto {
    private int id;
    private String fromCurrency;
    private String toCurrency;
    private Double amount;
    private Double convertedAmount;
    private String purpose;
    private LocalDateTime transactionDate;
    private Transaction.PayWith payWith;
    private Transaction.SendingTo sendingTo;
    private Double transactionFee;
    private String cardNumber;
    private Transaction.Status status;
    private Recipient recipient;
    private BankMaster bankMaster;
    private int senderId;
    @Autowired
    private static ModelMapper modelMapper;

    static{
        modelMapper=new ModelMapper();
    }

    public static Transaction convertDtoToEntity(TransactionDto transactionDto){
        modelMapper.getConfiguration()
                .setMatchingStrategy(MatchingStrategies.LOOSE);
        return modelMapper.map(transactionDto,Transaction.class);
    }

    public static TransactionDto convertEntityToDto(Transaction transaction){
        modelMapper.getConfiguration()
                .setMatchingStrategy(MatchingStrategies.LOOSE);
        return modelMapper.map(transaction,TransactionDto.class);
    }
}
