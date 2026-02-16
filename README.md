# 🌍 Travel Guide CLI

A command-line travel guide built with **TypeScript** as a collaborative school project.

## Team

- Mina – Destination Service
- Lo – Itinerary Engine
- Rut – Budget Manager

## Tech Stack

- Node.js
- TypeScript
- ESLint

---

# Getting Started

## 1. Install dependencies

```bash
npm install
```

## 2. Build the project

```bash
npm run build
```

## 3. Run the CLI

```bash
npm start
```

You should see:

```
🌍 Travel Guide CLI starting...
Type --help to see available commands.
```

---

# Development

### Watch mode (auto-compile)

```bash
npm run dev
```

### Lint the code

```bash
npm run lint
```

### Fix lint issues automatically

```bash
npm run lint:fix
```

---

# Git Workflow

Steps:

```bash
git checkout main
git pull
git checkout -b feature/<name>-<task>
```

Open a **Pull Request** to merge into `main`.

---

# Project Structure

- **index.ts**
  Entry point of the application.
  Starts the CLI menu, **no logic**.

---

## `cli/` — Command Line Interface

Handles **all interaction with the user** in the terminal.

- **cli.ts**
  Contains the main menu loop.
  Displays options and routes user choices.

- **handlers.ts**
  Contains functions that respond to menu actions
  (e.g., create trip, add activity, view budget).

---

## `models/` — Data definitions

Defines the **TypeScript types** used across the app.
No logic is stored here, only data structures.

- **trip.ts**
  Describes the shape of a **Trip**, including destination, start date, and activities.

- **activity.ts**
  Describes the shape of an **Activity**, including name, cost, category, and start time.

These models ensure **strict typing**.

---

## `services/` — Business logic

Contains the core functionality.

- **destination.ts**
  Fetches country information (currency, flag) from an external API.

- **itinerary.ts**
  Manages trips and activities:
  - create trips
  - add activities
  - filter by category
  - sort chronologically

- **budget.ts**
  Calculates total trip cost and identifies high-cost activities.

---

## Summary

```
CLI → Services → Models → Data
```

- **CLI** talks to the user
- **Services** perform the logic
- **Models** define the data structure

This separation improves **readability, teamwork, and maintainability**.
