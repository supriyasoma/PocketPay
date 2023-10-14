package com.pocketpay.transactionservice.services;

import com.pocketpay.transactionservice.dto.TransactionDto;

import com.pocketpay.transactionservice.entity.Transaction;

import com.pocketpay.transactionservice.exceptions.TransactionNotFoundException;
import com.pocketpay.transactionservice.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Component
@Service
public class TransactionServiceImpl implements TransactionService{
    @Autowired
    private TransactionRepository transactionRepository;

    @Override
    public TransactionDto saveTransaction(TransactionDto theTransaction) {
        Transaction savedEntity=transactionRepository.save(TransactionDto.convertDtoToEntity(theTransaction));
        return TransactionDto.convertEntityToDto(savedEntity);
    }

    @Override
    public List<TransactionDto> getTransactionBySenderId(int id) {
        List<Transaction> entity=transactionRepository.findAllBySenderId(id);
        return entity.stream()
                .map(TransactionDto::convertEntityToDto)
                .toList();
    }

    @Override
    public TransactionDto getByTransactionId(int id) {
        Optional<Transaction> transaction = transactionRepository.findById(id);
        if (transaction.isPresent()) {
            return TransactionDto.convertEntityToDto(transaction.get());
        } else {
            throw new TransactionNotFoundException("Recipient not found");
        }
    }

    @Override
    public TransactionDto updateTransaction(TransactionDto transactionDto) {
        Optional<Transaction> transactionOptional = transactionRepository.findById(transactionDto.getId());
         if(transactionOptional.isPresent()) {
             Transaction transaction = transactionOptional.get();
            if (transactionDto.getAmount()!= null) {
                transaction.setAmount(transactionDto.getAmount());
            }
            if (transactionDto.getStatus()!= null) {
                transaction.setStatus(transactionDto.getStatus());
            }
            if(transactionDto.getRecipient() !=null){
                transaction.setRecipient(transactionDto.getRecipient());
            }
            return TransactionDto.convertEntityToDto(transactionRepository.save(transaction));
        }
         else {
             throw new TransactionNotFoundException("Transaction with ID:" + transactionDto.getId() + "not found");
         }
    }

}
