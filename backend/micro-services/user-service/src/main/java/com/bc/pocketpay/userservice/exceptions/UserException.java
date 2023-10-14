package com.bc.pocketpay.userservice.exceptions;

public class UserException extends Exception{
    public UserException(String errorMessage){
        super(errorMessage);
    }
}
