package com.pocketpay.transactionservice.controller;


import com.pocketpay.transactionservice.dto.TransactionDto;
import com.pocketpay.transactionservice.services.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestParam;
import java.util.List;

@RestController
@RequestMapping("/transaction")
public class TransactionController {
    @Autowired
    private TransactionService transactionService;

    @PostMapping("")
    public TransactionDto saveTransaction(@RequestBody TransactionDto theTransaction){
        return transactionService.saveTransaction(theTransaction);
    }

    @GetMapping("/{id}")
    public TransactionDto findById(@PathVariable int id) {
        return transactionService.getByTransactionId(id);
    }
    @GetMapping("")
    public List<TransactionDto> findBySenderId(@RequestParam int senderId) {
        return transactionService.getTransactionBySenderId(senderId);
    }

    @PatchMapping("")
    public TransactionDto updateTransactionData(@RequestBody TransactionDto transactionDto  )
    {
        return transactionService.updateTransaction(transactionDto);
    }
}
