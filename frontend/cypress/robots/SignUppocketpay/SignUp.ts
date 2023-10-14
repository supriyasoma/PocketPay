/// <reference types="Cypress" />
import { testData } from "../../fixtures/commomTestData";
import { BaseDependencies, BaseEyes, BaseHands } from "../BaseRobot";

export class FillSignUpDependencies extends BaseDependencies {
  visitSignUpPage() {
    cy.visit("https://bc94frontend.zemoso.tk/");
  }
}
export class FillSignUpFormRobotEyes extends BaseEyes {
  contains: any;
  get: any;

  seesElementWithText(text: string) {
    return this.seesDomVisible(text);
  }
}

export class FillSignUpFormRobotHands extends BaseHands {
  signUpEmail() {
    cy.get('[placeholder="Enter your email address"]').type(testData.email);
    cy.wait(4000);
    this.clickOnDomElement("button");
  }
  accountType() {
    cy.contains("Personal account").click();
    cy.wait(4000);
  }
  twoFactorAuthentication(countryName: string) {
    cy.wait(4000);
    cy.contains("Select your country");
    cy.wait(4000);
    cy.get(".MuiSelect-select").click();
    cy.contains(countryName).click();
    cy.get(".MuiSelect-select").should("contain.text", countryName);
  }
  verifyPhoneNumber() {
    cy.get(".form-control").type(testData.phoneNumber);
  }
  enterSixDigitCode() {
    cy.contains("Enter the 6-digit code")
    cy.get('[placeholder="Enter code here"]').type(testData.verificationCode);
    cy.contains("Submit").click();
  }
  clickContinueButton() {
    cy.contains("Continue").click();
  }
  createPassword(){
    cy.get('[placeholder="Enter your password"]').type(testData.password);
  }
  searchYourBusiness(businessName:string){
    cy.get('[data-testid="ArrowDropDownIcon"]').click()
    cy.contains(businessName).click();
    cy.get('[data-testid="Button"]').click();
  }
  confirmTradingAddress(){
    cy.get('.PrivateSwitchBase-input').click();
    cy.get('[data-testid="confirm"]').click();
  }
  categorySelection(categoryName:string,subCategoryName:string,busineessSize:string){
    cy.get('[data-testid="select"] > #demo-simple-select').click();
    cy.contains(categoryName).click();
    cy.get('[data-testid="select"] > #demo-simple-select').should("contain.text", categoryName);
    cy.wait(2000);
    cy.get('[data-testid="select2"] > #demo-simple-select').click();
    cy.contains(subCategoryName).click();
    cy.get('[data-testid="select2"] > #demo-simple-select').should("contain.text", subCategoryName);
    cy.wait(2000);
    cy.get('[data-testid="select3"] > #demo-simple-select').click();
    cy.contains(busineessSize).click();
    cy.get('[data-testid="select3"] > #demo-simple-select').should("contain.text", busineessSize);
  }
  enterUserDetails(firstName,lastName,dob,countryName,homeAddress){
    cy.wait(2000);
    cy.get('[placeholder="First name"]').type(firstName);
    cy.get('[placeholder="First name"]').should("have.value", firstName);
    cy.get('[placeholder="Last name"]').type(lastName);
    cy.get('[placeholder="Last name"]').should("have.value", lastName);
    cy.get('.date-of-birth input').type(dob);
    cy.wait(4000);
    cy.get('.MuiSelect-select').click();
    cy.contains(countryName).click();
    cy.get(".MuiSelect-select").should("contain.text", countryName);
    cy.get('[placeholder="Home address"]').type(homeAddress);
    cy.get('[placeholder="Home address"]').should("have.value", homeAddress);

  }
  
}
