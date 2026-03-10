import React, { useMemo, useState } from "react";
import { QueryClientProvider, keepPreviousData, useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { BookOpenText, Loader2, Search, ChevronLeft, ChevronRight, X, SlidersHorizontal } from "lucide-react";

import { apiClient } from "@/lib/api/client";
import type { BlogPostsResponse } from "@/lib/api/types";
import { queryClient } from "@/lib/queryClient";
import { BlogPostCard } from "@/components/ui/BlogPostCard";

const POSTS_PER_PAGE = 20;

export const BlogPostsSection: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BlogPostsSectionInner />
    </QueryClientProvider>
  );
};

const BlogPostsSectionInner: React.FC = () => {
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryInput, setCategoryInput] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [dateFromInput, setDateFromInput] = useState("");
  const [dateToInput, setDateToInput] = useState("");
  const [dateFromFilter, setDateFromFilter] = useState("");
  const [dateToFilter, setDateToFilter] = useState("");
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  const blogQuery = useQuery({
    queryKey: ["blog-posts", page, searchQuery, categoryFilter, dateFromFilter, dateToFilter],
    queryFn: async () => {
      const response = await apiClient.get<BlogPostsResponse>("/blog/posts", {
        params: {
          page,
          per_page: POSTS_PER_PAGE,
          q: searchQuery || undefined,
          category: categoryFilter || undefined,
          date_from: dateFromFilter || undefined,
          date_to: dateToFilter || undefined,
        },
      });
      return response.data;
    },
    placeholderData: keepPreviousData,
  });

  const posts = blogQuery.data?.items ?? [];
  const pagination = blogQuery.data?.pagination;
  const totalItems = pagination?.total_items ?? 0;
  const totalPages = pagination?.total_pages ?? 0;
  const availableCategories = blogQuery.data?.available_categories ?? [];

  const featuredPost = posts[0] ?? null;
  const secondaryPosts = posts.slice(1);

  const pageWindow = useMemo(() => {
    if (!pagination) {
      return [] as number[];
    }

    const start = Math.max(1, page - 2);
    const end = Math.min(pagination.total_pages, page + 2);
    const values: number[] = [];

    for (let current = start; current <= end; current += 1) {
      values.push(current);
    }

    return values;
  }, [page, pagination]);

  const errorMessage = (blogQuery.error as AxiosError<{ message?: string }> | null)?.response?.data?.message
    ?? (blogQuery.error ? "No se pudieron cargar los artículos." : null);

  const handleSearchSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setFormError(null);

    if (dateFromInput && dateToInput && dateFromInput > dateToInput) {
      setFormError("La fecha desde no puede ser mayor a la fecha hasta.");
      return;
    }

    const normalized = searchInput.trim();
    setPage(1);
    setSearchQuery(normalized);
    setCategoryFilter(categoryInput.trim());
    setDateFromFilter(dateFromInput);
    setDateToFilter(dateToInput);
  };

  const handleClearSearch = () => {
    setSearchInput("");
    setSearchQuery("");
    setCategoryInput("");
    setCategoryFilter("");
    setDateFromInput("");
    setDateToInput("");
    setDateFromFilter("");
    setDateToFilter("");
    setFormError(null);
    setPage(1);
  };

  return (
    <section id="blog" className="py-16 px-4 bg-base-200/25">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-3">Blog y novedades</h1>
          <p className="text-base-content/70 text-lg">Encontrá artículos, guías y contenido actualizado para acompañarte.</p>
        </div>

        <form onSubmit={handleSearchSubmit} className="max-w-5xl mx-auto mb-8 space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            <label className="input input-bordered md:col-span-4 w-full flex items-center gap-2 bg-base-100/80">
              <Search className="h-4 w-4 opacity-60" />
              <input
                value={searchInput}
                onChange={(event) => setSearchInput(event.target.value)}
                type="text"
                className="grow"
                placeholder="Buscar por título, resumen o contenido"
                aria-label="Buscar artículos"
              />
            </label>

            <button
              type="button"
              className={`btn md:col-span-1 ${showAdvanced ? "btn-secondary" : "btn-outline"}`}
              onClick={() => setShowAdvanced((prev) => !prev)}
              aria-expanded={showAdvanced}
            >
              <SlidersHorizontal className="h-4 w-4" />
              Búsqueda avanzada
            </button>
          </div>

          <div
            className={`grid transition-all duration-300 ${showAdvanced ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
          >
            <div className="overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-4 rounded-xl border border-primary/20 bg-base-200/40">
                <label className="form-control">
                  <span className="label-text text-sm text-base-content/70 mb-1">Categoría</span>
                  <select
                    className="select select-bordered bg-base-100/80"
                    value={categoryInput}
                    onChange={(event) => setCategoryInput(event.target.value)}
                    aria-label="Filtrar por categoría"
                  >
                    <option value="">Todas las categorías</option>
                    {availableCategories.map((category) => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </label>

                <label className="form-control">
                  <span className="label-text text-sm text-base-content/70 mb-1">Desde</span>
                  <input
                    type="date"
                    className="input input-bordered bg-base-100/80"
                    value={dateFromInput}
                    onChange={(event) => setDateFromInput(event.target.value)}
                    aria-label="Fecha desde"
                  />
                </label>

                <label className="form-control">
                  <span className="label-text text-sm text-base-content/70 mb-1">Hasta</span>
                  <input
                    type="date"
                    className="input input-bordered bg-base-100/80"
                    value={dateToInput}
                    onChange={(event) => setDateToInput(event.target.value)}
                    aria-label="Fecha hasta"
                  />
                </label>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap justify-end gap-2">
            <button
              type="button"
              onClick={handleClearSearch}
              className="btn btn-outline"
              disabled={blogQuery.isFetching}
            >
              <X className="h-4 w-4" />
              Limpiar
            </button>
            <button type="submit" className="btn btn-primary" disabled={blogQuery.isFetching}>
              Buscar
            </button>
          </div>

          {formError ? (
            <p className="text-error text-sm text-right">{formError}</p>
          ) : null}
        </form>

        <div className="mb-6 text-sm text-base-content/60 text-center">
          {blogQuery.isFetching
            ? "Actualizando artículos…"
            : `Mostrando ${posts.length} de ${totalItems} artículos${searchQuery ? ` para “${searchQuery}”` : ""}${categoryFilter ? ` en ${categoryFilter}` : ""}`}
        </div>

        {blogQuery.isLoading ? (
          <div className="flex flex-col items-center justify-center py-16 text-base-content/60 gap-3">
            <Loader2 className="h-7 w-7 animate-spin" />
            <p>Cargando artículos del blog…</p>
          </div>
        ) : errorMessage ? (
          <div className="alert alert-error max-w-2xl mx-auto">
            <span>{errorMessage}</span>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-16 border border-dashed border-base-300 rounded-2xl bg-base-100/40">
            <BookOpenText className="h-12 w-12 mx-auto mb-3 opacity-60" />
            <p className="text-base-content/70">No se encontraron artículos con esa búsqueda.</p>
          </div>
        ) : (
          <>
            {featuredPost ? (
              <div className="max-w-4xl mx-auto mb-8">
                <BlogPostCard post={featuredPost} featured />
              </div>
            ) : null}

            {secondaryPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {secondaryPosts.map((post) => (
                  <BlogPostCard key={post.id} post={post} />
                ))}
              </div>
            ) : null}
          </>
        )}

        {totalPages > 1 ? (
          <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => setPage((prev) => Math.max(1, prev - 1))}
              className="btn btn-sm btn-outline"
              disabled={!pagination?.has_prev || blogQuery.isFetching}
            >
              <ChevronLeft className="h-4 w-4" />
              Anterior
            </button>

            {pageWindow[0] && pageWindow[0] > 1 ? (
              <>
                <button
                  type="button"
                  onClick={() => setPage(1)}
                  className="btn btn-sm btn-ghost"
                  disabled={blogQuery.isFetching}
                >
                  1
                </button>
                {pageWindow[0] > 2 ? <span className="px-1 text-base-content/50">…</span> : null}
              </>
            ) : null}

            {pageWindow.map((pageNumber) => (
              <button
                key={pageNumber}
                type="button"
                onClick={() => setPage(pageNumber)}
                className={`btn btn-sm ${pageNumber === page ? "btn-primary" : "btn-ghost"}`}
                disabled={blogQuery.isFetching}
              >
                {pageNumber}
              </button>
            ))}

            {pageWindow.length > 0 && pageWindow[pageWindow.length - 1] < totalPages ? (
              <>
                {pageWindow[pageWindow.length - 1] < totalPages - 1 ? (
                  <span className="px-1 text-base-content/50">…</span>
                ) : null}
                <button
                  type="button"
                  onClick={() => setPage(totalPages)}
                  className="btn btn-sm btn-ghost"
                  disabled={blogQuery.isFetching}
                >
                  {totalPages}
                </button>
              </>
            ) : null}

            <button
              type="button"
              onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
              className="btn btn-sm btn-outline"
              disabled={!pagination?.has_next || blogQuery.isFetching}
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
