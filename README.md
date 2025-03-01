# MSA Backend

This project is a microservice-based backend that provides data for nearby pizza and juice shops using the Google Places API. It offers both RESTful and GraphQL endpoints and includes Docker support for easy deployment.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Setup and Installation](#setup-and-installation)
- [Environment Variables](#environment-variables)
- [Running the Application Locally](#running-the-application-locally)
- [Running Tests](#running-tests)
- [Docker Support](#docker-support)
- [API Endpoints](#api-endpoints)

## Features

- **RESTful API Endpoints:**
  - `/search/pizza` – Lists nearby pizza places.
  - `/search/juice` – Lists nearby juice shops.
  - `/search/combo` – Lists places offering both pizza and juice.
- **GraphQL API:**
  - Queries: `searchPizza`, `searchJuice`, and `searchCombo` (all accepting an optional `location` argument).
- **Google Places API Integration:**  
  Fetches real-time data based on the user's location.
- **Geocoding Utility:**  
  Converts text locations (e.g., "New York") into coordinates.
- **Rate Limiting:**  
  Protects endpoints from abuse.
- **Testing:**  
  Unit and integration tests using Jest (and Supertest for integration tests).
- **Docker Support:**  
  Provides a Dockerfile and docker-compose.yml for containerization.

## Tech Stack

- **Backend:** Node.js, Express, Apollo Server
- **GraphQL:** Apollo Server, GraphQL
- **HTTP Client:** Axios
- **Testing:** Jest, Supertest
- **Containerization:** Docker, Docker Compose
- **Environment Management:** dotenv

## Setup and Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/msa-backend.git
   cd MSA-BACKEND/backend

   ```

2. **Install dependencies:**

```bash
npm install
```

3. **Configure Environment Variables:**

PORT=5000
GOOGLE_API_KEY=your_google_api_key
PLACES_BASE_URL=https://maps.googleapis.com/maps/api/place/nearbysearch/json
GEOCODING_BASE_URL = https://maps.googleapis.com/maps/api/geocode/json

## Running the Application Locally

```bash
npm run dev
```

## Running Tests

```bash
npm test
```

## Docker Support

1. **Clone the repository:**

   Build the Docker image:

Navigate to the project root (where your Dockerfile and docker-compose.yml are located) and run:

```bash
docker-compose build
```

2. **Run the Container:**

```bash
docker-compose up
```

Your application will be running at http://localhost:5000.

## API Endpoints

1. **REST API**
   GET /search/pizza : Returns a list of pizza places.
   GET /search/juice : Returns a list of juice shops.
   GET /search/combo : Returns places that offer both pizza and juice.
2. **GraphQL Endpoint**
   Send GraphQL queries to http://localhost:5000/graphql.
   Example query:
   ```bash
   {
   searchPizza(location: "New York") {
    name
    address
    rating
    phone
   }
   }
   ```
