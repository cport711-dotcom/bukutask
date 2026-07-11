# BukuTask Next.js + Supabase

This is the real BukuTask website foundation.

## Included
- Next.js mobile-friendly website
- Supabase email signup/login
- Google and Facebook OAuth buttons
- Live public job listings
- Authenticated job posting
- 2-post rolling 24-hour free limit
- User dashboard
- Netlify configuration

## Netlify environment variables
Add:
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY
- NEXT_PUBLIC_SITE_URL=https://bukutask.com

Never add a service-role key to GitHub or browser code.

## Supabase Auth URLs
Set:
- Site URL: https://bukutask.com
- Redirect URL: https://bukutask.com/auth/callback

Google and Facebook login buttons require provider credentials in Supabase before they become active.
