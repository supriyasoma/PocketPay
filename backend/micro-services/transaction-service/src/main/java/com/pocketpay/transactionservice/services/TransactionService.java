package com.pocketpay.transactionservice.services;

import com.pocketpay.transactionservice.dto.TransactionDto;

import java.util.List;

public interface TransactionService {
    public TransactionDto saveTransaction(TransactionDto theTransaction);

    public List<TransactionDto> getTransactionBySenderId(int id);

    public TransactionDto getByTransactionId(int id);

    public TransactionDto updateTransaction(TransactionDto transactionDto);


}
