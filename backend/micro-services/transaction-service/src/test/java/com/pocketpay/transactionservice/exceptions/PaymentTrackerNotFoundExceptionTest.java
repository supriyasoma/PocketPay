package com.pocketpay.transactionservice.exceptions;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

 class PaymentTrackerNotFoundExceptionTest {

    @Test
    void testConstructorWithMessage() {
        String errorMessage = "Payment tracker not found!";
        PaymentTrackerNotFoundException exception = new PaymentTrackerNotFoundException(errorMessage);

        assertEquals(errorMessage, exception.getMessage());
    }


}
