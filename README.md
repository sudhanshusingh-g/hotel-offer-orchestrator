# Hotel Offer Orchestrator

## Overview

Node.js microservice that orchestrates hotel offers from multiple suppliers using Temporal.io workflow engine.

## Tech Stack

- Node.js + TypeScript
- Express.js
- Temporal.io
- Redis
- Docker Compose

## Prerequisites

- Docker Desktop
- Node.js 20+ (for local development)

## Quick Start

### Run with Docker Compose

```bash
# Clone repository
git clone <your-repo-url>
cd hotel-orchestrator

# Start all services
docker compose up --build

# Wait for services to initialize (30 seconds)
# Test the API
curl "http://localhost:3000/api/hotels?city=delhi"
GET /api/hotels?city=delhi&minPrice=5000&maxPrice=7000
GET /supplierA/hotels
GET /supplierB/hotels

# Bonus
curl http://localhost:3000/health
```
