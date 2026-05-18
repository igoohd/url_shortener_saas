# URL Shortener SaaS

A portfolio project that demonstrates how to design and ship a containerized URL shortener with a modern frontend and a clean API backend.

This repository is guided by a product-first approach documented in [docs/prd.md](docs/prd.md), with emphasis on architecture, maintainability, and Docker-based development.

## Why this project exists

Long URLs are hard to share and manage. This project solves that with:

- URL shortening via a simple API
- Fast redirect flow using short codes
- Persistent storage with PostgreSQL
- Docker-first setup with multiple services
- A lightweight client-side frontend

## Current MVP scope

Implemented from the PRD:

- Create short URL from a long URL
- Redirect short URL to original URL
- Persist URL mappings across restarts
- Client-side web interface to submit URLs and display result
- Structured logging with Seq integration

Planned next phases (from PRD):

- Click tracking and basic analytics
- Cache layer (Redis)
- Worker/async processing
- Reverse proxy and production deployment hardening

## Architecture

The app is split into independent services connected by Docker Compose:

- Frontend: React + Vite app served on port 3000
- API: ASP.NET Core Web API on port 5001
- Database: PostgreSQL 15
- Observability: Seq for log inspection
- Database admin: Adminer

High-level flow:

1. User submits a URL in frontend.
2. Frontend calls API endpoint POST /url/shorten.
3. API generates a base62 short code and stores mapping in PostgreSQL.
4. API returns a shortened URL.
5. When short URL is opened, API resolves code and redirects.

## Tech stack

- Backend: ASP.NET Core (.NET 9), Npgsql, Serilog, Swagger
- Frontend: React 19, TypeScript, Vite, Tailwind CSS 4
- Data: PostgreSQL 15
- Infra: Docker, Docker Compose
- Tooling: Seq, Adminer, ESLint, Prettier

## API overview

Base URL (Docker): http://localhost:5001

### Create short URL

Method: POST
Path: /url/shorten

Request body:

{
"url": "https://example.com/very/long/path"
}

Response example:

{
"shortenedUrl": "http://localhost:5001/Url/abc123",
"shortCode": "abc123"
}

### Redirect

Method: GET
Path: /url/{shortCode}

Behavior:

- 302 redirect when code exists
- 404 when code is not found

## Getting started (Docker-first)

### Prerequisites

- Docker Desktop (or Docker Engine + Compose)

### 1) Configure environment

Root .env is already present with these keys:

- POSTGRES_USER
- POSTGRES_PASSWORD
- POSTGRES_DB
- POSTGRES_DB_PORT

Adjust values if needed.

### 2) Start all services

From repository root:

docker compose up --build

### 3) Open services

- Frontend: http://localhost:3000
- API (Swagger UI): http://localhost:5001
- Seq logs: http://localhost:5341
- Adminer: http://localhost:8080

### 4) Stop services

docker compose down

To also remove persisted database volume:

docker compose down -v

## Local development (without Docker)

### Backend

1. Install .NET 9 SDK and PostgreSQL.
2. Ensure DB environment variables are available to API process:

- DB_HOST
- DB_PORT
- DB_USER
- DB_PASSWORD
- DB_NAME
- FRONTEND_ORIGIN
- SEQ_URL (optional)

3. Run backend from API folder:

dotnet run

### Frontend

1. From frontend folder, install dependencies:

npm install

2. Run development server:

npm run dev

3. If needed, set VITE_API_BASE_URL to backend URL.

## Data model

Main table: url_mappings

- id: serial primary key
- short_code: unique varchar(10)
- original_url: text
- created_at: timestamp

Database bootstrap script lives in backend/db/init-db.sql.

## Repository structure

- backend: ASP.NET Core API, database bootstrap, Dockerfile
- frontend: React + Vite CSR app, Dockerfile
- docs: product documentation, including PRD
- docker-compose.yml: full local stack orchestration

## Portfolio notes

This project is designed to showcase:

- Full-stack architecture thinking
- Service boundaries and environment-driven configuration
- Practical containerized workflow
- API + UI integration with clear contracts
- Production-minded logging and debugging setup

## Product documentation

- PRD: [docs/prd.md](docs/prd.md)
