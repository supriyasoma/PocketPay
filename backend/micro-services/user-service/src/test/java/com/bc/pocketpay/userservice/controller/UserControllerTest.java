package com.bc.pocketpay.userservice.controller;

import com.bc.pocketpay.userservice.dto.UserDetailsDTO;
import com.bc.pocketpay.userservice.entity.User;
import com.bc.pocketpay.userservice.exceptions.UserException;
import com.bc.pocketpay.userservice.service.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class UserControllerTest {

    @Mock
    private UserService userService;

    @InjectMocks
    private UserController userController;

    @BeforeEach
    void setUp() {
        // Any setup code, if required
    }

    @Test
    void testGetUser() throws UserException {
        String email = "user@example.com";
        UserDetailsDTO userDetailsDTO = new UserDetailsDTO();
        userDetailsDTO.setEmail(email);
        // Mocking the userService to return the UserDetailsDTO when getUserByEmail is called
        when(userService.getUserByEmail(email)).thenReturn(userDetailsDTO);

        ResponseEntity<Object> responseEntity = userController.getUser(email);

        // Verify that userService.getUserByEmail was called once with the provided email
        verify(userService, times(1)).getUserByEmail(email);

        // Check that the response entity has the correct UserDetailsDTO and HttpStatus.OK
        assertEquals(userDetailsDTO, responseEntity.getBody());
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
    }

    @Test
    void testRegisterUser() throws UserException {
        User signUpDto = new User();
        signUpDto.setEmail("user@example.com");
        // Mocking the userService to return the same User object when registerUser is called
        when(userService.registerUser(signUpDto)).thenReturn(signUpDto);

        ResponseEntity<Object> responseEntity = userController.registerUser(signUpDto);

        // Verify that userService.registerUser was called once with the provided User object
        verify(userService, times(1)).registerUser(signUpDto);

        // Check that the response entity has the correct User object and HttpStatus.OK
        assertEquals(signUpDto, responseEntity.getBody());
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
    }
}
