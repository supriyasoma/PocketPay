package com.pocketpay.transactionservice.exceptions;

public class RecipientNotFoundException extends RuntimeException{
    public RecipientNotFoundException(String message){
        super(message);
    }
}
