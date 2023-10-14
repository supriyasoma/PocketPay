package com.pocketpay.businessservice.exception;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class BusinessNotFoundExceptionTest {

    @Test
    void testBusinessNotFoundExceptionMessage() {
        // Arrange
        String expectedMessage = "Business not found.";

        // Act
        BusinessNotFoundException exception = new BusinessNotFoundException(expectedMessage);

        // Assert
        String actualMessage = exception.getMessage();
        assertEquals(expectedMessage, actualMessage);
    }

    @Test
    void testBusinessNotFoundExceptionWithNullMessage() {
        // Arrange
        String expectedMessage = null;

        // Act
        BusinessNotFoundException exception = new BusinessNotFoundException(expectedMessage);

        // Assert
        String actualMessage = exception.getMessage();
        assertEquals(expectedMessage, actualMessage);
    }
}
