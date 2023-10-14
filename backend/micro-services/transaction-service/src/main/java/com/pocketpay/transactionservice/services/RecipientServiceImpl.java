package com.pocketpay.transactionservice.services;

import com.pocketpay.transactionservice.dto.RecipientDto;
import com.pocketpay.transactionservice.entity.Recipient;
import com.pocketpay.transactionservice.exceptions.RecipientNotFoundException;
import com.pocketpay.transactionservice.repository.RecipientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.Optional;
@Component
@Service
public class RecipientServiceImpl implements RecipientService {

    @Autowired
    private RecipientRepository recipientRepository;


    @Override
    public RecipientDto saveRecipient(RecipientDto theRecipient) {
        Recipient savedEntity = recipientRepository.save(RecipientDto.convertDtoToEntity(theRecipient));
        return RecipientDto.convertEntityToDto((savedEntity));
    }

    @Override
    public RecipientDto findRecipientById(int id) {
        Optional<Recipient> recipient = recipientRepository.findById(id);
        if (recipient.isPresent()) {
            return RecipientDto.convertEntityToDto(recipient.get());
        } else {
            throw new RecipientNotFoundException("Recipient not found");
        }
    }

    @Override
    public RecipientDto updateRecipient(int id, RecipientDto recipientDto) {
        RecipientDto recipient = findRecipientById(id);
        if (recipient == null) {
            throw new RecipientNotFoundException("Recipient with ID:" + id + "not found");
        } else {
            if (recipientDto.getFirstName() != null) {
                recipient.setFirstName(recipientDto.getFirstName());
            }
            if (recipientDto.getLastName() != null) {
                recipient.setLastName(recipientDto.getLastName());
            }
            if (recipientDto.getEmail() != null) {
                recipient.setEmail(recipientDto.getEmail());
            }
            if (recipientDto.getAccountNumber() != null) {
                recipient.setAccountNumber(recipientDto.getAccountNumber());
            }
            if (recipientDto.getAccountType() != null) {
                recipient.setAccountType(recipientDto.getAccountType());
            }
            recipientRepository.save(RecipientDto.convertDtoToEntity(recipient));
        }
        return recipient;
    }
}
