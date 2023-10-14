package com.bc.pocketpay.userservice.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserDetailsDTO {
    private int id;
    private String email;
    private String firstName;
    private String lastName;
    private String account;
    private String profile;
}
