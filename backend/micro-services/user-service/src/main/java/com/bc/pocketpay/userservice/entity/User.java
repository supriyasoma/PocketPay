package com.bc.pocketpay.userservice.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

/**
 * @author swaj
 */
@Getter
@Setter
@Entity
@Table(name = "user")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private int id;

    @Column(name = "email")
    private String email;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "password")
    private String password;

    @Column(name = "account",nullable = true)
    private String account;

    @Column(name = "profile",nullable = true)
    private String profile;

    @Column(name = "dob",nullable = true)
    private LocalDate dob;

    @Column(name = "home_address",nullable = true)
    private String homeAddress;

    @Column(name = "registration_type",nullable = true)
    private String registrationType;

    @Column(name = "account_type",nullable = true)
    private String accountType;

    @Column(name = "phone",nullable = true)
    private String phone;

    @Column(name = "verification_code",nullable = true)
    private String verificationCode;

    @Column(name = "valid_till_in_sec",nullable = true)
    private String validTillInSec;

    @Column(name = "business_id",nullable = true)
    private int businessId;

    @Column(name = "country_id",nullable = true)
    private int countryId;
}
