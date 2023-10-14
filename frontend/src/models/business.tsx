import { BusinessCategory } from "./business-category";
import { TradingAddress } from "./trading-address";

export interface Business{
    id?:number,
    name?:string,
    registrationNumber?:string,
    registrationAddress?:string,
    categoryId?:number,
    subCategoryId?:number,
    subCategory?:BusinessCategory,
    category?:BusinessCategory,
    size?:string,
    primaryTradingAddress?:TradingAddress,
    tradingAddress?:TradingAddress[],
    label?:string,
    registration?:string
}
