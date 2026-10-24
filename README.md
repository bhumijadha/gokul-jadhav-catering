# Gokul Jadhav Catering

A responsive catering website with a browser-based admin prototype for food items, recipe quantities, event planning, shopping lists, cost estimates, and business details.

## Run locally

```sh
npm install
npm run dev
```

Open the local URL printed by Vite. Create food items, then enter your own ingredient quantities per person in **Recipe quantities**. No food quantities are preloaded.

## Demo admin sign-in

- Username: `admin`
- Password: `gokul2026`

This sign-in is for a local prototype only. It is not secure authentication. Before using the dashboard with real customer or business data, connect it to a backend with server-side authentication and authorization.

## Data and calculations

Recipe, event, and business settings are stored in the browser's local storage on the current device. The storage boundary is isolated in `src/lib/storage.ts` so it can later be replaced with a database adapter. Ingredient calculations use scaled integers and convert grams/kilograms and millilitres/litres before combining matching ingredients.

## Production build

```sh
npm run build
npm run preview
```