package com.pocketpay.transactionservice.exceptions;



import org.junit.jupiter.api.Test;

import static org.junit.Assert.assertEquals;

 class BankMasterNotFoundExceptionTest {

    @Test
     void testBankMasterNotFoundExceptionMessage() {
        String expectedMessage = "Bank master not found.";

        BankMasterNotFoundException exception = new BankMasterNotFoundException(expectedMessage);
        String actualMessage = exception.getMessage();

        assertEquals(expectedMessage, actualMessage);
    }
}
