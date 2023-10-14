import { Bank } from "./bank";
import { BusinessOwner } from "./business-owner";
import { PaymentTracker } from "./payment-tracker";
import { Recipient } from "./recipient";
import { User } from "./user";

export interface Transaction {
  id?: number;
  fromCurrency?: string;
  toCurrency?: string;
  amount?: number;
  convertedAmount?: number;
  recipient?: Recipient;
  sender?: User;
  paymentTracker?: PaymentTracker[];
  status?: string;
  bank?:Bank
  sendingTo?:string,
  purpose?:string,
  businessOwner?:BusinessOwner[],
  payWith?:string,
  transactionFee?:number,
  cardNumber?:string,
  transactionDate?:string,
  referenceId?:string
}