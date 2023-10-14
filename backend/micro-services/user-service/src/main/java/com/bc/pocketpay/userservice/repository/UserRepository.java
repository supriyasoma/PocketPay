package com.bc.pocketpay.userservice.repository;

import com.bc.pocketpay.userservice.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User,Integer> {
    public  Optional<User> findByEmail(String email);
}
