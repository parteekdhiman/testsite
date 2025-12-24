Backend moved to separate server

The backend has been moved out of the frontend repo into `server/` and is intended to run as a standalone process (on another host or service). The frontend now expects an external API root configured with `VITE_API_URL`.

Server environment variables (set on the host running the server):

- `SMTP_HOST` — SMTP server host (e.g. smtp.gmail.com)
- `SMTP_PORT` — SMTP port (usually 587 or 465)
- `SMTP_USER` — SMTP username (login email)
- `SMTP_PASS` — SMTP password or app password
- `EMAIL_TO` — Destination email that receives lead emails (optional, defaults to `SMTP_USER`)
- `EMAIL_FROM` — Optional from address (defaults to `SMTP_USER`)

Running the server locally (from the `server/` folder):

```bash
cd server
npm install
# set env vars in shell or create a .env file
npm run start
```

Frontend configuration (Vite):

- Set `VITE_API_URL` in your frontend environment (Vercel or hosting). Example in Vercel project settings: `VITE_API_URL=https://api.yourdomain.com`.
- The frontend's `src/utils/apiService.ts` will prefix endpoints with `VITE_API_URL`.

Notes:
- The `server/` folder can be deployed to Vercel as a separate project. The server is exported as a serverless handler and `server/vercel.json` routes all requests to the handler.
- For Gmail SMTP use, generate an App Password and use that as `SMTP_PASS`.
