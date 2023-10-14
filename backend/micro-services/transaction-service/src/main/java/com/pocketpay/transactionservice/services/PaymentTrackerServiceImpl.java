package com.pocketpay.transactionservice.services;

import com.pocketpay.transactionservice.dto.PaymentTrackerDto;
import com.pocketpay.transactionservice.entity.PaymentTracker;
import com.pocketpay.transactionservice.exceptions.PaymentTrackerNotFoundException;
import com.pocketpay.transactionservice.repository.PaymentTrackerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class PaymentTrackerServiceImpl implements PaymentTrackerService{

    @Autowired
    private PaymentTrackerRepository paymentTrackerRepository;

    @Override
    public PaymentTrackerDto getPaymentTrackerById(int id) {
        Optional<PaymentTracker> paymentTracker = paymentTrackerRepository.findById(id);
        if (paymentTracker.isPresent()) {
            return PaymentTrackerDto.convertEntityToDto(paymentTracker.get());
        } else {
            throw new PaymentTrackerNotFoundException("paymentTracker is not found");
        }
    }

    @Override
    public PaymentTrackerDto savePaymentTracker(PaymentTrackerDto thePayment) {
        PaymentTracker saveEntity=paymentTrackerRepository.save(PaymentTrackerDto.convertDtoToEntity(thePayment));
        return PaymentTrackerDto.convertEntityToDto(saveEntity);
    }
}
