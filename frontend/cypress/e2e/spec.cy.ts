import { FillLogInDependencies, FillLogInFormRobotEyes, FillLogInFormRobotHands } from "../robots/LoginPocketPay/login";
import { SendMoneyBankRobotEyes, SendMoneyBankRobotHands } from "../robots/SendingMoney/sendMoneybankTransfer";
import { SendMoneyRobotEyes, SendMoneyRobotHands } from "../robots/SendingMoney/sendMoneydebitCard";
import { FillSignUpDependencies, FillSignUpFormRobotEyes, FillSignUpFormRobotHands } from "../robots/SignUppocketpay/SignUp";

context('Checking the flow of the PocketPayApplication', () => {

  const  signUpEyes = new FillSignUpFormRobotEyes();
  const  signUpDependencies = new FillSignUpDependencies();
  const  signUpHands = new FillSignUpFormRobotHands();
  const  logInEyes = new FillLogInFormRobotEyes();
  const  logInHands =new FillLogInFormRobotHands();
  const  logInDependencies = new FillLogInDependencies();
  const  sendMoneyEyes=new SendMoneyRobotEyes();
  const  sendMoneyHands=new SendMoneyRobotHands();
  const sendMoneyBankEyes=new SendMoneyBankRobotEyes();
  const sendMoneyBankHands=new SendMoneyBankRobotHands();
  describe('Logging into the Application', () => {

    it("Signing Up into the application", () => {
      signUpDependencies.visitSignUpPage();
      signUpEyes.seesElementWithText("Create your PocketPay account");
      signUpHands.signUpEmail();
      signUpEyes.seesPathNameInUrl("/selectAccountType");
      signUpHands.accountType();
      signUpEyes.seesPathNameInUrl("/selectUserCountry");
      signUpEyes.seesElementWithText('Your country of registration');
      signUpHands.twoFactorAuthentication('India');
      signUpHands.clickContinueButton();
      signUpEyes.seesPathNameInUrl("/twoFactorPage");
      signUpEyes.seesElementWithText("Verify your phone number with a code");
      signUpHands.verifyPhoneNumber();
      signUpHands.clickContinueButton();
      signUpEyes.seesElementWithText("Enter the 6-digit code");
      signUpHands.enterSixDigitCode();
      signUpEyes.seesPathNameInUrl("/createPassword");
      signUpEyes.seesElementWithText("Create your password");
      signUpHands.createPassword();
      signUpHands.clickContinueButton();
      signUpEyes.seesPathNameInUrl("/yourBusiness");
      signUpEyes.seesElementWithText("Search for your business");
      signUpHands.searchYourBusiness('Zemoso technologies pvt ltd');
      signUpEyes.seesElementWithText("Confirm trading address");
      signUpHands.confirmTradingAddress();
      signUpEyes.seesPathNameInUrl("/businessActivity");
      signUpEyes.seesElementWithText("Help us verify account faster");
      signUpHands.categorySelection("Education or learning","Real estate sale, purchase and management","50-100");
      signUpHands.clickContinueButton();
      signUpEyes.seesPathNameInUrl("/yourDetails");
      signUpHands.enterUserDetails('Supriya','Soma','10022001','India','ABC Nagar');
      signUpHands.clickContinueButton();
      signUpEyes.seesPathNameInUrl("/dashboard");
    });
   
  });
 
  describe('Send money through debit card',()=>{
    it('Creating a transaction through debit card',()=>{
        logInDependencies.visitLoginPage();
        logInEyes.seesElementWithText("Welcome back")
        logInHands.logInEmail();
        sendMoneyEyes.seesElementWithText("Home");
        sendMoneyHands.Dashboard();
        sendMoneyHands.transferOption();
        sendMoneyHands.amountPage();
        sendMoneyHands.clickContinueButton();
        sendMoneyHands.recipientDetails();
        sendMoneyHands.clickContinueButton();
        sendMoneyHands.verificationPage();
        sendMoneyHands.clickConfirmAndContinueButton();
        sendMoneyHands.debitCardPayment();
        sendMoneyHands.cancelTransfer();
        sendMoneyHands.logOut();
     });
  });
  describe('Send money through bank card',()=>{
    it('Creating a transaction through bank transfer',()=>{
        logInDependencies.visitLoginPage();
        logInEyes.seesElementWithText("Welcome back")
        logInHands.logInEmail();
        sendMoneyEyes.seesElementWithText("Home");
        sendMoneyHands.Dashboard();
        sendMoneyHands.transferOption();
        sendMoneyHands.amountPage();
        sendMoneyHands.clickContinueButton();
        sendMoneyHands.recipientDetails();
        sendMoneyHands.clickContinueButton();
        sendMoneyHands.verificationPage();
        sendMoneyHands.clickConfirmAndContinueButton();
        sendMoneyBankHands.bankTransfer();
     });
  });
});
