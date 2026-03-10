import React from "react";
import { CalendarDays, Tag, UserRound, AtSign } from "lucide-react";
import type { BlogPostSummary } from "@/lib/api/types";

type BlogPostCardProps = {
  post: BlogPostSummary;
  featured?: boolean;
};

const stripHtml = (value: string) => value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();

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
    month: "short",
    year: "numeric",
  }).format(parsed);
};

const BlogPostCardComponent: React.FC<BlogPostCardProps> = ({ post, featured = false }) => {
  const summary = stripHtml(post.excerpt ?? "");
  const href = `/blog/${post.slug}`;
  const contact = post.author?.contact?.trim() ?? "";

  return (
    <a href={href} className="group block h-full" aria-label={`Leer artículo: ${post.title}`}>
      <article
        className={`card border border-primary/20 bg-base-200/70 backdrop-blur-sm h-full transition-all duration-300 group-hover:border-primary/45 group-hover:-translate-y-0.5 ${
          featured ? "shadow-lg shadow-primary/10" : ""
        }`}
      >
        {post.cover_image_url ? (
          <figure className={featured ? "h-64" : "h-44"}>
            <img
              src={post.cover_image_url}
              alt={post.title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </figure>
        ) : null}

        <div className="card-body">
          <div className="flex flex-wrap items-center gap-2 text-xs text-base-content/60">
            {post.category ? (
              <span className="badge badge-outline badge-sm gap-1 border-primary/40 text-primary/80">
                <Tag className="h-3 w-3" />
                {post.category}
              </span>
            ) : null}
            <span className="inline-flex items-center gap-1">
              <CalendarDays className="h-3.5 w-3.5" />
              {formatDate(post.published_at ?? post.created_at)}
            </span>
          </div>

          <h3 className={`${featured ? "text-2xl" : "text-xl"} font-bold text-foreground leading-tight group-hover:text-primary transition-colors`}>
            {post.title}
          </h3>

          <p className="text-base-content/75 leading-relaxed">
            {summary || "Artículo disponible para lectura en el portal."}
          </p>

          <div className="mt-auto pt-2 flex items-center justify-between gap-3">
            {post.author?.name ? (
              <div className="flex items-center gap-2 min-w-0">
                {post.author.photo_url ? (
                  <img
                    src={post.author.photo_url}
                    alt={post.author.name}
                    className="h-8 w-8 rounded-full object-cover border border-primary/30"
                    loading="lazy"
                  />
                ) : (
                  <span className="h-8 w-8 rounded-full bg-base-300 border border-primary/20 inline-flex items-center justify-center">
                    <UserRound className="h-4 w-4 text-primary/80" />
                  </span>
                )}
                <div className="min-w-0">
                  <span className="text-sm text-base-content/80 truncate block">{post.author.name}</span>
                  {contact ? (
                    <span className="text-xs text-base-content/60 inline-flex items-center gap-1 truncate max-w-40">
                      <AtSign className="h-3 w-3" />
                      {contact}
                    </span>
                  ) : null}
                </div>
              </div>
            ) : <span />}

            <span className="text-sm text-primary font-medium">Leer más →</span>
          </div>
        </div>
      </article>
    </a>
  );
};

export const BlogPostCard = React.memo(BlogPostCardComponent);
