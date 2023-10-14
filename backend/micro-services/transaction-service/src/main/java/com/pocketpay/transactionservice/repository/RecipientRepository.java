package com.pocketpay.transactionservice.repository;

import com.pocketpay.transactionservice.entity.Recipient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RecipientRepository extends JpaRepository<Recipient,Integer> {
}
