import React from "react";
import theme from "./theme/theme";
import { ThemeProvider } from "@mui/material";
import { YourBusiness } from "./pages/YourBusiness";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { SignUpPage } from "./pages/SignUpPage";
import { LoginPage } from "./pages/LoginPage";
import { AmountPage } from "./pages/AmountPage";
import { BusinessActivityPage } from "./pages/BusinessActivity";
import { CreatePasswordPage } from "./pages/CreatePassword";
import { DebitCardPaymentPage } from "./pages/DebitCardPayment";
import { RecipientDetails } from "./pages/RecipientDetails";
import { SelectAccountTypePage } from "./pages/SelectAccountType";
import { SelectUserCountryPage } from "./pages/SelectUserCountry";
import { StepReviewPage } from "./pages/StepReviewPage";
import { VerificationPage } from "./pages/VerificationPage";
import { YourDetailsPage } from "./pages/YourDetails";
import { Dashboard } from "./pages/Dashboard";
import { BankDetailsForPaymentPage } from "./pages/BankDetailsForPayment";
import { ChooseYourBankPage } from "./pages/ChooseYourBank";
import { PayfromYourBankPage } from "./pages/PayfromYourBank";
import { TransferOptionsPage } from "./pages/TransferOptions";
import { TwoFactorPage } from "./pages/TwoFactorVerification";
import { Provider } from "react-redux";
import store from "./store";
function App() {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <BrowserRouter>
        <Routes>
          <Route path="/" element={(!sessionStorage.getItem("email") || sessionStorage.getItem("email")=="") ?<SignUpPage/>:<Navigate to="/dashboard"/>}/>
          <Route path="/login" element={(!sessionStorage.getItem("email") || sessionStorage.getItem("email")=="") ?<LoginPage/>:<Navigate to="/dashboard"/>}/>
          <Route path="/selectAccountType" element={<SelectAccountTypePage/>}/>
          <Route path="/selectUserCountry" element={<SelectUserCountryPage/>}/>
          <Route path="/twoFactorPage" element={<TwoFactorPage/>}/>
          <Route path="/createPassword" element={<CreatePasswordPage/>}/>

          <Route path="/yourBusiness" element={<YourBusiness/>}/>
          <Route path="/businessActivity" element={<BusinessActivityPage/>}/>
          <Route path="/yourDetails" element={<YourDetailsPage/>}/>
          
          <Route path="/dashboard" element={<Dashboard /> }/>
          <Route path="/transferOption" element={<TransferOptionsPage/>}/>
          <Route path="/amountPage" element={<AmountPage/>}/>
          <Route path="/recipientDetails" element={<RecipientDetails/>}/>
          <Route path="/verificationPage" element={<VerificationPage/>}/>
          <Route path="/stepReviewPage" element={<StepReviewPage/>}/>
          <Route path="/debitCardPayment" element={<DebitCardPaymentPage/>}/>

          <Route path="/ChooseBank" element={<ChooseYourBankPage/>}/>
          <Route path="/payWithYourBank" element={<PayfromYourBankPage/>}/>

          <Route path="/bankDetailsForPayment" element={<BankDetailsForPaymentPage/>}/>
        </Routes>
        </BrowserRouter>
        </Provider>
    </ThemeProvider>
  );
}
export default App;
