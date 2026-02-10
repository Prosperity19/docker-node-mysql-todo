# Dockerized To-Do Application

A simple multi-container To-Do application built to demonstrate **Docker, Docker Compose, and DevOps fundamentals**.

This project runs a complete local environment without installing Node.js or MySQL on the host machine.

---

## 🧱 Architecture

The application consists of three containers:

- **Frontend** – Nginx serving a static HTML To-Do UI
- **Backend** – Node.js (Express) REST API
- **Database** – MySQL with persistent storage

All containers communicate over a custom Docker network.

