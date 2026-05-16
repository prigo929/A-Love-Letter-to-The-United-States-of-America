-- ─── USA Patriot Site — Supabase Schema ─────────────────────────────────────
-- Run this in your Supabase SQL Editor (Dashboard → SQL Editor → New Query)
-- Project: https://app.supabase.com

-- ── Enable UUID extension ─────────────────────────────────────────────────────
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ── Newsletter subscribers ────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS subscribers (
  id         UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email      TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  source     TEXT
);

-- Index on email for fast uniqueness checks
CREATE INDEX IF NOT EXISTS subscribers_email_idx ON subscribers (email);

-- Row Level Security (allow anonymous inserts, no reads from client)
ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous insert" ON subscribers
  FOR INSERT TO anon
  WITH CHECK (true);

-- ── Gallery images ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS gallery_images (
  id           UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  src          TEXT NOT NULL,
  alt          TEXT NOT NULL,
  caption      TEXT,
  category     TEXT NOT NULL,
  location     TEXT,
  photographer TEXT,
  width        INTEGER,
  height       INTEGER,
  created_at   TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS gallery_images_category_idx ON gallery_images (category);

ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read" ON gallery_images FOR SELECT TO anon USING (true);

-- ── Timeline events ───────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS timeline_events (
  id                 UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  year               INTEGER NOT NULL,
  title              TEXT NOT NULL,
  description        TEXT NOT NULL,
  category           TEXT NOT NULL,
  image_src          TEXT,
  significance_level INTEGER DEFAULT 1 CHECK (significance_level BETWEEN 1 AND 5),
  created_at         TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS timeline_events_year_idx      ON timeline_events (year);
CREATE INDEX IF NOT EXISTS timeline_events_category_idx  ON timeline_events (category);

ALTER TABLE timeline_events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read" ON timeline_events FOR SELECT TO anon USING (true);

-- ── Chart data ────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS chart_data (
  id         UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  chart_id   TEXT NOT NULL,
  country    TEXT NOT NULL,
  metric     TEXT NOT NULL,
  value      NUMERIC NOT NULL,
  unit       TEXT,
  year       INTEGER,
  source     TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS chart_data_chart_id_idx ON chart_data (chart_id);

ALTER TABLE chart_data ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read" ON chart_data FOR SELECT TO anon USING (true);

-- ── Inventions ────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS inventions (
  id            UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name          TEXT NOT NULL,
  year          INTEGER NOT NULL,
  inventor      TEXT NOT NULL,
  description   TEXT NOT NULL,
  category      TEXT NOT NULL,
  image_src     TEXT,
  impact_rating INTEGER DEFAULT 5 CHECK (impact_rating BETWEEN 1 AND 10),
  wikipedia_url TEXT,
  created_at    TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS inventions_year_idx      ON inventions (year);
CREATE INDEX IF NOT EXISTS inventions_category_idx  ON inventions (category);

ALTER TABLE inventions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read" ON inventions FOR SELECT TO anon USING (true);

-- ── Page visits (lightweight analytics) ──────────────────────────────────────
CREATE TABLE IF NOT EXISTS page_visits (
  id         UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  page       TEXT NOT NULL,
  visited_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS page_visits_page_idx       ON page_visits (page);
CREATE INDEX IF NOT EXISTS page_visits_visited_at_idx ON page_visits (visited_at DESC);

ALTER TABLE page_visits ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous insert" ON page_visits
  FOR INSERT TO anon
  WITH CHECK (true);

-- ── Quiz questions ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS quiz_questions (
  id             UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  question       TEXT NOT NULL,
  options        JSONB NOT NULL,  -- Array of 4 strings
  correct_answer INTEGER NOT NULL CHECK (correct_answer BETWEEN 0 AND 3),
  explanation    TEXT,
  category       TEXT NOT NULL,
  difficulty     TEXT DEFAULT 'medium' CHECK (difficulty IN ('easy', 'medium', 'hard'))
);

ALTER TABLE quiz_questions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read" ON quiz_questions FOR SELECT TO anon USING (true);

-- ── Seed: sample quiz questions ───────────────────────────────────────────────
INSERT INTO quiz_questions (question, options, correct_answer, explanation, category, difficulty)
VALUES
  (
    'What year was the United States Constitution ratified?',
    '["1776", "1783", "1787", "1789"]',
    2,
    'The Constitution was drafted in 1787 at the Philadelphia Convention and ratified by the required nine states in 1788, taking effect in 1789.',
    'constitution',
    'easy'
  ),
  (
    'Which American invention changed global communication in 1876?',
    '["The Radio", "The Telegraph", "The Telephone", "The Internet"]',
    2,
    'Alexander Graham Bell patented the telephone in 1876, revolutionizing human communication worldwide.',
    'inventions',
    'easy'
  ),
  (
    'Approximately what percentage of global VC investment flows to the United States?',
    '["20%", "35%", "50%", "75%"]',
    2,
    'The US receives approximately 50% of all global venture capital investment, cementing Silicon Valley as the world''s innovation capital.',
    'economy',
    'medium'
  );
