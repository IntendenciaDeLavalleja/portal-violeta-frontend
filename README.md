# Portal Violeta

Frontend en Astro + React con backend Flask dedicado al formulario de ayuda.

## Integración frontend/backend

- El formulario React envía datos a `POST /api/contact` (ruta de Astro).
- Esa ruta funciona como proxy hacia Flask en `POST /api/contact`.
- El backend valida y guarda mensajes en `backend/data/contact_messages.jsonl`.

## Ejecutar en local

### 1) Backend

```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python manage.py
```

### 2) Frontend

En la raíz del proyecto, crea `.env` con:

```bash
BACKEND_API_URL=http://127.0.0.1:5000
```

Luego:

```bash
npm install
npm run dev
```

Frontend: `http://localhost:4321`.
