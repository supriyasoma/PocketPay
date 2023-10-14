import { Country } from "./country";

export interface BusinessOwner { 
    id?:number,
    firstName?:string,
    lastName?:string,
    dob?:string,
    role?:string,
    transactionId?:number,
    countryId?:number,
    country?:Country
}