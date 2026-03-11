import React from "react";
import { CONFIG } from "../../config";
import { cn } from "@/lib/utils";
import { MessageCircle } from "lucide-react";

const variantMap: Record<string, string> = {
  default: "btn-primary",
  destructive: "btn-error",
  outline: "btn-outline",
  secondary: "btn-secondary",
  ghost: "btn-ghost",
  link: "btn-link",
};

const sizeMap: Record<string, string> = {
  default: "",
  sm: "btn-sm",
  lg: "btn-lg",
  icon: "btn-square btn-sm",
};

interface WhatsAppCTAProps {
  className?: string;
  label?: string;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  showIcon?: boolean;
}

export const WhatsAppCTA: React.FC<WhatsAppCTAProps> = ({
  className,
  label = "Hablar por WhatsApp",
  variant = "default",
  size = "lg",
  showIcon = true,
}) => {
  const encodedText = encodeURIComponent(CONFIG.WHATSAPP_DEFAULT_TEXT);
  const whatsappUrl = `https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=${encodedText}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Abrir WhatsApp para pedir ayuda"
      className={cn(
        "btn gap-2 font-bold shadow-lg transition-transform hover:scale-105",
        variantMap[variant] ?? "btn-primary",
        sizeMap[size] ?? "",
        className
      )}
    >
      {showIcon && <MessageCircle className="h-5 w-5" />}
      {label}
    </a>
  );
};
