import React, { useState } from "react";
import { QueryClientProvider, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import type { AxiosError } from "axios";
import toast from "react-hot-toast";
import { AlertTriangle, Loader2, Send } from "lucide-react";
import { WhatsAppCTA } from "./WhatsAppCTA";
import { apiClient } from "@/lib/api/client";
import { queryClient } from "@/lib/queryClient";
import type { ContactPayload, ContactResponse } from "@/lib/api/types";

const contactSchema = z.object({
  name: z.string().trim().max(200, "El alias no puede superar 200 caracteres").optional(),
  contactMethod: z
    .string()
    .trim()
    .min(3, "Indicá un método de contacto")
    .max(300, "El método de contacto no puede superar 300 caracteres"),
  safeTime: z
    .string()
    .trim()
    .max(200, "El horario seguro no puede superar 200 caracteres")
    .optional(),
  message: z
    .string()
    .trim()
    .min(10, "Contanos un poco más para poder ayudarte")
    .max(5000, "El mensaje es demasiado largo"),
  acknowledgedNoEmergency: z.boolean().refine((value) => value, {
    message: "Debes confirmar que esto no es una línea de emergencia",
  }),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const ContactFormInner: React.FC = () => {
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      contactMethod: "",
      safeTime: "",
      message: "",
      acknowledgedNoEmergency: false,
    },
  });

  const contactMutation = useMutation({
    mutationFn: async (payload: ContactPayload) => {
      const response = await apiClient.post<ContactResponse>("/contact", payload);
      return response.data;
    },
  });

  const onSubmit = async (values: ContactFormValues) => {
    const payload: ContactPayload = {
      name: values.name?.trim() || "",
      contactMethod: values.contactMethod.trim(),
      safeTime: values.safeTime?.trim() || "",
      message: values.message.trim(),
      acknowledgedNoEmergency: values.acknowledgedNoEmergency,
    };

    try {
      await contactMutation.mutateAsync(payload);
      setIsSuccess(true);
      reset();
      toast.success("Intentaremos contactarte en el horario indicado.");
    } catch (error) {
      const axiosError = error as AxiosError<{ message?: string }>;
      const backendMessage = axiosError.response?.data?.message;

      if (backendMessage) {
        setError("root", { message: backendMessage });
      }

      toast.error(
        backendMessage ?? "No se pudo enviar el mensaje. Por favor intentá por WhatsApp.",
      );
    }
  };

  if (isSuccess) {
    return (
      <section id="contact" className="py-16 px-4 container mx-auto max-w-md">
        <div className="card border border-green-500/50 bg-green-500/10">
          <div className="card-body text-center space-y-4">
            <div className="h-12 w-12 bg-green-500 rounded-full flex items-center justify-center mx-auto">
              <Send className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold">¡Mensaje Enviado!</h3>
            <p className="text-base-content/60">
              Gracias por escribirnos. Si es una emergencia, no esperes nuestra respuesta.
            </p>
            <div className="pt-4">
              <WhatsAppCTA label="Escribir por WhatsApp ahora" className="w-full" />
            </div>
            <button className="btn btn-ghost mt-2" onClick={() => setIsSuccess(false)}>
              Enviar otro mensaje
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-16 px-4 container mx-auto max-w-xl">
      <div className="card backdrop-blur-md bg-base-200/80">
        <div className="card-body">
          <h2 className="card-title text-2xl">Escribinos</h2>
          <p className="text-base-content/60 text-sm">Dejanos un mensaje seguro. No guardamos tu IP.</p>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-4">
            <div className="form-control">
              <label className="label" htmlFor="name">
                <span className="label-text">Nombre o Alias (Opcional)</span>
              </label>
              <input
                id="name"
                className="input input-bordered w-full bg-base-100"
                placeholder="Como quieras que te llamemos"
                {...register("name")}
              />
              {errors.name && <p className="text-sm text-error mt-1">{errors.name.message}</p>}
            </div>

            <div className="form-control">
              <label className="label" htmlFor="contact-method">
                <span className="label-text">¿Cómo te contactamos?</span>
              </label>
              <input
                id="contact-method"
                className="input input-bordered w-full bg-base-100"
                placeholder="WhatsApp, Email, Teléfono..."
                {...register("contactMethod")}
              />
              {errors.contactMethod && (
                <p className="text-sm text-error mt-1">{errors.contactMethod.message}</p>
              )}
            </div>

            <div className="form-control">
              <label className="label" htmlFor="safe-time">
                <span className="label-text">Horario seguro para responderte</span>
              </label>
              <input
                id="safe-time"
                className="input input-bordered w-full bg-base-100"
                placeholder="Ej: Lunes a Viernes de 9 a 12"
                {...register("safeTime")}
              />
              {errors.safeTime && (
                <p className="text-sm text-error mt-1">{errors.safeTime.message}</p>
              )}
            </div>

            <div className="form-control">
              <label className="label" htmlFor="message">
                <span className="label-text">Mensaje</span>
              </label>
              <textarea
                id="message"
                className="textarea textarea-bordered w-full bg-base-100 min-h-25"
                placeholder="Contános brevemente qué necesitás..."
                {...register("message")}
              />
              {errors.message && (
                <p className="text-sm text-error mt-1">{errors.message.message}</p>
              )}
            </div>

            <div className="rounded-lg border-2 border-warning/60 bg-warning/10 p-3">
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="emergency-check"
                  className="checkbox checkbox-warning mt-0.5 shrink-0"
                  {...register("acknowledgedNoEmergency")}
                />
                <label htmlFor="emergency-check" className="text-sm font-medium leading-snug cursor-pointer">
                  <span className="flex items-center gap-1 text-warning font-semibold mb-0.5">
                    <AlertTriangle className="h-4 w-4" />
                    Importante — debe marcar esta casilla para enviar
                  </span>
                  Entiendo que este formulario <strong>no es para emergencias inmediatas</strong>.{" "}
                  <span className="text-warning font-semibold">(Para Emergencias llamar al 911)</span>
                </label>
              </div>
            </div>
            {errors.acknowledgedNoEmergency && (
              <p className="text-sm text-error" role="alert">
                {errors.acknowledgedNoEmergency.message}
              </p>
            )}

            {errors.root?.message && (
              <p className="text-sm text-error" role="alert">
                {errors.root.message}
              </p>
            )}

            <button type="submit" className="btn btn-primary w-full text-lg py-6" disabled={isSubmitting || contactMutation.isPending}>
              {isSubmitting || contactMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Enviando...
                </>
              ) : (
                "Enviar Mensaje Seguro"
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export const ContactForm: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ContactFormInner />
    </QueryClientProvider>
  );
};
