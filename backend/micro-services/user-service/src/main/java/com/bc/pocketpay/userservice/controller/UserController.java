package com.bc.pocketpay.userservice.controller;

import com.bc.pocketpay.userservice.dto.UserDetailsDTO;
import com.bc.pocketpay.userservice.entity.User;
import com.bc.pocketpay.userservice.exceptions.UserException;
import com.bc.pocketpay.userservice.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping( path = "/user")
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping("")
    public ResponseEntity<Object> getUser(@RequestParam String email) throws UserException {
        UserDetailsDTO user = userService.getUserByEmail(email);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @PostMapping("/signup")
    public ResponseEntity<Object> registerUser(@RequestBody User signUpDto) throws UserException {
        User user = userService.registerUser(signUpDto);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }


}
