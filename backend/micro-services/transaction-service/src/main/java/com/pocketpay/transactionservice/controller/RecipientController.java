package com.pocketpay.transactionservice.controller;

import com.pocketpay.transactionservice.dto.RecipientDto;
import com.pocketpay.transactionservice.services.RecipientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PatchMapping;


@RestController
@RequestMapping("/recipient")
public class RecipientController {

    @Autowired
    private RecipientService recipientService;

    @PostMapping("")
    public RecipientDto saveRecipient(@RequestBody RecipientDto theRecipient){
        return recipientService.saveRecipient(theRecipient);
    }
    @GetMapping("/{id}")
    public RecipientDto findById(@PathVariable int id) {
        return recipientService.findRecipientById(id);
    }

    @PatchMapping("/{id}")
    public RecipientDto updateRecipientData(@PathVariable("id") int id, @RequestBody RecipientDto theRecipient  )
    {
        return  recipientService.updateRecipient(id,theRecipient);
    }

}
