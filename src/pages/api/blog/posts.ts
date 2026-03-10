import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ url }) => {
  const backendBaseUrl =
    import.meta.env.BACKEND_API_URL ?? "http://127.0.0.1:5000";

  const params = new URLSearchParams();
  const page = url.searchParams.get("page") ?? "1";
  const perPage = url.searchParams.get("per_page") ?? "20";
  const query = (url.searchParams.get("q") ?? "").trim();
  const category = (url.searchParams.get("category") ?? "").trim();
  const dateFrom = (url.searchParams.get("date_from") ?? "").trim();
  const dateTo = (url.searchParams.get("date_to") ?? "").trim();

  params.set("page", page);
  params.set("per_page", perPage);
  if (query) {
    params.set("q", query);
  }
  if (category) {
    params.set("category", category);
  }
  if (dateFrom) {
    params.set("date_from", dateFrom);
  }
  if (dateTo) {
    params.set("date_to", dateTo);
  }

  try {
    const upstream = await fetch(
      `${backendBaseUrl}/api/blog/posts?${params.toString()}`,
      {
        method: "GET",
      },
    );

    const upstreamBody = await upstream.text();

    return new Response(upstreamBody, {
      status: upstream.status,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch {
    return new Response(
      JSON.stringify({
        message: "No se pudo cargar el blog desde el backend.",
      }),
      { status: 502 },
    );
  }
};
