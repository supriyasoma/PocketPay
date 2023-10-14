package com.pocketpay.transactionservice.services;

import com.pocketpay.transactionservice.dto.RecipientDto;
public interface RecipientService {
    public RecipientDto saveRecipient(RecipientDto theRecipient);

    public RecipientDto findRecipientById(int id);

    public RecipientDto updateRecipient(int id,RecipientDto recipientDto);
}
