"use client";

// ─── Supabase Browser Client ──────────────────────────────────────────────────
// Use this in Client Components (marked 'use client').
// Import from here — never call createBrowserClient() inline.

import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "@/types/database.types";

let client: ReturnType<typeof createBrowserClient<Database>> | null = null;

/**
 * Returns a singleton Supabase client for use in Client Components.
 * The singleton pattern prevents multiple GoTrue auth instances
 * from being created on client-side route changes.
 */
export function getSupabaseBrowserClient() {
  if (client) return client;

  client = createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );

  return client;
}
