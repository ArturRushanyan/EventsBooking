# EventsBooking

A minimal booking API built with Express (TypeScript) and TypeORM using PostgreSQL. It supports reserving seats for events with uniqueness enforced per user per event.

## Tech Stack

- Node.js + Express (TypeScript)
- TypeORM (Data Mapper)
- PostgreSQL
- Docker + Docker Compose

## Requirements

- Node.js 20+
- npm 10+
- Docker (optional, for containerized setup)

## Environment Variables

Create an `.env` (or export in your shell). See `env.example` for defaults.

```env
PORT=3000

# Database
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=events
```

## Install & Run (Local)

```bash
npm ci
npm run dev
```

- API runs at `http://localhost:3000`.
- Update DB credentials in `.env` or ensure a local PostgreSQL is running.

### Build & Start (Production mode locally)

```bash
npm run build
npm start
```

## Database & Migrations

Generate a new migration:

```bash
npm run migration:generate --name=AddSomething
```

Run migrations (TypeScript, local dev):

```bash
npm run migration:run
```

Revert last migration:

```bash
npm run migration:revert
```

Production migration runner (uses compiled JS):

```bash
npm run build && npm run migrate:prod
```

## Docker Usage

Build and start the app + Postgres + migrations:

```bash
docker compose up --build
```

- App: `http://localhost:3000`
- DB: `localhost:5432` (user: `postgres`, pass: `postgres`, db: `events` by default)
- The `migrations` one-off service runs automatically before the app starts.

Stop and remove containers:

```bash
docker compose down
```

## API

Base URL: `http://localhost:3000/api`

### Reserve a seat

POST `/bookings/reserve`

Request body:

```json
{
  "event_id": 1,
  "user_id": "user-123"
}
```

Responses:

- 201: `{ "success": true, "message": "Booking successful. X seats remaining." }`
- 404: `{ "message": "Event not found" }`
- 409: `{ "message": "No available seats for this event" }`
- 400: `{ "message": "User already booked this event" }` (unique per event and user)
