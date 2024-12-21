import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App";
import "./index.css";
import { AuthContextProvider } from "./context/auth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthContextProvider>
        <App />
        <ToastContainer position="top-left" autoClose={5000} />
      </AuthContextProvider>
    </Provider>
  </React.StrictMode>
);
