# Veya V1 Architecture

## Objective
Establish a lightweight foundation for the Veya link-in-bio MVP while keeping the system extensible for later campaigns, audience, commerce and intelligence capabilities.

## Application
- Next.js App Router
- TypeScript
- Tailwind CSS
- shadcn/ui where useful
- Public profile pages optimized for mobile and fast rendering
- Authenticated dashboard/editor separated from public profile rendering

## Initial route model
- `/` — product landing page
- `/login` — authentication
- `/signup` — registration
- `/dashboard` — authenticated editor/dashboard
- `/dashboard/profile` — profile management
- `/dashboard/links` — link management
- `/dashboard/appearance` — theme/appearance
- `/dashboard/analytics` — basic analytics
- `/dashboard/settings` — account/settings
- `/@username` — public profile

The development hostname is environment configuration. Do not hard-code `linkbio.okeldijital.africa` into application logic.

## Domain model
- User — authentication/account identity
- Profile — public identity and presentation settings
- Link — ordered destination belonging to a Profile
- SocialLink — social destination belonging to a Profile
- Theme — presentation configuration
- AnalyticsEvent — anonymous profile/link interaction event

## Design constraints
1. Keep V1 concepts small and understandable.
2. Public pages should not depend on the dashboard runtime for basic rendering.
3. Keep profile ownership explicit so multi-user expansion is safe.
4. Keep analytics decoupled from UI components.
5. Avoid introducing future domain concepts until they support a shipped feature.

## Future extensibility
The architecture should be able to evolve toward Profile -> Pages, Actions, Campaigns, Audience and Commerce without requiring a rewrite. These are not V1 UI concepts.

## Deployment
Initial development/staging target: `linkbio.okeldijital.africa` on Vercel.
Production domain will be selected after V1 validation.
