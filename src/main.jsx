import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import AuthProvider from "./context/AuthProvider.jsx";
import { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ToolsProvider from "./context/ToolsProvider.jsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <ToolsProvider>
        <SkeletonTheme>
          <App />
        </SkeletonTheme>
      </ToolsProvider>
    </AuthProvider>
  </QueryClientProvider>
  // </React.StrictMode>
);
