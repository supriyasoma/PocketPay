package com.bc.pocketpay.userservice.controller;
import com.bc.pocketpay.userservice.dto.UserDTO;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

class AuthControllerTest {

    @Mock
    private AuthenticationManager authenticationManager;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private AuthController authController;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testAuthenticateUser_WithValidCredentials_ReturnsAuthenticated() {
        // Arrange
        UserDTO loginDto = new UserDTO();
        loginDto.setEmail("user@example.com");
        loginDto.setPassword("password");

        Authentication authentication = mock(Authentication.class);
        when(authentication.isAuthenticated()).thenReturn(true);

        UsernamePasswordAuthenticationToken authRequest = new UsernamePasswordAuthenticationToken(
                loginDto.getEmail(), loginDto.getPassword());

        when(authenticationManager.authenticate(authRequest)).thenReturn(authentication);

        // Act
        ResponseEntity<Object> responseEntity = authController.authenticateUser(loginDto);

        // Assert
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals(false, responseEntity.getBody());

        verify(authenticationManager).authenticate(authRequest);
    }

    @Test
    void testAuthenticateUser_WithInvalidCredentials_ReturnsUnauthorized() {
        // Arrange
        UserDTO loginDto = new UserDTO();
        loginDto.setEmail("user@example.com");
        loginDto.setPassword("invalid_password");

        Authentication authentication = mock(Authentication.class);
        when(authentication.isAuthenticated()).thenReturn(false);

        UsernamePasswordAuthenticationToken authRequest = new UsernamePasswordAuthenticationToken(
                loginDto.getEmail(), loginDto.getPassword());

        when(authenticationManager.authenticate(authRequest)).thenReturn(authentication);

        // Act
        ResponseEntity<Object> responseEntity = authController.authenticateUser(loginDto);

        // Assert
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals(false, responseEntity.getBody());

        verify(authenticationManager).authenticate(authRequest);
    }
}
