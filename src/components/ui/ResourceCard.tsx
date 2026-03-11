import React from "react";
import { CalendarDays, ExternalLink } from "lucide-react";

type ResourceCardProps = {
  title: string;
  summary?: string | null;
  imageUrl?: string | null;
  href: string;
  createdAt?: string;
  linkLabel?: string;
};

const formatDate = (value?: string) => {
  if (!value) {
    return null;
  }

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return null;
  }

  return new Intl.DateTimeFormat("es-UY", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(parsed);
};

const ResourceCardComponent: React.FC<ResourceCardProps> = ({
  title,
  summary,
  imageUrl,
  href,
  createdAt,
  linkLabel = "Abrir recurso",
}) => {
  const dateLabel = formatDate(createdAt);

  return (
    <article className="card bg-base-200/70 border border-primary/20 h-full transition-all duration-300 hover:border-primary/45 hover:-translate-y-0.5">
      {imageUrl ? (
        <figure className="h-44">
          <img src={imageUrl} alt={title} className="w-full h-full object-cover" loading="lazy" />
        </figure>
      ) : null}

      <div className="card-body">
        {dateLabel ? (
          <p className="text-xs text-base-content/60 inline-flex items-center gap-1">
            <CalendarDays className="h-3.5 w-3.5" />
            {dateLabel}
          </p>
        ) : null}

        <h3 className="card-title text-xl leading-tight">{title}</h3>

        <p className="text-base-content/75 leading-relaxed flex-1">
          {summary?.trim() || "Recurso digital disponible en el repositorio."}
        </p>

        <div className="card-actions justify-end mt-2">
          <a
            href={href}
            target="_blank"
            rel="noreferrer"
            className="btn btn-primary btn-sm gap-2"
          >
            {linkLabel}
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>
    </article>
  );
};

export const ResourceCard = React.memo(ResourceCardComponent);
