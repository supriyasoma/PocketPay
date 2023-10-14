package com.pocketpay.businessservice.dao;

import com.pocketpay.businessservice.entity.TradingAddress;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TradingAddressRepository extends JpaRepository<TradingAddress, Integer> {
    TradingAddress findByBusinessIdAndAddress(Integer businessId, String address);

}
