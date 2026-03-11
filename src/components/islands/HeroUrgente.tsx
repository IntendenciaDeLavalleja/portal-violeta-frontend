import React from "react";
import { Phone } from "lucide-react";
import { CONFIG } from "../../config";

export const HeroUrgente: React.FC = () => {
  return (
    <section id="home" className="min-h-[90vh] flex flex-col justify-center items-center text-center px-4 pt-32 pb-10 relative overflow-hidden">
      {/* Background Gradient Blob */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-primary/20 rounded-full blur-[100px] -z-10 pointer-events-none" />

      <div className="max-w-3xl space-y-8 animate-in fade-in zoom-in duration-700">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground leading-tight">
          No estás sola. <br />
          <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-accent">
            Ayuda ahora.
          </span>
        </h1>

        <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
          Espacio seguro de orientación y apoyo en situaciones de violencia.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full max-w-md mx-auto pt-4">
          <a
            href={`tel:${CONFIG.NATIONAL_HELP_LINE.replace(/\D/g, "")}`}
            className="btn btn-outline w-full sm:w-auto gap-2 text-lg py-6 border-primary/20 hover:bg-primary/10"
          >
            <Phone className="h-5 w-5" />
            Llamar al {CONFIG.NATIONAL_HELP_LINE}
          </a>
        </div>

        <div className="mt-12 p-6 rounded-2xl bg-destructive/10 border border-destructive/20 backdrop-blur-sm max-w-xl mx-auto">
          <h3 className="text-destructive font-bold text-lg mb-2 flex items-center justify-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-destructive"></span>
            </span>
            ¿Estás en peligro inmediato?
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Si tu vida o la de alguien más corre riesgo ahora mismo, no esperes.
          </p>
          <a
            href={`tel:${CONFIG.EMERGENCY_NUMBER}`}
            className="btn btn-error btn-lg w-full font-bold text-xl animate-pulse"
          >
            Llamar al {CONFIG.EMERGENCY_NUMBER}
          </a>
        </div>

        <p className="text-xs text-muted-foreground/50 mt-8">
          No guardamos datos de tu visita. Podés usar el botón de "Salida Rápida" en cualquier momento.
        </p>
      </div>
    </section>
  );
};
