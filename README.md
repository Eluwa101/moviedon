# Moviedon

Moviedon is a responsive, open-source movie and TV discovery app powered by The Movie Database (TMDB). Browse popular titles, trailers, genres, performers, and companies, then keep a local watchlist and continue-watching history.

## Prerequisites

- Node.js 18 or newer
- npm
- A TMDB API key

## Getting started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a local environment file:

   ```bash
   cp .env.example .env
   ```

3. Set your TMDB API key in `.env`:

   ```env
   REACT_APP_TMDB_API_KEY=your_tmdb_api_key
   ```

4. Start the development server:

   ```bash
   npm start
   ```

## Scripts

- `npm start` — start the development server
- `npm run build` — create a production build
- `npm run lint` — check code quality
- `npm test` — run tests

## Deployment

Run `npm run build` and deploy the contents of the generated `build/` directory. The included `public/.htaccess` provides history fallback for Apache hosts.

## Notes

- TMDB attribution and usage must comply with [TMDB’s terms](https://www.themoviedb.org/terms-of-use).
- API keys supplied through `REACT_APP_*` variables are included in the client build. Use a TMDB key intended for client-side usage and apply TMDB-side restrictions where available.

## License

MIT
