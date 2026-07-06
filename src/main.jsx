import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
// Import the Tailwind entry BEFORE App so its `@layer theme, base, components, utilities`
// order is registered first. Otherwise the components' own `@layer components` blocks
// inject earlier (App is imported first) and land ahead of `base`, letting Preflight
// override every component style — the page then renders as if no CSS loaded.
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
