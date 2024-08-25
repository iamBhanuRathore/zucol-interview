// import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
// import { ThemeProvider } from "./provider/theme-provider.tsx";
import { BrowserRouter as Router } from "react-router-dom";
import { Toaster } from "./components/ui/sonner.tsx";
ReactDOM.createRoot(document.getElementById("root")!).render(
  //   <React.StrictMode>
  <Router>
    {/* <ThemeProvider defaultTheme="dark" storageKey="q2w-theme-ui"> */}
    <Toaster />

    <App />
    {/* </ThemeProvider> */}
  </Router>
  //   {/* </React.StrictMode> */}
);
