package com.bc.pocketpay.userservice.dto;

import org.junit.Test;

import java.time.LocalDate;

import static org.junit.Assert.assertEquals;

public class UserDTOTest {
    @Test
    public void testGettersAndSetters() {
        // Arrange
        int id = 1;
        String email = "test@example.com";
        String password = "password123";
        String firstName = "John";
        String lastName = "Doe";
        String profile = "profile_url";
        LocalDate dob = LocalDate.of(1990, 1, 1);
        String homeAddress = "123 Main St";
        String registrationType = "email";
        String accountType = "savings";
        String phone = "123-456-7890";
        String verificationCode = "123456";
        String validTillInSec = "86400"; // One day in seconds
        int businessId = 10;
        int countryId = 1;
        String account = "123456789";

        // Act
        UserDTO userDTO = new UserDTO();
        userDTO.setId(id);
        userDTO.setEmail(email);
        userDTO.setPassword(password);
        userDTO.setFirstName(firstName);
        userDTO.setLastName(lastName);
        userDTO.setProfile(profile);
        userDTO.setDob(dob);
        userDTO.setHomeAddress(homeAddress);
        userDTO.setRegistrationType(registrationType);
        userDTO.setAccountType(accountType);
        userDTO.setPhone(phone);
        userDTO.setVerificationCode(verificationCode);
        userDTO.setValidTillInSec(validTillInSec);
        userDTO.setBusinessId(businessId);
        userDTO.setCountryId(countryId);
        userDTO.setAccount(account);

        // Assert
        assertEquals(id, userDTO.getId());
        assertEquals(email, userDTO.getEmail());
        assertEquals(password, userDTO.getPassword());
        assertEquals(firstName, userDTO.getFirstName());
        assertEquals(lastName, userDTO.getLastName());
        assertEquals(profile, userDTO.getProfile());
        assertEquals(dob, userDTO.getDob());
        assertEquals(homeAddress, userDTO.getHomeAddress());
        assertEquals(registrationType, userDTO.getRegistrationType());
        assertEquals(accountType, userDTO.getAccountType());
        assertEquals(phone, userDTO.getPhone());
        assertEquals(verificationCode, userDTO.getVerificationCode());
        assertEquals(validTillInSec, userDTO.getValidTillInSec());
        assertEquals(businessId, userDTO.getBusinessId());
        assertEquals(countryId, userDTO.getCountryId());
        assertEquals(account, userDTO.getAccount());
    }
}
