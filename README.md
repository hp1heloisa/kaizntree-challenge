# Kaizntree Challenge 

This is a full stack inventory management application built as part of the Kaizntree challenge.  
The **back-end** is powered by **Django** (Python), and the **front-end** is built with **Next.js** (React).  
Authentication is handled using `next-auth` with a custom Django token-based login system.

---

## 🧱 Tech Stack

- 🔙 Django (REST API with custom token auth)
- 🔝 Next.js 
- 🔐 NextAuth.js (custom CredentialsProvider)
- 🐋 Docker & Docker Compose
- 💠 Carbon Design System
- 🐘 PostgreSQL

---

## 🚀 Getting Started

### 🔧 1. Clone the repository

```bash
git clone https://github.com/hp1heloisa/kaizntree-challenge
cd kaizntree-challenge
```


### 🐳 2. Run with Docker

```bash
docker-compose up --build
```
This will start:
- Django back-end on http://localhost:8000
- Next.js front-end on http://localhost:3000


## 🛠 Manual Setup (for development)
### 🐍 Back-end (Django)
```bash
cd kaizntree-service-infra
python3 -m venv venv
source venv/bin/activate 
pip install --upgrade pip
pip install -r requirements.txt
```
Create a `.env` file with:
```bash
DB_NAME=
DB_USER=
DB_PASSWORD=
DB_HOST=
DB_PORT=
```
Then migrate the database and start the server:
```bash
python manage.py migrate
python manage.py runserver
```
Access the back-end at http://localhost:8000

### ⚛️ Front-end (Next.js)
```bash
cd kaizntree-web-app 
npm install
```
Create a `.env` file with:
```bash
NEXTAUTH_SECRET=
NEXTAUTH_URL=http://localhost:3000

NEXT_PUBLIC_BACKEND_BASE_URL=http://localhost:8000/api
NEXT_PUBLIC_SIGNUP_ROUTE=/signup
NEXT_PUBLIC_CATEGORY_ROUTE=/categories
NEXT_PUBLIC_ITEMS_ROUTE=/items
```

Start the dev server:
```bash
npm run dev
```
Access the front-end at http://localhost:3000
