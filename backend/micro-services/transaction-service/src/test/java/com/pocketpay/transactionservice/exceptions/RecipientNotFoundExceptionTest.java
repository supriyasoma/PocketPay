package com.pocketpay.transactionservice.exceptions;


import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

class RecipientNotFoundExceptionTest {

    @Test
    void testRecipientNotFoundException() {
        String errorMessage = "Recipient not found.";
        RecipientNotFoundException exception = new RecipientNotFoundException(errorMessage);
        Assertions.assertEquals(errorMessage, exception.getMessage());
    }
}
