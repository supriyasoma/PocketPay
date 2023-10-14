import { Business } from "./business";
import { Country } from "./country";

export interface User{
    id?:number,
    account?:string,
    email?:string,
    password?:string,
    firstName?:string,
    lastName?:string,
    dob?:string,
    countryId?:number,
    country?:Country,
    phone?:string,
    accountType?:string,
    registrationType?:string,
    homeAddress?:string,
    business?:Business,
    profileImage?:string,
    businessId?:number
}