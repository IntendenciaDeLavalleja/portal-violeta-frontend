/// <reference types="astro/client" />

interface ImportMetaEnv {
  /**
   * URL base del backend Flask incluyendo /api.
   * Ejemplo: https://mapi.portalvioleta.lavalleja.uy/api
   * Se pasa como build arg en Coolify/Docker: PUBLIC_API_URL
   */
  readonly PUBLIC_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
