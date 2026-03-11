# Camping Arequita Web + Backend

Portal público en Astro + React y backend en Flask para catálogo, pre-reservas, panel admin con 2FA/captcha y gestión de medios en MinIO.

## Stack

- Frontend: Astro, React, Tailwind, DaisyUI, Zod, React Hook Form
- Backend: Flask, SQLAlchemy, Flask-Login, Flask-WTF, Flask-Mail, MinIO, MariaDB
- Seguridad: Login admin con captcha + doble factor, rate limiting y auditoría para super admin

## Puesta en marcha

### 1) Frontend

```bash
npm install
npm run dev
```

Variable opcional para apuntar a otro backend:

```bash
PUBLIC_API_BASE_URL=http://localhost:5000/api
```

### 2) Backend

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
```

Crear `.env` en `backend/` y configurar:

- `DATABASE_URI` (MariaDB)
- `SECRET_KEY`
- `MAIL_*`
- `MINIO_ENDPOINT`, `MINIO_ACCESS_KEY`, `MINIO_SECRET_KEY`, `MINIO_BUCKET_NAME`, `MINIO_PUBLIC_URL`

Inicialización:

```bash
flask db upgrade
flask seed-data
flask create-admin admin admin@arequita.com password true
flask run
```

## Endpoints principales

- `GET /api/public/services`
- `GET /api/public/hero-images`
- `GET /api/public/testimonios`
- `GET /api/public/reviews` (alias temporal de compatibilidad)
- `POST /api/public/pre-reservations`
- `GET /api/public/pre-reservations/confirm?token=...`
- `POST /api/public/suggestions`

## Panel admin

- `/admin/login` (captcha + 2FA)
- `/admin/camping/services`
- `/admin/camping/testimonios`
- `/admin/camping/pre-reservations`
- `/admin/camping/media-cleanup`
- `/admin/audit-logs` (solo super admin)
