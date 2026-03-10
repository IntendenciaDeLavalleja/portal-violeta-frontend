import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ url }) => {
  const backendBaseUrl =
    import.meta.env.BACKEND_API_URL ?? "http://127.0.0.1:5000";

  const params = new URLSearchParams();
  const page = url.searchParams.get("page") ?? "1";
  const perPage = url.searchParams.get("per_page") ?? "12";

  params.set("page", page);
  params.set("per_page", perPage);

  try {
    const upstream = await fetch(`${backendBaseUrl}/api/readings?${params.toString()}`, {
      method: "GET",
    });

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
        message: "No se pudo cargar el repositorio desde el backend.",
      }),
      { status: 502 },
    );
  }
};
