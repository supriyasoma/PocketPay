package com.pocketpay.transactionservice.repository;

import com.pocketpay.transactionservice.entity.BusinessOwner;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BusinessOwnerRepository extends JpaRepository<BusinessOwner,Integer> {
}
