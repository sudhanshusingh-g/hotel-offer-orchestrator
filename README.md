# Hotel Offer Orchestrator

## Overview

Node.js microservice that orchestrates hotel offers from multiple suppliers using Temporal.io workflow engine.

## Tech Stack

![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?logo=express&logoColor=white)
![Temporal](https://img.shields.io/badge/Temporal-1F1F1F?logo=temporal&logoColor=white)
![Redis](https://img.shields.io/badge/Redis-DC382D?logo=redis&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=white)

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
