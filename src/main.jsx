import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { MemoryRouter } from "react-router-dom";
import WebApp from "@twa-dev/sdk";
import App from "./App";
import "./index.css";

WebApp.ready();
WebApp.expand();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <MemoryRouter>
      <App />
    </MemoryRouter>
  </StrictMode>
);
