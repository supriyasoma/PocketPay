import { Transaction } from "./transaction"

export interface PayeeDetails {
    transaction?:Transaction
    handleContinue?:()=>void,
    handleCancel?:()=>void
}