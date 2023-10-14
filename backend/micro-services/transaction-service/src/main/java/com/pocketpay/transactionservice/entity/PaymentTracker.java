package com.pocketpay.transactionservice.entity;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Column;
import jakarta.persistence.OneToOne;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.CascadeType;

import java.time.LocalDateTime;

@Entity
@Table(name = "payment_tracker")
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class PaymentTracker {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private int id;

    @Column(name = "track_time")
    private LocalDateTime trackTime;

    @Column(name = "track_info")
    private String trackInfo;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "transaction_id",referencedColumnName = "id")
    private Transaction transaction;
}
