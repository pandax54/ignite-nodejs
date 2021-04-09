CREATE TABLE "users" (
  "id" SERIAL PRIMARY KEY,
  "first_name" varchar,
  "last_name" varchar,
  "email" varchar,
  "created_at" timestamp,
  "updated_at" timestamp
);

CREATE TABLE "games" (
  "id" SERIAL PRIMARY KEY,
  "title" varchar,
  "created_at" timestamp,
  "updated_at" timestamp
);

CREATE TABLE "users_games_games" (
  "id" SERIAL PRIMARY KEY,
  "userId" int,
  "gameId" int
);

CREATE TABLE "genres" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar,
  "created_at" timestamp,
  "updated_at" timestamp
);

CREATE TABLE "genres_games" (
  "id" SERIAL PRIMARY KEY,
  "genreId" int,
  "gameId" int
);

CREATE TABLE "orders" (
  "id" SERIAL PRIMARY KEY,
  "created_at" timestamp,
  "updated_at" timestamp
);

CREATE TABLE "users_games_orders" (
  "id" SERIAL PRIMARY KEY,
  "users_gameId" int,
  "ordersId" int
);

ALTER TABLE "users_games_games" ADD FOREIGN KEY ("userId") REFERENCES "users" ("id");

ALTER TABLE "users_games_games" ADD FOREIGN KEY ("gameId") REFERENCES "games" ("id");

ALTER TABLE "genres_games" ADD FOREIGN KEY ("genreId") REFERENCES "genres" ("id");

ALTER TABLE "genres_games" ADD FOREIGN KEY ("gameId") REFERENCES "games" ("id");

ALTER TABLE "users_games_orders" ADD FOREIGN KEY ("ordersId") REFERENCES "orders" ("id");

ALTER TABLE "users_games_orders" ADD FOREIGN KEY ("users_gameId") REFERENCES "users_games_games" ("id");
