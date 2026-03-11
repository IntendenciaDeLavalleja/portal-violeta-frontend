import React from "react";
import { CONFIG } from "../../config";
import { LogOut } from "lucide-react";

export const QuickExitButton: React.FC = () => {
  const handleExit = () => {
    if (typeof window !== "undefined") {
      localStorage.clear();
      sessionStorage.clear();
      window.location.href = CONFIG.QUICK_EXIT_URL;
    }
  };

  return (
    <button
      type="button"
      onClick={handleExit}
      className="btn btn-error btn-sm gap-2 font-semibold shadow-md z-50"
      aria-label="Salir rápido del sitio"
    >
      <LogOut className="h-4 w-4" />
      <span className="hidden sm:inline">Salida Rápida</span>
      <span className="sm:hidden">Salir</span>
    </button>
  );
};
