package com.pocketpay.transactionservice.repository;

import com.pocketpay.transactionservice.entity.BankMaster;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface BankMasterRepository extends JpaRepository<BankMaster,Integer>{

}
