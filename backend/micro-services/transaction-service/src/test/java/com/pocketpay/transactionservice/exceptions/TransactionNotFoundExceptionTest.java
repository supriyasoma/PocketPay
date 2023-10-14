package com.pocketpay.transactionservice.exceptions;



import org.junit.jupiter.api.Test;

import static org.junit.Assert.assertEquals;

 class TransactionNotFoundExceptionTest {
    @Test
    void testTransactionNotFoundExceptionMessage() {

        String expectedMessage = "Transaction not found.";

        TransactionNotFoundException exception = new TransactionNotFoundException(expectedMessage);
        String actualMessage = exception.getMessage();

        assertEquals(expectedMessage, actualMessage);
    }
}
