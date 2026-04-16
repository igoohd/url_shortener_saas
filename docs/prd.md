# 📄 Product Requirements Document (PRD)
## URL Shortener SaaS (CSR + Docker-First)

---

# 1. 🎯 Objective

Build a URL shortener service that:

- Converts long URLs into short links
- Redirects efficiently
- Demonstrates Docker-first, multi-service architecture
- Includes a lightweight client-side frontend (CSR)

---

# 2. 🧩 Problem Statement

Long URLs are difficult to:
- Share
- Track
- Manage

The system should provide a simplified solution focused on:
- Backend architecture
- Containerization
- System design

---

# 4. 🧱 Core Features (MVP)

## 4.1 Create Short URL

User submits a long URL and receives a shortened version.

### Input
```json
{
  "url": "https://example.com/long-url"
}
```

### Output
```json
{
  "shortUrl": "https://your-domain/abc123"
}
```

---

## 4.2 Redirect

Accessing a short URL:
- Resolves the original URL
- Returns HTTP redirect (301/302)

---

## 4.3 Persistence

- Store mapping between short code and original URL
- Data must persist across restarts

---

## 4.4 Minimal UI (CSR)

Frontend should:
- Accept URL input
- Call backend API
- Display shortened URL

---

# 5. 🖥️ Frontend Requirements (CSR)

## Architecture
- Client-Side Rendering only
- Static frontend

## Responsibilities
- Call API (`/shorten`)
- Display response
- Basic validation

---

# 6. ⚙️ Extended Features (Phase 2)

- Click tracking
- Async processing (worker)
- Redis caching
- Basic analytics (optional)

---

# 7. 📐 Functional Requirements

## FR1 — URL Creation
- Accept valid URLs
- Generate unique short code
- Persist mapping

## FR2 — Redirection
- Resolve short code
- Return HTTP redirect

## FR3 — UI Interaction
- UI communicates with API
- Displays results clearly

## FR4 — Fault Tolerance
- System works without cache (fallback to DB)

---

# 8. 🚀 Non-Functional Requirements

## Performance
- Low redirect latency

## Scalability
- Stateless API
- Horizontally scalable

## Reliability
- No data loss

## Maintainability
- Decoupled services

---

# 9. 🐳 System Architecture (Docker-First)

## Containers

- API Service
- Database (PostgreSQL)
- Cache (Redis)
- Worker Service
- Reverse Proxy (NGINX)
- Frontend (static container)

## Constraints

- No use of `localhost` between services
- Communication via Docker network
- Environment-based configuration

---

# 10. 🔄 Core Flows

## Flow 1 — Create URL

1. User inputs URL
2. Frontend sends request to API
3. API validates and generates short code
4. Data is stored
5. Short URL returned

---

## Flow 2 — Redirect

1. User accesses short URL
2. Backend resolves short code
3. Returns redirect response

---

## Flow 3 — Async Processing (Phase 2)

1. API pushes event to queue
2. Worker consumes event
3. Processes analytics

---

# 11. 📊 Data Requirements

Each URL must include:

- id
- short_code
- original_url
- created_at

---

# 12. 📦 Deliverables

- Backend API
- Frontend (CSR)
- Dockerfiles (all services)
- docker-compose.yml
- README with:
  - Architecture diagram
  - Setup instructions
  - Design decisions

---

# 13. 🗺️ Milestones

## Phase 1
- API + DB
- URL creation and redirect
- Basic frontend
- Docker setup

## Phase 2
- Redis cache
- Worker service

## Phase 3
- Reverse proxy
- Deployment
- CI/CD

---

# 14. 🧠 Key Design Decisions

To be defined during development:

- Short code generation strategy
- Database schema details
- Cache usage
- Service communication

---

# 15. ✅ Success Criteria

- URLs are shortened correctly
- Redirects work reliably
- System runs via Docker
- Architecture is modular
- App can be deployed publicly
