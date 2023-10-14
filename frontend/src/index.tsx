import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import { Auth0Provider } from "@auth0/auth0-react";
import { Provider } from "react-redux";
import store from "./store";

ReactDOM.render(<Auth0Provider
    domain="dev-tf4uka6yiixhdvwl.us.auth0.com"
    clientId="7VOOZy9XgXkbED6BsDz5aT5MjrkVuOcl"
    authorizationParams={{
      redirect_uri: "https://bc94frontend.zemoso.tk/selectAccountType"
    }}
  >
     <Provider store={store}>
    <App />
    </Provider>
  </Auth0Provider>, document.getElementById("root"));
