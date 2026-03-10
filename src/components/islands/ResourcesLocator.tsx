import React, { useEffect, useRef, useState } from "react";
import { QueryClientProvider, useQuery } from "@tanstack/react-query";
import { MapPin, Phone, MessageCircle, Loader2, Mail, Clock3, Map } from "lucide-react";
import type { AxiosError } from "axios";
import "leaflet/dist/leaflet.css";

import { apiClient } from "@/lib/api/client";
import type { Locality, ReferencePoint } from "@/lib/api/types";
import { queryClient } from "@/lib/queryClient";

const toFiniteNumber = (value: unknown): number | null => {
  const parsed = typeof value === "number" ? value : Number(value);
  return Number.isFinite(parsed) ? parsed : null;
};

const CATEGORY_LABELS: Record<string, string> = {
  policia: "Policía",
  salud: "Salud",
  mides: "MIDES",
  juridico: "Jurídico",
  refugio: "Refugio",
  apoyo: "Apoyo psicosocial",
  otro: "Otro",
};

export const ResourcesLocator: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ResourcesLocatorInner />
    </QueryClientProvider>
  );
};

const ReferencePointMiniMap: React.FC<{
  latitude: number;
  longitude: number;
  name: string;
}> = ({ latitude, longitude, name }) => {
  const mapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !mapRef.current) return;

    const parsedLatitude = toFiniteNumber(latitude);
    const parsedLongitude = toFiniteNumber(longitude);
    if (parsedLatitude === null || parsedLongitude === null) {
      return;
    }

    let isMounted = true;
    let mapInstance: import("leaflet").Map | null = null;

    const initMap = async () => {
      try {
        const Leaflet = await import("leaflet/dist/leaflet-src.esm.js");
        const L = Leaflet.default || Leaflet;
        
        if (!isMounted || !mapRef.current) return;

        // Leaflet icon fix
        if (L.Icon && L.Icon.Default) {
          delete (L.Icon.Default.prototype as any)._getIconUrl;
          L.Icon.Default.mergeOptions({
            iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
            iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
            shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
          });
        }

        mapInstance = L.map(mapRef.current, {
          zoomControl: false,
          attributionControl: false,
        }).setView([parsedLatitude, parsedLongitude], 15);

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          maxZoom: 19,
          attribution: '© OpenStreetMap contributors'
        }).addTo(mapInstance);

        L.marker([parsedLatitude, parsedLongitude]).addTo(mapInstance).bindPopup(name);

        // Force resize
        setTimeout(() => {
          if (isMounted && mapInstance) {
            mapInstance.invalidateSize();
          }
        }, 500);
      } catch (err) {
        console.error("Leaflet loading error:", err);
      }
    };

    initMap();

    return () => {
      isMounted = false;
      if (mapInstance) {
        mapInstance.remove();
      }
    };
  }, [latitude, longitude, name]);

  return (
    <div className="relative w-full h-44 mt-4 mb-2 rounded-xl border border-primary/20 overflow-hidden bg-base-300">
      <div 
        ref={mapRef} 
        className="w-full h-full z-0" 
        style={{ minHeight: "176px" }}
      />
    </div>
  );
};

