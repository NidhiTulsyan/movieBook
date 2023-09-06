import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import axios from "axios";
import { store } from "./store";
axios.defaults.baseURL="http://localhost:5000";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  
  <BrowserRouter>
  <Provider store={store}>
    <App />
    </Provider>
  </BrowserRouter>
);
