package com.bc.pocketpay.userservice.service;

import com.bc.pocketpay.userservice.dto.UserDetailsDTO;
import com.bc.pocketpay.userservice.entity.User;
import com.bc.pocketpay.userservice.exceptions.UserException;


public interface UserService {
    public UserDetailsDTO getUserByEmail(String email) throws UserException;
    public User registerUser(User signUpDto) throws UserException;
}
