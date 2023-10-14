import { TradingAddress } from "../models/trading-address"
import { Transaction } from "../models/transaction"
import { User } from "../models/user"

export interface Step{
    id:number,
    label?:string,
    completed?:boolean
    active?:boolean,
};


export interface Store{
    steps?:Step[],
    transaction?:Transaction,
    user?:User,
    accountSteps?:Step[],
    businessSteps?:Step[],
    tradingAddressList?:TradingAddress[]
}