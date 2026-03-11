/// <reference types="astro/client" />

interface ImportMetaEnv {
  /** URL base del backend Flask incluyendo /api.
   *  Ejemplo: https://api.campingarequita.uy/api
   *  Debe pasarse como build arg en Coolify/Docker.
   */
  readonly PUBLIC_API_URL: string;

  /** Alias legacy — usar PUBLIC_API_URL en proyectos nuevos. */
  readonly PUBLIC_API_BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
