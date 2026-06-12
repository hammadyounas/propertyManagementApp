# Property Management System — Frontend

Web application for the Property Management System. Built with Next.js and connects to the [property-management-backend](https://github.com/hammadyounas/property-management-backend) REST API.

**Stack:** Next.js 14 · React 18 · Redux Toolkit · Tailwind CSS · TypeScript

---

## Table of Contents

- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [Project Structure](#project-structure)
- [Features](#features)
- [Production Build](#production-build)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)

---

## Prerequisites

| Requirement | Version |
|-------------|---------|
| [Node.js](https://nodejs.org/) | 18+ (20 recommended) |
| npm | Latest recommended |
| Backend API | Running at the URL set in `NEXT_PUBLIC_API_URL` |

The backend must be running before you can log in or use API features.

---

## Quick Start

### 1. Clone and install

```bash
git clone https://github.com/hammadyounas/propertyManagementApp.git
cd propertyManagementApp
npm install
```

### 2. Configure environment

```bash
cp .env.example .env
```

Edit `.env`:

```env
NEXT_PUBLIC_API_URL=http://localhost:9000
NEXT_PUBLIC_API_PREFIX=api/v1.0.0
NEXT_PUBLIC_SYNCFUSION_LICENSE_KEY=your_license_key
```

### 3. Start the backend

In the backend repo:

```bash
cd ../property-management-backend
npm run dev
```

Backend runs at **http://localhost:9000**

### 4. Start the frontend

```bash
npm run dev
```

Open **http://localhost:3000** in your browser.

---

## Environment Variables

Copy `.env.example` to `.env` and fill in your values.

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_API_URL` | Yes | Backend base URL (no trailing slash) |
| `NEXT_PUBLIC_API_PREFIX` | Yes | API path prefix (must match backend version) |
| `NEXT_PUBLIC_SYNCFUSION_LICENSE_KEY` | Yes* | Syncfusion document editor license |

\* Required for Syncfusion document editor features. Get a free community license at [syncfusion.com](https://www.syncfusion.com/sales/communitylicense).

### Environment examples

**Local development:**

```env
NEXT_PUBLIC_API_URL=http://localhost:9000
NEXT_PUBLIC_API_PREFIX=api/v1.0.0
```

**Production:**

```env
NEXT_PUBLIC_API_URL=https://your-api-domain.com
NEXT_PUBLIC_API_PREFIX=api/v1.0.0
```

> Variables prefixed with `NEXT_PUBLIC_` are exposed to the browser. Do not put secrets other than the Syncfusion license here.

---

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server on port 3000 |
| `npm run build` | Create production build |
| `npm start` | Run production build |
| `npm run lint` | Run ESLint |

---

## Project Structure

```
propertyManagementApp/
├── src/
│   ├── components/      # Shared UI components
│   ├── configs/         # API URL & prefix constants
│   ├── libs/            # Utilities & API helpers
│   ├── pages/           # Next.js pages (routing)
│   ├── store/           # Redux store
│   └── templates/       # Page-level feature modules
├── public/
│   └── lib/webviewer/   # PDFTron WebViewer assets
├── .env.example         # Environment template
└── tailwind.config.js
```

---

## Features

| Module | Description |
|--------|-------------|
| Login / Auth | JWT-based authentication |
| Properties | Create, edit, and manage property listings |
| Clients | Client management |
| Dashboard | Deal tracking with commission & closing dates |
| Meetings | Calendar with FullCalendar |
| Invoices | Invoice creation and PDF generation |
| Documents | Document editor (Syncfusion), PDF viewer (PDFTron) |
| ACM | ACM listing management |
| Email Marketing | Campaign creation and sending |
| Sales Team | User / team management |

Authentication tokens are stored in `localStorage` (`auth_token`, `user_id`, `role`).

---

## Production Build

```bash
npm run build
npm start
```

Set production environment variables before building. Next.js bakes `NEXT_PUBLIC_*` values into the build at compile time.

```bash
# Example for production
NEXT_PUBLIC_API_URL=https://your-api-domain.com npm run build
```

Or configure variables in your hosting platform (Vercel, DigitalOcean, etc.) before deploying.

---

## Deployment

### Vercel (recommended for Next.js)

1. Import the GitHub repository in [Vercel](https://vercel.com).
2. Set environment variables in project settings:
   - `NEXT_PUBLIC_API_URL`
   - `NEXT_PUBLIC_API_PREFIX`
   - `NEXT_PUBLIC_SYNCFUSION_LICENSE_KEY`
3. Deploy.

### DigitalOcean / VPS

```bash
npm run build
pm2 start npm --name property-frontend -- start
pm2 save
```

Use Nginx to proxy your domain to port 3000.

Ensure the backend `FRONTEND_URL` in its `.env` matches your deployed frontend URL (used for password reset emails).

---

## Troubleshooting

### API requests fail / CORS errors

- Confirm the backend is running at `NEXT_PUBLIC_API_URL`.
- Check `NEXT_PUBLIC_API_PREFIX` matches the backend (`api/v1.0.0`).
- Restart the dev server after changing `.env`.

### Login does not work

- Verify backend `MONGO_URI` points to a database with user records.
- Check browser DevTools → Network for failed `/users/login` requests.

### Syncfusion editor not loading

- Set a valid `NEXT_PUBLIC_SYNCFUSION_LICENSE_KEY` in `.env`.
- Restart `npm run dev` after updating env vars.

### Env changes not applied

Next.js reads `.env` at startup. Always restart the dev server after editing `.env`.

---

## Related Repositories

| Repo | Description |
|------|-------------|
| [property-management-backend](https://github.com/hammadyounas/property-management-backend) | Express REST API |

---

## License

Private
