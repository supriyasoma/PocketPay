package com.pocketpay.transactionservice.exceptions;

public class BankMasterNotFoundException extends RuntimeException{
    public BankMasterNotFoundException(String message){
        super(message);
    }
}
