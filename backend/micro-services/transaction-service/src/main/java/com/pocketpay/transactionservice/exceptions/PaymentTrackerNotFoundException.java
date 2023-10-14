package com.pocketpay.transactionservice.exceptions;

public class PaymentTrackerNotFoundException extends RuntimeException{
    public PaymentTrackerNotFoundException(String message){
        super(message);
    }
}
