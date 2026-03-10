import type { APIRoute } from "astro";

export const GET: APIRoute = async () => {
  const backendBaseUrl =
    import.meta.env.BACKEND_API_URL ?? "http://127.0.0.1:5000";

  try {
    const upstream = await fetch(`${backendBaseUrl}/api/localities`, {
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
        message: "No se pudo cargar localidades desde el backend.",
      }),
      { status: 502 },
    );
  }
};
