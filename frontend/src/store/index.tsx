import { Store } from "./types";
import { Step } from "./types";
import {
  SET_TRANSACTION,
  ActionTypes,
  SET_USER_DETAILS,
  UPDATE_STEP_ACCOUNT,
  UPDATE_STEP_BUSINESS,
  UPDATE_STEP_SEND_MONEY,
  ADD_TRADING_ADDRESS,
} from "./actions";
import { createStore } from "redux";
import { User } from "../models/user";
import { ACCOUNT_STEPS, BUSINESS_STEPS, SEND_MONEY_STEPS } from "./steps";
import { Transaction } from "../models/transaction";
import { TradingAddress } from "../models/trading-address";

export const TRANSACTION_DATA: Transaction = {};
export const USER_DETAILS: User = {};
export const TRADING_ADDRESS_LIST:TradingAddress[] = [];

export const activeStep = (steps: Step[], id: number) => {
  return steps.map((step: Step) => ({
    ...step,
    completed: step.id == id ? false : step.id < id ? true : false,
    active: step.id == id ? true : false,
  }));
};


export const setTransaction = (
  transaction: Transaction,
  data: Transaction
) => {
  return {...transaction,...data};
};

export const setUserDetails = (user: User, userDetails: User) => {
  return  { ...user, ...userDetails } ;
};

export const addTradingAddress = (tradingAddressList: TradingAddress[], data: TradingAddress) => {
  tradingAddressList.push(data);
  return tradingAddressList;
};

// Redux state management
function stepReducer(
  state: Store = {
    steps: SEND_MONEY_STEPS,
    transaction: TRANSACTION_DATA,
    user: USER_DETAILS,
    accountSteps: ACCOUNT_STEPS,
    businessSteps: BUSINESS_STEPS,
    tradingAddressList:TRADING_ADDRESS_LIST
  },
  action: ActionTypes
) {
  switch (action.type) {
    case UPDATE_STEP_SEND_MONEY:
      return {
        ...state,
        steps: activeStep(state.steps ? state.steps : [], action.payload.id),
      };
    case UPDATE_STEP_ACCOUNT:
      return {
        ...state,
        accountSteps: activeStep(state.accountSteps ? state.accountSteps : [],action.payload.id),
      };
    case UPDATE_STEP_BUSINESS:
      return {
        ...state,
        businessSteps: activeStep(
          state.businessSteps ? state.businessSteps : [],
          action.payload.id
        ),
      };

    case SET_TRANSACTION:
      return { 
        ...state,
        transaction:setTransaction(state.transaction ? state.transaction : {}, action.payload.transaction)
      };

    case SET_USER_DETAILS:
      return {
        ...state,
        user:setUserDetails(state.user ? state.user : {}, action.payload.user)
      };

    case ADD_TRADING_ADDRESS:
      return {
        ...state,
        tradingAddressList:addTradingAddress(state.tradingAddressList ? state.tradingAddressList : [], action.payload.address)
      }

    default:
      return state;
  }
}

const store = createStore(stepReducer);

export default store;
