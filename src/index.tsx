import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";

const domNode = document.getElementById("root");
if (!domNode) {
  console.log(
    "FATAL: element with id root not found. Unable to start react app."
  );
} else {
  const root = createRoot(domNode);
  root.render(<App />);
}
