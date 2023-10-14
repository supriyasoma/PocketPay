package com.pocketpay.businessservice.dao;

import com.pocketpay.businessservice.entity.BusinessName;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BusinessNameRepository extends JpaRepository<BusinessName, Integer> {
    BusinessName findByName(String businessNameString);
}