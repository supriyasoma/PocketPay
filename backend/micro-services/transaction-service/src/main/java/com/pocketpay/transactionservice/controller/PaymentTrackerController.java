package com.pocketpay.transactionservice.controller;


import com.pocketpay.transactionservice.dto.PaymentTrackerDto;
import com.pocketpay.transactionservice.services.PaymentTrackerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping("/payment_tracker")
public class PaymentTrackerController {

    @Autowired
    private PaymentTrackerService paymentTrackerService;

    @GetMapping("/{id}")
    public PaymentTrackerDto findById(@PathVariable int id) {
        return paymentTrackerService.getPaymentTrackerById(id);
    }
    @PostMapping("")
    public PaymentTrackerDto savePaymentTracker(@RequestBody PaymentTrackerDto thePayment){
        return paymentTrackerService.savePaymentTracker(thePayment);
    }
}
