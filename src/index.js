import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { StyledEngineProvider } from "@material-ui/core/styles";

import App from "./App";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

ReactDOM.render(
  <BrowserRouter>
    <StyledEngineProvider injectFirst>
      <App />
    </StyledEngineProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
