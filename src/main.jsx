import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import Layout from "./components/Layout.jsx";
import { StateContext } from "./context/StateContext.jsx";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <StateContext>
        <Layout>
          <Toaster />
          <App />
        </Layout>
      </StateContext>
    </BrowserRouter>
  </React.StrictMode>
);
