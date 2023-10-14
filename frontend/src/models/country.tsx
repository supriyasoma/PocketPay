export interface Country{
id?:number,
name?:string,
flagSrc?:string
}

export interface Currency{
    id?:number,
    countryId?:number,
    currencyCode?:string,
    country?:Country
}