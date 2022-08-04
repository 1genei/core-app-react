import "react-app-polyfill/stable";

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import App from "./App";

import "./mocks";

import { ThemeProvider } from "./contexts/ThemeContext";

import { Provider as ReduxProvider } from 'react-redux';
import store from './store';

ReactDOM.render(
  <ReduxProvider store={store}>
    <BrowserRouter>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </ReduxProvider>,
  document.getElementById("root")
);
