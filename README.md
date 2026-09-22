# personal-website

Personal site: intro + portfolio. Content starts as **placeholders**.

## Layout

Single page, top to bottom:

1. Hero (name + one-line positioning)
2. About
3. Portfolio grid
4. Contact

Responsive targets: wide 16:9 (side margins, 2–3 column work grid) and phone (single column, larger spacing, primary CTA near the thumb).

## Edit content

Replace placeholders in [`content.js`](./content.js) — name, bio, highlights, projects, email, and social links live there.

## Run locally

No build step. From this folder:

```bash
python3 -m http.server 4173
```

Open `http://localhost:4173`. (A static server is required because the page loads ES modules.)

## Security notes

- Do not commit `.env`, API keys, or private contact details you do not want public.
- Contact is mailto / social links only for now — no form.
