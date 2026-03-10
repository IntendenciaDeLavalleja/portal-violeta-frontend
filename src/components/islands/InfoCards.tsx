import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CheckCircle2, AlertTriangle, HeartHandshake } from "lucide-react";

export const InfoCards: React.FC = () => {
  return (
    <section id="info" className="py-16 px-4 container mx-auto max-w-4xl">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold mb-2">Información Importante</h2>
        <p className="text-base-content/60">Guías rápidas para identificar y actuar.</p>
      </div>

      <div className="card bg-base-200/50 backdrop-blur-sm border border-primary/10">
        <div className="card-body p-6">
          <Accordion type="single" collapsible className="w-full">

            <AccordionItem value="item-1">
              <AccordionTrigger className="text-lg font-semibold hover:text-primary text-left">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="h-5 w-5 text-orange-500" />
                  Señales de violencia
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-base-content/60 space-y-2 pt-2">
                <p>La violencia no es solo física. Prestá atención si:</p>
                <ul className="space-y-2 mt-2">
                  {[
                    "Te controla el celular, dinero o salidas.",
                    "Te humilla, insulta o desvaloriza en público o privado.",
                    "Te amenaza con hacerte daño a vos, tus hijos o mascotas.",
                    "Te empuja, golpea o retiene contra tu voluntad.",
                    "Te obliga a tener relaciones sexuales."
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-1 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger className="text-lg font-semibold hover:text-primary text-left">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  Qué hacer hoy (Plan de seguridad)
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-base-content/60 space-y-2 pt-2">
                <p>Si estás pensando en salir, prepará esto discretamente:</p>
                <ul className="space-y-2 mt-2">
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-primary">1.</span>
                    Documentos importantes (Cédula, partidas, tarjetas).
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-primary">2.</span>
                    Un bolso con ropa básica y llaves de repuesto.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-primary">3.</span>
                    Un teléfono celular con saldo o cargador.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-primary">4.</span>
                    Acordá una palabra clave con alguien de confianza para pedir ayuda.
                  </li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger className="text-lg font-semibold hover:text-primary text-left">
                <div className="flex items-center gap-3">
                  <HeartHandshake className="h-5 w-5 text-pink-500" />
                  Cómo ayudar a alguien
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-base-content/60 space-y-2 pt-2">
                <p>Lo más importante es escuchar sin juzgar.</p>
                <ul className="list-disc pl-5 space-y-1 mt-2">
                  <li>Creéle. No minimices su relato.</li>
                  <li>No la presiones a denunciar si no está lista.</li>
                  <li>Ofrecele acompañamiento a un servicio especializado.</li>
                  <li>Mantené la confidencialidad.</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

          </Accordion>
        </div>
      </div>
    </section>
  );
};
