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
CLI → Services → Models
```

- **CLI** talks to the user
- **Services** perform the logic
- **Models** define the data structure

## Destination Service — fetches country data from an API

1. **Create your branch**

- Make sure you’re on `main` and up to date, then create a branch for your role.

2. **Work only in your area**

- Only touch the “destination service” file(s). Don’t edit itinerary or budget logic.

3. **Decide the input + output**

- Input: a country name (string)
- Output: a clean object your app understands (example: `{ currency, flag }`)
- Don’t return the raw API response shape.

4. **Implement the fetch flow (async/await)**

- Send request to the country API
- Parse response
- Extract the fields you need (currency, flag)
- Wrap in `try/catch` and produce a friendly error when it fails

5. **Prove it works**

- Test with a few country names (normal, typo, not found)
- Make sure failures don’t crash the whole app unexpectedly

6. **Quality check**

- Run the project checks (types + lint) before pushing.

7. **Push and open PR**

- Push your branch and open a pull request into `main`
- In the PR description: what your function returns + how to use it

---

## Itinerary Engine (your role) — manages trips and activities

1. **Create your branch**

- Update `main`, then create a branch for itinerary.

2. **Lock down the data shapes first**

- Confirm what a **Trip** contains (destination, start date, list of activities)
- Confirm what an **Activity** contains (name, cost, category, time)
- These definitions must be consistent because budget + CLI depend on them.

3. **Decide how trips are stored**

- For a school project, start with **in-memory storage** (a list of trips).
- Keep storage internal to the itinerary module so the rest of the app doesn’t care how it’s stored.

4. **Expose a small public API (functions)**
   Implement your features as operations the CLI can call:

- create a trip
- add an activity to a trip
- list trips
- view activities for a given day
- filter activities by category
- sort activities chronologically

5. **Make sure you visibly use the required array methods**

- `.filter()` for category/day views
- `.sort()` for chronological ordering

6. **Handle “not found” cases cleanly**

- Trip ID doesn’t exist
- No activities yet
- Invalid day/category input  
  Return a clear result or error message instead of crashing.

7. **Quality check**

- Run type check + lint.

8. **Push and open PR**

- Push your branch and open PR into `main`.
- In PR description: list the operations you provide and expected inputs/outputs.

---

## Budget Manager — tracks expenses and calculates totals

1. **Create your branch**

- Update `main`, then create a branch for budget.

2. **Work only in your area**

- Only touch the budget service file(s).
- Don’t implement trip creation or API fetching.

3. **Decide what you consume**

- Budget should consume simple data:
  - usually an `Activity[]` (activities list)
  - or a `Trip` (using `trip.activities`)
- Keep it pure: budget shouldn’t ask the user questions.

4. **Implement the required calculations**

- Total trip cost → use `.reduce()`
- High-cost activities above a threshold → use `.filter()`
- Optional (good for grade): totals per category using `.reduce()`

5. **Define clear outputs**
   Return simple summaries like:

- a number total
- a list of expensive activities
- a category totals object

6. **Test with different cases**

- empty activities list
- many small costs
- one big cost above threshold
- mix of categories

7. **Quality check**

- Run type check + lint.

8. **Push and open PR**

- Push your branch and open PR into `main`.
- In PR description: what functions exist + example of what they return.
