import React from "react";
import ReactDom from "react-dom";
import "./index.css";

import App from "./components/App";
import { BrowserRouter } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ReactDom.render(
  <BrowserRouter>
    <App />
    <ToastContainer />
  </BrowserRouter>,
  document.getElementById("root")
);
