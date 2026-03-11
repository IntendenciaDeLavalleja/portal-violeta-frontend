import React, { useMemo, useState } from "react";
import { QueryClientProvider, keepPreviousData, useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { BookOpenText, Loader2, ChevronLeft, ChevronRight } from "lucide-react";

import { apiClient } from "@/lib/api/client";
import type { ReadingsResponse } from "@/lib/api/types";
import { queryClient } from "@/lib/queryClient";
import { ResourceCard } from "@/components/ui/ResourceCard";

const ITEMS_PER_PAGE = 12;

export const RepositorySection: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RepositorySectionInner />
    </QueryClientProvider>
  );
};

const RepositorySectionInner: React.FC = () => {
  const [page, setPage] = useState(1);

  const readingsQuery = useQuery({
    queryKey: ["readings", page],
    queryFn: async () => {
      const response = await apiClient.get<ReadingsResponse>("/readings", {
        params: {
          page,
          per_page: ITEMS_PER_PAGE,
        },
      });

      return response.data;
    },
    placeholderData: keepPreviousData,
  });

  const items = readingsQuery.data?.items ?? [];
  const pagination = readingsQuery.data?.pagination;
  const totalItems = pagination?.total_items ?? 0;
  const totalPages = pagination?.total_pages ?? 0;

  const errorMessage = (readingsQuery.error as AxiosError<{ message?: string }> | null)?.response?.data?.message
    ?? (readingsQuery.error ? "No se pudieron cargar los recursos." : null);

  const pageWindow = useMemo(() => {
    if (!pagination) {
      return [] as number[];
    }

    const start = Math.max(1, page - 2);
    const end = Math.min(pagination.total_pages, page + 2);
    const pages: number[] = [];

    for (let current = start; current <= end; current += 1) {
      pages.push(current);
    }

    return pages;
  }, [page, pagination]);

  return (
    <section id="repositorio" className="py-16 px-4 bg-base-200/25">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-3">Repositorio digital</h1>
          <p className="text-lg text-base-content/70">Materiales, guías y lecturas para informarte y acompañarte.</p>
        </div>

        <p className="mb-6 text-sm text-base-content/60 text-center">
          {readingsQuery.isFetching ? "Actualizando recursos…" : `Mostrando ${items.length} de ${totalItems} recursos`}
        </p>

        {readingsQuery.isLoading ? (
          <div className="flex flex-col items-center justify-center py-16 text-base-content/60 gap-3">
            <Loader2 className="h-7 w-7 animate-spin" />
            <p>Cargando recursos del repositorio…</p>
          </div>
        ) : errorMessage ? (
          <div className="alert alert-error max-w-2xl mx-auto">
            <span>{errorMessage}</span>
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-16 border border-dashed border-base-300 rounded-2xl bg-base-100/40">
            <BookOpenText className="h-12 w-12 mx-auto mb-3 opacity-60" />
            <p className="text-base-content/70">No hay recursos disponibles por ahora.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((reading) => (
              <ResourceCard
                key={reading.id}
                title={reading.title}
                summary={reading.summary}
                imageUrl={reading.cover_image_url}
                href={reading.document_url}
                createdAt={reading.created_at}
                linkLabel="Ver lectura"
              />
            ))}
          </div>
        )}

        {totalPages > 1 ? (
          <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => setPage((prev) => Math.max(1, prev - 1))}
              className="btn btn-sm btn-outline"
              disabled={!pagination?.has_prev || readingsQuery.isFetching}
            >
              <ChevronLeft className="h-4 w-4" />
              Anterior
            </button>

            {pageWindow.map((pageNumber) => (
              <button
                key={pageNumber}
                type="button"
                onClick={() => setPage(pageNumber)}
                className={`btn btn-sm ${pageNumber === page ? "btn-primary" : "btn-ghost"}`}
                disabled={readingsQuery.isFetching}
              >
                {pageNumber}
              </button>
            ))}

            <button
              type="button"
              onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
              className="btn btn-sm btn-outline"
              disabled={!pagination?.has_next || readingsQuery.isFetching}
            >
              Siguiente
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        ) : null}
      </div>
    </section>
  );
};
