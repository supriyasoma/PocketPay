export interface PaymentTracker{
    id?:number,
    trackTime?:string,
    trackInfo?:string,
    completed?:boolean,
    active?:boolean,
    transactionId?:number
}