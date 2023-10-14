package com.pocketpay.businessservice.exception;

public class TradingAddressNotFoundException extends RuntimeException {
    public TradingAddressNotFoundException(String message) {
        super(message);
    }
}