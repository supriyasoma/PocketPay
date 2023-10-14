/// <reference types="Cypress" />
import { BaseEyes, BaseHands } from "../BaseRobot";

export class SendMoneyBankRobotEyes extends BaseEyes {
  contains: any;
  get: any;

  seesElementWithText(text: string) {
    return this.seesDomVisible(text);
  }
}

export class SendMoneyBankRobotHands extends BaseHands {
bankTransfer(){
    cy.get('.low-cost-section > [data-testid="paymentAddressCard"] > .MuiCardContent-root > .MuiGrid-container > .css-hlbvpm-MuiGrid-root > [data-testid="radioButton"] > .PrivateSwitchBase-input').click();
    cy.contains("Continue to pay").click();
    cy.contains('Lloyds').click();
    cy.contains("Continue to pay").click();
    cy.get('.cancel').click();
}
}
