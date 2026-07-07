-- Run this once in your Supabase project's SQL Editor
-- (Project → SQL Editor → New query → paste → Run)

create table if not exists contact_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  company text,
  message text not null,
  created_at timestamptz not null default now()
);

alter table contact_submissions enable row level security;

create policy "Allow public inserts on contact_submissions"
  on contact_submissions
  for insert
  to anon
  with check (true);

create table if not exists newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  created_at timestamptz not null default now()
);

alter table newsletter_subscribers enable row level security;

create policy "Allow public inserts on newsletter_subscribers"
  on newsletter_subscribers
  for insert
  to anon
  with check (true);
