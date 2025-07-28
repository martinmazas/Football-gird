import { createRoot } from "react-dom/client";
import "./Styles/index.css";
import App from "./App";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./Components/HomePage";

// Ensure the root element exists and is not null
const rootElement = document.getElementById("root");

if (rootElement) {
  createRoot(rootElement).render(
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/app" element={<App />} />
      </Routes>
    </Router>
  );
} else {
  throw new Error("Root element not found");
}
