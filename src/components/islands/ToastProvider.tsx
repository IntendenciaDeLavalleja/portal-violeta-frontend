import React from "react";
import { Toaster } from "react-hot-toast";

export const ToastProvider: React.FC = () => {
  return (
    <Toaster
      position="bottom-right"
      toastOptions={{
        style: {
          background: "hsl(265 40% 13%)",
          color: "hsl(210 40% 98%)",
          border: "1px solid hsl(265 30% 25%)",
          borderRadius: "0.75rem",
        },
        success: {
          iconTheme: { primary: "hsl(270 80% 60%)", secondary: "hsl(210 40% 98%)" },
        },
        error: {
          iconTheme: { primary: "hsl(0 62.8% 60%)", secondary: "hsl(210 40% 98%)" },
        },
      }}
    />
  );
};
