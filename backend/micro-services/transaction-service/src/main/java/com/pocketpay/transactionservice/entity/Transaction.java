package com.pocketpay.transactionservice.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;



@Entity
@Table(name = "transaction")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class Transaction {

    public enum PayWith{
        BANK_TRANSFER,
        CREDIT_CARD,
        DEBIT_CARD
    }

   public enum SendingTo{
        BUSINESS,
        BUSINESS_OR_CHARITY,
        OTHERS
    }

   public enum Status{
        PENDING,
        CANCELLED,
        SUCCESS
    }
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private int id;

    @Column(name = "from_currency")
    private String fromCurrency;

    @Column(name = "to_currency")
    private String toCurrency;

    @Column(name = "amount")
    private Double amount;

    @Column(name = "converted_amount")
    private Double convertedAmount;

    @Column(name = "purpose")
    private String purpose;

    @Column(name = "transaction_date")
    private LocalDateTime transactionDate;

    @Column(name = "pay_with")
    private PayWith payWith;

    @Column(name = "sending_to")
    private SendingTo sendingTo;

    @Column(name = "transaction_fee")
    private Double transactionFee;

    @Column(name = "card_number")
    private String cardNumber;

    @Column(name = "status")
    private Status status;

    @Column(name = "sender_id")
    private int senderId;
    @OneToOne(cascade  = CascadeType.ALL)
    @JoinColumn(name="recipient_id",referencedColumnName = "id")
    private Recipient recipient;
    @ManyToOne
    @JoinColumn(name = "bank_id",nullable = true)
    private BankMaster bankMaster;

}
