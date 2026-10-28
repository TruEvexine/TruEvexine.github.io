# Rogelio Emmanuel Ceja — Portfolio

Personal portfolio of a Systems Engineering student at UVAQ who builds websites and narrative games.

**Live:** https://rogelioemmanuel.com

- **Pages:** Home, Profile (tech stack + education), Projects, SIN GUARDAR and Project Miralta case studies, Contact, 404
- **Stack:** HTML, CSS and vanilla JavaScript, with no build step
- **Languages:** English at `/`, Spanish at `/es/` (texts live in `layout.js`; `npm run build:es` regenerates `es/` and `npm run verify` fails if it is stale)

Run locally with `npx wrangler dev` (it serves the site like Cloudflare does, with clean URLs such as `/cotizar`; header and footer are loaded with `fetch`, so a local server is required).

Tech logos in `assets/icons` come from [Devicon](https://devicon.dev) (MIT); UI icons in `assets/ui` from [Simple Icons](https://simpleicons.org) (CC0). Dev notes live in `_dev/` (not published).
