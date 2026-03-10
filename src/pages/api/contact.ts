import type { APIRoute } from 'astro';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  const backendBaseUrl = import.meta.env.BACKEND_API_URL ?? 'http://127.0.0.1:5000';

  let payload: unknown;
  try {
    const text = await request.text();
    if (!text) {
      return new Response(JSON.stringify({ message: 'Cuerpo de la solicitud vacío.' }), { status: 400 });
    }
    payload = JSON.parse(text);
  } catch {
    return new Response(
      JSON.stringify({
        message: 'JSON inválido.',
      }),
      { status: 400 }
    );
  }

  try {
    const upstream = await fetch(`${backendBaseUrl}/api/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const upstreamBody = await upstream.text();

    return new Response(upstreamBody, {
      status: upstream.status,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch {
    return new Response(
      JSON.stringify({
        message: 'No se pudo conectar con el backend de contacto.',
      }),
      { status: 502 }
    );
  }
};
