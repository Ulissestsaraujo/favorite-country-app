# Getting Started with this project

Simply run docker-compose up --build and it should wire everything up.

# Ports

The frontend is available on http://localhost:3000, backend on http://localhost:4000/graphql and pgsql on port 5432

# Database schema

```sql

CREATE TABLE "Users" (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE "FavoriteCountries" (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  country_id VARCHAR(255) NOT NULL,
  notes TEXT,
  CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES "Users"(id) ON DELETE CASCADE ON UPDATE CASCADE
);

```
