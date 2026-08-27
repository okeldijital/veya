# Veya V1 Product Specification

## Product

**Veya** — lightweight link-in-bio platform by Okel Dijital.

## Development

- Development/staging: `https://linkbio.okeldijital.africa`
- Production domain: to be selected after validation

## Goal

Enable a new user to create and publish a useful, attractive link-in-bio page in under five minutes.

## Principles

1. Simplicity first.
2. Strong defaults.
3. Fast to publish.
4. Mobile first.
5. Progressive complexity.
6. Public pages should be fast and lightweight.
7. Do not expose advanced product concepts before they are needed.

## V1 capabilities

### Account
- Sign up
- Log in
- Log out
- Password reset
- Session management

### Profile
- Unique username
- Display name
- Profile photo
- Short bio
- Draft/published/unpublished state

### Links
- Add
- Edit
- Delete
- Enable/disable
- Reorder
- Optional icon/thumbnail

### Socials
- Instagram
- TikTok
- YouTube
- Facebook
- X
- LinkedIn
- Spotify
- Apple Music
- SoundCloud

### Appearance
- Theme presets
- Background
- Text appearance
- Button appearance
- Button shape
- Profile alignment

### Preview
- Live mobile preview
- Desktop preview
- Preview should closely represent the public page

### Public page
- Responsive
- Accessible without authentication
- Fast-loading
- Active links only
- Social links
- Selected theme
- Basic analytics events

### Analytics
- Views
- Link clicks
- CTR
- Today / 7 days / 30 days / all time
- Top links

### QR and sharing
- Generate profile QR code
- Download QR code
- Copy profile URL
- Open public profile
- Browser/device share where supported

## V1 non-goals

Campaigns, multiple pages, email marketing, CRM, audience management, payments, bookings, donations, digital products, EPKs, A/B testing, AI optimisation, advanced analytics, teams, custom domains, API and integrations marketplace.

## Core entities

- User
- Profile
- Link
- SocialLink
- Theme
- AnalyticsEvent

The model should remain extensible so future pages, actions, campaigns, audience and commerce can be introduced without changing the fundamental identity model.

## Acceptance standard

V1 is complete when a first-time user can create an account, claim a username, create a profile, add and reorder links, choose an appearance, preview, publish, open the public page on mobile, share it, view basic analytics and generate a QR code without technical knowledge or documentation.
