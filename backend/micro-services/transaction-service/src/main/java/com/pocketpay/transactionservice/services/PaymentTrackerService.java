package com.pocketpay.transactionservice.services;

import com.pocketpay.transactionservice.dto.PaymentTrackerDto;

public interface PaymentTrackerService {
     PaymentTrackerDto getPaymentTrackerById(int id);

     PaymentTrackerDto savePaymentTracker(PaymentTrackerDto thePayment);
}
