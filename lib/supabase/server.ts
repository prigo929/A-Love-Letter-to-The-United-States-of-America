// ─── Supabase Server Client ───────────────────────────────────────────────────
// Use this in Server Components, Server Actions, and Route Handlers.
// NEVER import this in Client Components.

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { Database } from "@/types/database.types";

/**
 * Creates a Supabase client for Server Components.
 * Reads/writes cookies via Next.js `cookies()` API.
 * Call this inside async Server Components or Server Actions.
 */
export async function getSupabaseServerClient() {
  const cookieStore = await cookies();

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // setAll is called from a Server Component — cookies can't be
            // mutated there. The middleware handles session refresh instead.
          }
        },
      },
    },
  );
}

/**
 * Creates a Supabase admin client using the service role key.
 * Use ONLY in secure server-side contexts (Server Actions, API routes).
 * NEVER expose the service role key to the browser.
 */
export function getSupabaseAdminClient() {
  const { createClient } = require("@supabase/supabase-js");

  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    },
  );
}
