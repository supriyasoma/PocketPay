package com.pocketpay.businessservice.exception;

public class SubCategoryNotFoundException extends RuntimeException {
    public SubCategoryNotFoundException(String message) {
        super(message);
    }
}