package com.bc.pocketpay.userservice.service.impl;
import com.bc.pocketpay.userservice.dto.UserDetailsDTO;
import com.bc.pocketpay.userservice.entity.User;
import com.bc.pocketpay.userservice.exceptions.UserException;
import com.bc.pocketpay.userservice.repository.UserRepository;
import com.bc.pocketpay.userservice.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.modelmapper.ModelMapper;

import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {
    private ModelMapper modelMapper = new ModelMapper();

    @Autowired
    private UserRepository userRepository;


    @Override
    public UserDetailsDTO getUserByEmail(String email) throws UserException {
        Optional<User> userOptional = userRepository.findByEmail(email);
        if(userOptional.isPresent()){
            return modelMapper.map(userOptional.get(),UserDetailsDTO.class);
        }
        else{
            throw new UserException("User does not exists!");
        }
    }

    @Override
    public User registerUser(User user) throws UserException{
        try {
            Optional<User> userOptional = userRepository.findByEmail(user.getEmail());
            if (userOptional.isPresent()) {
                throw new UserException("Email is already taken!");
            }
            PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            return userRepository.save(user);
        }
        catch (UserException e){
            throw new UserException(e.getMessage());
        }
    }
}
