package com.pocketpay.businessservice.exception;


public class BusinessNameNotFoundException extends RuntimeException{
    public BusinessNameNotFoundException(String message){
        super(message);
    }
}