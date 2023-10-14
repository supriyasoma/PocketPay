package com.bc.pocketpay.userservice.helper;

import com.bc.pocketpay.userservice.dto.UserDTO;
import com.bc.pocketpay.userservice.entity.User;
import org.bouncycastle.math.raw.Mod;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
public class TestHelper {
    public static User getFakeUser(){
        User user = new User();
        user.setFirstName("Test");
        user.setLastName("User");
        user.setEmail("testuser@test.com");
        user.setPassword("password");
        user.setCountryId(1);
        user.setBusinessId(1);
        user.setAccount("12367");

        return user;
    }

    public static UserDTO getFakeUserDTO(){
        UserDTO user = new UserDTO();
        user.setFirstName("Test");
        user.setLastName("User");
        user.setEmail("testuser@test.com");
        user.setPassword("password");
        user.setCountryId(1);
        user.setBusinessId(1);
        user.setAccount("12367");

        return user;
    }
}
