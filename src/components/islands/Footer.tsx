import React from "react";
import { QuickExitButton } from "./QuickExitButton";
import { WhatsAppCTA } from "./WhatsAppCTA";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-secondary/30 border-t border-border/50 py-12 px-4 mt-10">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="text-center md:text-left space-y-2">
          <h4 className="font-bold text-lg">Punto Violeta Lavalleja</h4>
          <p className="text-sm text-muted-foreground max-w-xs">
            Un espacio de orientación y recursos para situaciones de violencia basada en género.
          </p>
          <div className="flex gap-4 text-xs text-muted-foreground mt-4 justify-center md:justify-start">
            <a href="#" className="hover:underline">Privacidad</a>
            <a href="#" className="hover:underline">Seguridad Digital</a>
            <a href="#" className="hover:underline">Accesibilidad</a>
          </div>
        </div>

        <div className="flex flex-col items-center gap-4">
          <WhatsAppCTA size="sm" variant="outline" />
          <QuickExitButton />
        </div>
      </div>
      
      <div className="text-center text-[10px] text-muted-foreground/30 mt-10">
        © {new Date().getFullYear()} Portal de Ayuda.
      </div>
    </footer>
  );
};
