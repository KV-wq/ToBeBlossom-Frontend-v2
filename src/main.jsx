import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { MemoryRouter } from "react-router-dom";
import App from "./App";
import Loader from "./components/Loader";
import WebApp from "@twa-dev/sdk";

function RootComponent() {
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  useEffect(() => {
    WebApp.ready();
    WebApp.expand();

    const timer = setTimeout(() => {
      setIsInitialLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isInitialLoading) {
    return <Loader />;
  }

  return <App />;
}

const root = createRoot(document.getElementById("root"));
root.render(
  <MemoryRouter>
    <RootComponent />
  </MemoryRouter>
);
