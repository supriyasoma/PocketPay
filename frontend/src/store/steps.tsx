import { Step } from "./types";

export const SEND_MONEY_STEPS: Step[] = [
    {
      id: 1,
      label: "Amount",
      completed: false,
      active: true,
    },
    {
      id: 2,
      label: "You",
      completed: false,
      active: false,
    },
    {
      id: 3,
      label: "Recipient",
      completed: false,
      active: false,
    },
    {
      id: 4,
      label: "Verification",
      completed: false,
      active: false,
    },
    {
      id: 5,
      label: "Review",
      completed: false,
      active: false,
    },
    {
      id: 6,
      label: "Pay",
      completed: false,
      active: false,
    },
  ];

  export const ACCOUNT_STEPS: Step[] = [
    {
      id: 1,
      label: "Email",
      completed: false,
      active: true,
    },
    {
      id: 2,
      label: "Account type",
      completed: false,
      active: false,
    },
    {
      id: 3,
      label: "Country",
      completed: false,
      active: false,
    },
    {
      id: 4,
      label: "2-factor-authentication",
      completed: false,
      active: false,
    },
    {
      id: 5,
      label: "Password",
      completed: false,
      active: false,
    }
  ];

  export const BUSINESS_STEPS: Step[] = [
    {
      id: 1,
      label: "Your business",
      completed: false,
      active: true,
    },
    {
      id: 2,
      label: "Business Activity",
      completed: false,
      active: false,
    },
    {
      id: 3,
      label: "Your details",
      completed: false,
      active: false,
    }
]