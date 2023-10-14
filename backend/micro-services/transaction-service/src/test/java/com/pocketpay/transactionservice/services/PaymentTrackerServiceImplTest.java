package com.pocketpay.transactionservice.services;

import com.pocketpay.transactionservice.dto.PaymentTrackerDto;
import com.pocketpay.transactionservice.entity.PaymentTracker;
import com.pocketpay.transactionservice.exceptions.PaymentTrackerNotFoundException;
import com.pocketpay.transactionservice.repository.PaymentTrackerRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.time.LocalDateTime;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class PaymentTrackerServiceImplTest {

    @Mock
    private PaymentTrackerRepository paymentTrackerRepository;

    @InjectMocks
    private PaymentTrackerServiceImpl paymentTrackerService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    void testGetPaymentTrackerByIdSuccess() {
        int paymentTrackerId = 1;
        LocalDateTime trackTime = LocalDateTime.now();

        PaymentTracker paymentTracker = new PaymentTracker();
        paymentTracker.setId(paymentTrackerId);
        paymentTracker.setTrackTime(trackTime);
        // Set other necessary properties

        when(paymentTrackerRepository.findById(paymentTrackerId)).thenReturn(Optional.of(paymentTracker));

        PaymentTrackerDto resultDto = paymentTrackerService.getPaymentTrackerById(paymentTrackerId);

        assertNotNull(resultDto);
        assertEquals(paymentTracker.getId(), resultDto.getId());
        assertEquals(trackTime, resultDto.getTrackTime());
        // Add more assertions based on your requirements
    }

    @Test
     void testGetPaymentTrackerByIdNotFound() {
        int paymentTrackerId = 1;

        when(paymentTrackerRepository.findById(paymentTrackerId)).thenReturn(Optional.empty());

        assertThrows(PaymentTrackerNotFoundException.class, () -> {
            paymentTrackerService.getPaymentTrackerById(paymentTrackerId);
        });
    }

    @Test
     void testSavePaymentTracker() {
        PaymentTrackerDto inputDto = new PaymentTrackerDto();
        inputDto.setTrackTime(LocalDateTime.now());
        // Set other necessary properties

        PaymentTracker savedPaymentTracker = new PaymentTracker();
        savedPaymentTracker.setId(1);
        savedPaymentTracker.setTrackTime(inputDto.getTrackTime());
        // Set other necessary properties

        when(paymentTrackerRepository.save(any(PaymentTracker.class))).thenReturn(savedPaymentTracker);

        PaymentTrackerDto resultDto = paymentTrackerService.savePaymentTracker(inputDto);

        assertNotNull(resultDto);
        assertEquals(savedPaymentTracker.getId(), resultDto.getId());
        assertEquals(inputDto.getTrackTime(), resultDto.getTrackTime());
        // Add more assertions based on your requirements
    }

}
