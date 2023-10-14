package com.bc.pocketpay.userservice;

import org.junit.jupiter.api.Test;
import org.modelmapper.ModelMapper;

import org.springframework.boot.test.context.SpringBootTest;
import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest
class UserServiceApplicationTests {
	public ModelMapper mapper(){
		return new ModelMapper();
	}

	@Test
	void contextLoads() {
		assertTrue(true);
	}
}