const ResourcesLocatorInner: React.FC = () => {
  const [localities, setLocalities] = useState<Locality[]>([]);
  const [selectedId, setSelectedId] = useState<string>("");

  const localitiesQuery = useQuery({
    queryKey: ["localities"],
    queryFn: async () => {
      const response = await apiClient.get<Locality[]>("/localities");
      return response.data;
    },
  });

  useEffect(() => {
    if (localitiesQuery.data) {
      setLocalities(localitiesQuery.data);
    }
  }, [localitiesQuery.data]);

  const selected = localities.find((loc) => String(loc.id) === selectedId);

  const loading = localitiesQuery.isLoading;
  const error = (localitiesQuery.error as AxiosError<{ message?: string }> | null)?.response
    ?.data?.message;

  const normalizePhone = (value: string | null) => (value ?? "").replace(/\D/g, "");
  const normalizeWhatsapp = (value: string | null) => {
    const digits = (value ?? "").replace(/\D/g, "");
    if (!digits) {
      return "";
    }
    return digits.startsWith("598") ? digits : `598${digits.replace(/^0+/, "")}`;
  };

  const getCoordinates = (rp: ReferencePoint) => {
    const latitude = toFiniteNumber(rp.latitude);
    const longitude = toFiniteNumber(rp.longitude);
    if (latitude === null || longitude === null) {
      return null;
    }
    return { latitude, longitude };
  };

  return (
    <section id="resources" className="py-16 px-4 bg-base-300/20">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4">Recursos en tu zona</h2>
          <p className="text-base-content/60 mb-6">Encontrá ayuda cerca de donde estás.</p>

          <div className="max-w-xs mx-auto">
            {loading ? (
              <div className="flex items-center justify-center gap-2 text-base-content/50 py-2">
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>Cargando localidades…</span>
              </div>
            ) : error ? (
              <p className="text-error text-sm">{error}</p>
            ) : (
              <select
                className="select select-bordered w-full bg-base-100"
                value={selectedId}
                onChange={(e) => setSelectedId(e.target.value)}
              >
                <option value="" disabled>Elegí tu localidad</option>
                {localities.map((loc) => (
                  <option key={loc.id} value={String(loc.id)}>{loc.name}</option>
                ))}
              </select>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {selected && selected.reference_points.map((rp: ReferencePoint) => {
            const coordinates = getCoordinates(rp);
            return (
            <div key={rp.id} className="card bg-base-200 border border-primary/20 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="card-body">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="card-title flex items-center gap-2 text-xl">
                    <MapPin className="h-5 w-5 text-primary shrink-0" />
                    {rp.name}
                  </h3>
                  {rp.category && (
                    <span className="badge badge-outline badge-sm shrink-0">
                      {CATEGORY_LABELS[rp.category] ?? rp.category}
                    </span>
                  )}
                </div>
                {rp.address && <p className="text-base-content/60 text-sm">{rp.address}</p>}
                {rp.description && <p className="text-base-content/70 text-sm mt-1">{rp.description}</p>}

                <div className="space-y-2 text-sm text-base-content/70">
                  {rp.schedule && (
                    <p className="flex items-center gap-2">
                      <Clock3 className="h-4 w-4 text-primary shrink-0" />
                      <span>{rp.schedule}</span>
                    </p>
                  )}
                  {rp.email && (
                    <p className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-primary shrink-0" />
                      <a href={`mailto:${rp.email}`} className="link link-hover break-all">
                        {rp.email}
                      </a>
                    </p>
                  )}
                  {coordinates && (
                    <div className="flex flex-col gap-1">
                      <p className="flex items-center gap-2">
                        <Map className="h-4 w-4 text-primary shrink-0" />
                        <span>Ver ubicación</span>
                      </p>
                    </div>
                  )}
                </div>

                {coordinates && (
                  <ReferencePointMiniMap
                    latitude={coordinates.latitude}
                    longitude={coordinates.longitude}
                    name={rp.name}
                  />
                )}

                <div className="card-actions mt-2 flex flex-wrap gap-3">
                  {rp.phone && (
                    <a href={`tel:${normalizePhone(rp.phone)}`} className="btn btn-outline btn-sm gap-2">
                      <Phone className="h-4 w-4" />
                      Llamar
                    </a>
                  )}
                  {rp.whatsapp && (
                    <a
                      href={`https://wa.me/${normalizeWhatsapp(rp.whatsapp)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-secondary btn-sm gap-2"
                    >
                      <MessageCircle className="h-4 w-4" />
                      WhatsApp
                    </a>
                  )}
                </div>
              </div>
            </div>
            );
          })}

          {selected && selected.reference_points.length === 0 && (
            <p className="text-center col-span-full text-base-content/60">
              No hay recursos listados para esta localidad aún.
            </p>
          )}

          {!selected && !loading && !error && (
            <div className="col-span-full text-center py-10 opacity-50">
              <MapPin className="h-12 w-12 mx-auto mb-2" />
              <p>Seleccioná una localidad para ver los recursos disponibles.</p>
            </div>
          )}
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-base-content/60 bg-base-100/50 inline-block px-4 py-2 rounded-full border border-base-300">
            ⚠️ Si no podés hablar, intentá enviar un mensaje de texto o WhatsApp.
          </p>
        </div>
      </div>
    </section>
  );
};
