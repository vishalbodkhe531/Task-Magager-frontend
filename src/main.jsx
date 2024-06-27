import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ChakraBaseProvider, ColorModeScript, theme } from "@chakra-ui/react";
import { Provider } from "react-redux";
import { store } from "./app/store.js";

export const API = import.meta.env.VITE_API_KEY;

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ColorModeScript />
    <ChakraBaseProvider theme={theme}>
      <Provider store={store}>
        <App />
      </Provider>
    </ChakraBaseProvider>
  </React.StrictMode>
);
