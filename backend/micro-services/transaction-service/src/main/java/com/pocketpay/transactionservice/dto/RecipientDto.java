package com.pocketpay.transactionservice.dto;

import com.pocketpay.transactionservice.entity.Recipient;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RecipientDto {
    private int id;
    private String email;
    private String firstName;
    private String lastName;
    private String accountNumber;
    private String ifsc;
    private String accountType;

    @Autowired
    private static ModelMapper modelMapper;
    static {
        modelMapper=new ModelMapper();
    }
    public static Recipient convertDtoToEntity(RecipientDto recipientDto){
        modelMapper.getConfiguration()
                .setMatchingStrategy(MatchingStrategies.LOOSE);
        return modelMapper.map(recipientDto, Recipient.class);
    }

    public static RecipientDto convertEntityToDto(Recipient recipient){
        modelMapper.getConfiguration()
                .setMatchingStrategy(MatchingStrategies.LOOSE);
        return modelMapper.map(recipient,RecipientDto.class);
    }

}
