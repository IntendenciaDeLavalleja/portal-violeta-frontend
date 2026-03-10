import React from "react";
import { ShieldAlert, Info, MapPin, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

const actions = [
  {
    icon: ShieldAlert,
    label: "Necesito ayuda ya",
    desc: "Emergencia o crisis",
    href: "#home",
    color: "text-error",
    bg: "bg-error/10",
    border: "border-error/20"
  },
  {
    icon: Info,
    label: "Quiero información",
    desc: "Guías y consejos",
    href: "#info",
    color: "text-primary",
    bg: "bg-primary/10",
    border: "border-primary/20"
  },
  {
    icon: MapPin,
    label: "Recursos locales",
    desc: "Lugares cerca de mí",
    href: "#resources",
    color: "text-accent",
    bg: "bg-accent/10",
    border: "border-accent/20"
  },
  {
    icon: MessageSquare,
    label: "Enviar mensaje",
    desc: "Escribinos seguro",
    href: "#contact",
    color: "text-info",
    bg: "bg-info/10",
    border: "border-info/20"
  }
];

export const QuickActions: React.FC = () => {
  const scrollTo = (id: string) => {
    const element = document.getElementById(id.substring(1));
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="quick-actions" className="py-10 px-4 container mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {actions.map((action, idx) => (
          <div
            key={idx}
            className={cn(
              "card cursor-pointer transition-all hover:scale-[1.02] hover:shadow-lg bg-base-200/50 backdrop-blur-sm border",
              action.border
            )}
            onClick={() => scrollTo(action.href)}
          >
            <div className="card-body p-6 flex-row items-center gap-4">
              <div className={cn("p-3 rounded-full", action.bg, action.color)}>
                <action.icon className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg leading-none mb-1">{action.label}</h3>
                <p className="text-sm text-base-content/60">{action.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
