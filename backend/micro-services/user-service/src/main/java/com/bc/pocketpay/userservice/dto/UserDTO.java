package com.bc.pocketpay.userservice.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class UserDTO {
    private int id;
    private String email;
    private String password;
    private String firstName;
    private String lastName;
    private String profile;
    private LocalDate dob;
    private String homeAddress;
    private String registrationType;
    private String accountType;
    private String phone;
    private String verificationCode;
    private String validTillInSec;
    private int businessId;
    private int countryId;
    private String account;
}
