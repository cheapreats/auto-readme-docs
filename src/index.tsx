import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { ConfigurationContextProvider } from "./contexts/configuration/ConfigurationContext";

ReactDOM.render(
  <ConfigurationContextProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ConfigurationContextProvider>,
  document.getElementById("root")
);
