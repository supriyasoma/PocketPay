package com.pocketpay.transactionservice.repository;

import com.pocketpay.transactionservice.entity.PaymentTracker;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PaymentTrackerRepository extends JpaRepository<PaymentTracker,Integer> {
}
