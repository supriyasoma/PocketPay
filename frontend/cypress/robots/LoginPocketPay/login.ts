/// <reference types="Cypress" />
import { testData } from "../../fixtures/commomTestData";
import { BaseDependencies, BaseEyes, BaseHands } from "../BaseRobot";

export class FillLogInDependencies extends BaseDependencies {
  visitLoginPage() {
    cy.visit("https://bc94frontend.zemoso.tk/login");
  }
}
export class FillLogInFormRobotEyes extends BaseEyes {
  contains: any;
  get: any;

  seesElementWithText(text: string) {
    return this.seesDomVisible(text);
  }
}

export class FillLogInFormRobotHands extends BaseHands {
  logInEmail() {
    cy.get('[placeholder="Enter your email address"]').type(testData.email);
    cy.get('[placeholder="Enter your password"').type(testData.password)
    cy.wait(4000);
    this.clickOnDomElement("button");
  }
}
