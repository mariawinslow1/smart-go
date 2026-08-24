# REVIEW LAB — instructions for coding agents

## Product goal
This is a Russian-language marketing site for a customer-review analysis service. The site should feel like a small, credible analytics brand rather than a generic freelancer landing page.

## Non-negotiable product rules
- Keep all user-facing business copy in Russian unless explicitly asked otherwise.
- All prices and financial examples shown to the owner must be in Russian rubles (₽).
- Never fabricate real clients, testimonials, revenue lifts, or business outcomes.
- Synthetic examples must remain clearly marked as `DEMO` / `СИНТЕТИЧЕСКИЕ ДАННЫЕ`.
- Never claim that the service can prove a specific review was purchased based only on text. Use language about data quality, low informativeness, unusual patterns, or signals requiring verification.
- Primary conversion goal: free mini-audit request.
- Primary navigation must remain multi-page: Home, Method, Cases, Free Audit.

## Tech
- React + Vite + React Router.
- Keep the site lightweight and responsive.
- Netlify deployment is supported through `netlify.toml` and `public/_redirects`.
- The free-audit form is prepared for Netlify Forms.

## Before changing structure
Preserve the existing positioning and conversion flow unless the owner explicitly asks to change them.
