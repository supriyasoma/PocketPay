/// <reference types="Cypress" />
import { sendMoneyTestData } from "../../fixtures/commomTestData";
import { BaseEyes, BaseHands } from "../BaseRobot";

export class SendMoneyRobotEyes extends BaseEyes {
  contains: any;
  get: any;

  seesElementWithText(text: string) {
    return this.seesDomVisible(text);
  }
}

export class SendMoneyRobotHands extends BaseHands {
  Dashboard() {
    cy.get('[data-testid="Button"]').click();
    cy.wait(3000);
  }
  transferOption() {
    cy.contains("Send Money").click();
    cy.wait(1000);
  }
  amountPage() {
    cy.get('input[type="number"]').eq(0).type(sendMoneyTestData.amount);
  }
  clickContinueButton() {
    cy.contains("Continue").click();
  }
  recipientDetails() {
    cy.contains("Business or Charity").click();
    cy.wait(1000);

    cy.get('[placeholder="Email"]').type(sendMoneyTestData.recipientEmail);
    cy.get('[placeholder="Email"]').should(
      "have.value",
      sendMoneyTestData.recipientEmail
    );

    cy.get('[placeholder="Account number"]').type(
      sendMoneyTestData.accountNumber
    );
    cy.get('[placeholder="Account number"]').should(
      "have.value",
      sendMoneyTestData.accountNumber
    );

    cy.get('[placeholder="First name"]').type(
      sendMoneyTestData.recipientFirstName
    );
    cy.get('[placeholder="First name"]').should(
      "have.value",
      sendMoneyTestData.recipientFirstName
    );

    cy.get('[placeholder="Last name"]').type(
      sendMoneyTestData.recipientLastName
    );
    cy.get('[placeholder="Last name"]').should(
      "have.value",
      sendMoneyTestData.recipientLastName
    );

    cy.get('[placeholder="IFSC code"]').type(sendMoneyTestData.recipientIFSC);
    cy.get('[placeholder="IFSC code"]').should(
      "have.value",
      sendMoneyTestData.recipientIFSC
    );

    cy.get('[data-testid="select"]').click();
    cy.contains("Checking").click();
    cy.get('[data-testid="select"]').should("contain.text", "Checking");
  }
  verificationPage() {
    cy.get("#demo-simple-select").click();
    cy.get('[data-value="Paying for goods or services abroad"]').click();
    cy.contains("Continue").click();
    cy.get('[placeholder="First name"]').type(
      sendMoneyTestData.directorFirstName
    );
    cy.get('[placeholder="First name"]').should("have.value", sendMoneyTestData.directorFirstName);

    cy.get("[placeholder]").eq(1).type(sendMoneyTestData.directorLastName);
    cy.get("[placeholder]").eq(1).should("have.value", sendMoneyTestData.directorLastName);

    cy.get('input[type="date"]').type(sendMoneyTestData.directorDOB);
    cy.wait(4000);

    cy.get(".MuiSelect-select").click();
    cy.contains(sendMoneyTestData.directorCountry).click();
    cy.get(".MuiSelect-select").should("contain.text", sendMoneyTestData.directorCountry);

    cy.contains("Continue").click();

    cy.get('[placeholder="First name"]').type(
      sendMoneyTestData.shareholderFirstName
    );
    cy.get('[placeholder="First name"]').should("have.value", sendMoneyTestData.shareholderFirstName);

    cy.get("[placeholder]").eq(1).type(sendMoneyTestData.shareholderLastName);
    cy.get("[placeholder]").eq(1).should("have.value", sendMoneyTestData.shareholderLastName);

    cy.get('input[type="date"]').type(sendMoneyTestData.shareholderDOB);
    cy.wait(4000);

    cy.get(".MuiSelect-select").click();
    cy.contains(sendMoneyTestData.shareholderCountry).click();
    cy.get(".MuiSelect-select").should("contain.text", sendMoneyTestData.shareholderCountry);

    cy.contains("Continue").click();
  }
  clickConfirmAndContinueButton() {
    cy.contains("Confirm and continue").click();
  }
  debitCardPayment() {
    cy.get(
      '.fast-easy-section > :nth-child(2) > .MuiCardContent-root > .MuiGrid-container > .css-hlbvpm-MuiGrid-root > [data-testid="radioButton"] > .PrivateSwitchBase-input'
    ).click();
    cy.contains("Continue to pay").click();
    cy.contains("Continue to pay").click();
    cy.contains("Complete").click();
  }
  cancelTransfer() {
    cy.contains("Cancel the transfer").click();
    cy.contains("An existing account").click();
    cy.get(".MuiSelect-select > .MuiTypography-root").click();
    cy.get('.MuiList-root > [tabindex="0"]').click();
    cy.get('.css-0 > [data-testid="Button"]').click();
    cy.contains("refund");
  }
  logOut() {
    cy.get('[data-testid="popver-btn"]').click();
    cy.contains("Logout").click();
  }
}
