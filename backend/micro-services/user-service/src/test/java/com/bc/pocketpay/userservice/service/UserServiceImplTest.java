package com.bc.pocketpay.userservice.service;

import com.bc.pocketpay.userservice.dto.UserDetailsDTO;
import com.bc.pocketpay.userservice.entity.User;
import com.bc.pocketpay.userservice.exceptions.UserException;
import com.bc.pocketpay.userservice.repository.UserRepository;
import com.bc.pocketpay.userservice.service.impl.UserServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class UserServiceImplTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserServiceImpl userService;

    @BeforeEach
    void setUp() {
        // Any setup code, if required
    }

    @Test
    void testGetUserByEmail_ExistingUser() throws UserException {
        String email = "user@example.com";
        User user = new User();
        user.setId(1);
        user.setEmail(email);

        // Mocking the userRepository to return an Optional containing the user when findByEmail is called
        when(userRepository.findByEmail(email)).thenReturn(Optional.of(user));

        UserDetailsDTO userDetailsDTO = userService.getUserByEmail(email);

        // Verify that userRepository.findByEmail was called once with the provided email
        verify(userRepository, times(1)).findByEmail(email);

        // Check that the returned UserDetailsDTO has the correct email and user ID
        assertEquals(email, userDetailsDTO.getEmail());
        assertEquals(user.getId(), userDetailsDTO.getId());
    }

    @Test
    void testGetUserByEmail_NonExistingUser() {
        String email = "user@example.com";

        // Mocking the userRepository to return an empty Optional when findByEmail is called
        when(userRepository.findByEmail(email)).thenReturn(Optional.empty());

        // Call the service method and expect a UserException to be thrown
        assertThrows(UserException.class, () -> userService.getUserByEmail(email));

        // Verify that userRepository.findByEmail was called once with the provided email
        verify(userRepository, times(1)).findByEmail(email);
    }

    @Test
    void testRegisterUser_SuccessfulRegistration() throws UserException {
        User user = new User();
        user.setEmail("user@example.com");
        user.setPassword("password123");

        // Mocking the userRepository to return an empty Optional (user does not exist) when findByEmail is called
        when(userRepository.findByEmail(user.getEmail())).thenReturn(Optional.empty());

        // Mocking the userRepository to return the saved User when save is called
        when(userRepository.save(user)).thenReturn(user);

        User registeredUser = userService.registerUser(user);

        // Verify that userRepository.findByEmail was called once with the provided email
        verify(userRepository, times(1)).findByEmail(user.getEmail());

        // Verify that userRepository.save was called once with the provided user object
        verify(userRepository, times(1)).save(user);

        // Check that the returned User object is the same as the provided user
        assertEquals(user, registeredUser);
    }

    @Test
    void testRegisterUser_DuplicateEmail() {
        User user = new User();
        user.setEmail("user@example.com");
        user.setPassword("password123");

        // Mocking the userRepository to return an Optional containing a user with the same email when findByEmail is called
        when(userRepository.findByEmail(user.getEmail())).thenReturn(Optional.of(new User()));

        // Call the service method and expect a UserException to be thrown
        assertThrows(UserException.class, () -> userService.registerUser(user));

        // Verify that userRepository.findByEmail was called once with the provided email
        verify(userRepository, times(1)).findByEmail(user.getEmail());
    }
}
