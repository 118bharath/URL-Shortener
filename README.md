# node-url-shortener

A simple, beginner-friendly URL shortener built with **Node.js**, **Express**, and **MongoDB**.  
Made while learning backend development fundamentals — routing, request validation, database CRUD, and basic testing.

## Features
- Create short URLs for long links
- Redirect short URLs to the original link
- View details / analytics for a short link (click count, original URL)
- Basic input validation and error handling
- Docker-friendly and ready for small deployments

## Tech stack
- Node.js + Express
- MongoDB (Mongoose)
- Short ID generation: `nanoid` (or `shortid`)
- Environment management: `dotenv`
- Optional: Docker + `docker-compose`

## Why this project?
This project is designed as a hands-on learning exercise to:
1. Get comfortable with Express routing and middleware.
2. Learn to model data with Mongoose and persist data in MongoDB.
3. Understand URL redirection, HTTP status codes, and basic analytics.
4. Practice building a public API and simple frontend (optional).

## Quick start
1. Clone the repo
```bash
git clone https://github.com/<your-username>/node-url-shortener.git
cd node-url-shortener
