import { TradingAddress } from "../models/trading-address";
import {Transaction } from "../models/transaction";
import { User } from "../models/user";

export const UPDATE_STEP_SEND_MONEY="UPDATE_STEP_SEND_MONEY";
export const UPDATE_STEP_ACCOUNT="UPDATE_STEP_ACCOUNT";
export const UPDATE_STEP_BUSINESS="UPDATE_STEP_BUSINESS";
export const SET_TRANSACTION = "SET_TRANSACTION";
export const SET_USER_DETAILS = "SET_USER_DETAILS";
export const ADD_TRADING_ADDRESS = "ADD_TRADING_ADDRESS";

export type ActionTypes = 
|{ type: typeof UPDATE_STEP_SEND_MONEY;payload: { id: number;}}
|{ type: typeof UPDATE_STEP_ACCOUNT;payload: { id: number;}}
|{ type: typeof UPDATE_STEP_BUSINESS;payload: { id: number;}}
|{type:typeof SET_TRANSACTION;payload: {transaction:Transaction }}
|{type:typeof SET_USER_DETAILS;payload: {user:User }}
|{type:typeof ADD_TRADING_ADDRESS;payload: {address:TradingAddress }}



export const activeStep = (id:number):ActionTypes => ({
    type:UPDATE_STEP_SEND_MONEY,
    payload:{id}
});

export const activeStepAccount = (id:number):ActionTypes => ({
  type:UPDATE_STEP_ACCOUNT,
  payload:{id}
});

export const activeStepBusiness = (id:number):ActionTypes => ({
  type:UPDATE_STEP_BUSINESS,
  payload:{id}
});

export const setTransaction = (transaction:Transaction):ActionTypes => ({
  type:SET_TRANSACTION,
  payload:{transaction}
});

export const setUserDetails= (user:User):ActionTypes => ({
  type:SET_USER_DETAILS,
  payload:{user}
});

export const addTradingAddress= (address:TradingAddress):ActionTypes => ({
  type:ADD_TRADING_ADDRESS,
  payload:{address}
});

