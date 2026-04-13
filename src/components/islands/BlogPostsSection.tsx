import React, { useEffect, useMemo, useState } from "react";
import { QueryClientProvider, keepPreviousData, useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { ArrowLeft, BookOpenText, CalendarDays, ChevronLeft, ChevronRight, Loader2, Search, SlidersHorizontal, X } from "lucide-react";

import { apiClient } from "@/lib/api/client";
import type { BlogPostDetailResponse, BlogPostsResponse } from "@/lib/api/types";
import { queryClient } from "@/lib/queryClient";
import { BlogPostCard } from "@/components/ui/BlogPostCard";

const POSTS_PER_PAGE = 20;

type BlogRoute =
  | { mode: "list" }
  | { mode: "detail"; slug: string };

const formatDate = (date: string | null) => {
  if (!date) {
    return "Sin fecha";
  }

  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) {
    return "Sin fecha";
  }

  return new Intl.DateTimeFormat("es-UY", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(parsed);
};

const getBlogRoute = (pathname: string): BlogRoute => {
  const sanitizedPath = pathname.split("?")[0]?.replace(/\/+$/, "") || "/blog";
  const segments = sanitizedPath.split("/").filter(Boolean);

  if (segments[0] === "blog" && segments.length > 1) {
    return {
      mode: "detail",
      slug: decodeURIComponent(segments.slice(1).join("/")),
    };
  }

  return { mode: "list" };
};

export const BlogPostsSection: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BlogPostsRouter />
    </QueryClientProvider>
  );
};

const BlogPostsRouter: React.FC = () => {
  if (typeof window === "undefined") {
    return null;
  }

  const route = getBlogRoute(window.location.pathname);

  if (route.mode === "detail") {
    return <BlogPostDetailView slug={route.slug} />;
  }

  return <BlogPostsSectionInner />;
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

type BlogPostDetailViewProps = {
  slug: string;
};

const BlogPostDetailView: React.FC<BlogPostDetailViewProps> = ({ slug }) => {
  const detailQuery = useQuery({
    queryKey: ["blog-post", slug],
    queryFn: async () => {
      const response = await apiClient.get<BlogPostDetailResponse>(`/blog/posts/${encodeURIComponent(slug)}`);
      return response.data;
    },
    retry: false,
  });

  const post = detailQuery.data?.item;
  const related = detailQuery.data?.related ?? [];
  const detailError = detailQuery.error as AxiosError<{ message?: string }> | null;
  const isNotFound = detailError?.response?.status === 404;
  const errorMessage = detailError?.response?.data?.message
    ?? (isNotFound ? "No encontramos ese artículo." : detailQuery.error ? "No se pudo cargar el artículo." : null);

  useEffect(() => {
    if (!post?.title) {
      return;
    }

    document.title = `${post.title} | Blog Portal Violeta`;
  }, [post?.title]);

  if (detailQuery.isLoading) {
    return (
      <section className="py-16 px-4 bg-base-200/25">
        <div className="container mx-auto max-w-4xl flex flex-col items-center justify-center gap-3 py-20 text-base-content/60">
          <Loader2 className="h-7 w-7 animate-spin" />
          <p>Cargando artículo…</p>
        </div>
      </section>
    );
  }

  if (!post || errorMessage) {
    return (
      <section className="py-16 px-4 bg-base-200/25">
        <div className="container mx-auto max-w-3xl pt-8">
          <a href="/blog" className="btn btn-ghost btn-sm mb-6">
            <ArrowLeft className="h-4 w-4" />
            Volver al blog
          </a>
          <div className={`alert ${isNotFound ? "alert-warning" : "alert-error"}`}>
            <span>{errorMessage ?? "No se pudo cargar el artículo."}</span>
          </div>
        </div>
      </section>
    );
  }

  const authorContact = post.author?.contact?.trim() ?? "";
  const authorContactHref = authorContact.includes("@")
    ? `mailto:${authorContact}`
    : authorContact.startsWith("http://") || authorContact.startsWith("https://")
      ? authorContact
      : /^\+?[\d\s()-]{6,}$/.test(authorContact)
        ? `tel:${authorContact.replace(/\s+/g, "")}`
        : "";

  return (
    <section className="py-16 px-4 bg-base-200/25">
      <article className="container mx-auto max-w-4xl pt-8">
        <a href="/blog" className="btn btn-ghost btn-sm mb-6">
          <ArrowLeft className="h-4 w-4" />
          Volver al blog
        </a>

        <header className="mb-6">
          <div className="flex flex-wrap items-center gap-3 text-sm text-base-content/70 mb-4">
            {post.category ? <span className="badge badge-outline border-primary/40 text-primary/90">{post.category}</span> : null}
            <span className="inline-flex items-center gap-1">
              <CalendarDays className="h-4 w-4" />
              {formatDate(post.published_at ?? post.created_at)}
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold leading-tight mb-5">{post.title}</h1>

          {post.author?.name ? (
            <div className="flex items-center gap-3">
              {post.author.photo_url ? (
                <img
                  src={post.author.photo_url}
                  alt={post.author.name}
                  className="w-11 h-11 rounded-full object-cover border border-primary/30"
                />
              ) : (
                <div className="w-11 h-11 rounded-full border border-primary/30 bg-base-300" />
              )}
              <div>
                <p className="font-medium">{post.author.name}</p>
                {post.author.bio ? <p className="text-sm text-base-content/65 line-clamp-2">{post.author.bio}</p> : null}
                {authorContact && authorContactHref ? (
                  <a
                    href={authorContactHref}
                    target={authorContactHref.startsWith("http") ? "_blank" : undefined}
                    rel={authorContactHref.startsWith("http") ? "noreferrer" : undefined}
                    className="text-sm text-primary/90 hover:text-primary"
                  >
                    {authorContact}
                  </a>
                ) : null}
              </div>
            </div>
          ) : null}
        </header>

        {post.cover_image_url ? (
          <figure className="mb-8 rounded-2xl overflow-hidden border border-primary/20">
            <img src={post.cover_image_url} alt={post.title} className="w-full h-105 object-cover" />
          </figure>
        ) : null}

        <section className="blog-rich-content max-w-none bg-base-200/40 border border-primary/20 rounded-2xl p-6 md:p-10">
          <div dangerouslySetInnerHTML={{ __html: post.content_html }} />
        </section>

        {related.length > 0 ? (
          <section className="mt-12">
            <h2 className="text-2xl font-bold mb-5">También te puede interesar</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((relatedPost) => (
                <BlogPostCard key={relatedPost.id} post={relatedPost} />
              ))}
            </div>
          </section>
        ) : null}
      </article>
    </section>
  );
};
