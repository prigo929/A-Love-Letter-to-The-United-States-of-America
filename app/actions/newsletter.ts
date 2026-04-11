"use server";

// ─── Newsletter Server Action ──────────────────────────────────────────────────
// Called from NewsletterSignup.tsx.
// Validates email, inserts into Supabase subscribers table.

import { getSupabaseServerClient } from "@/lib/supabase/server";

interface SubscribeResult {
  success: boolean;
  message: string;
}

export async function subscribeToNewsletter(
  email: string,
): Promise<SubscribeResult> {
  // Basic server-side check (Zod handles client-side)
  if (!email || !email.includes("@")) {
    return { success: false, message: "Invalid email address." };
  }

  try {
    const supabase = await getSupabaseServerClient();

    const { error } = await supabase
      .from("subscribers")
      .insert({
        email: email.toLowerCase().trim(),
        source: "homepage-newsletter",
      });

    if (error) {
      // Duplicate email — Supabase unique constraint
      if (error.code === "23505") {
        return { success: true, message: "You are already subscribed!" };
      }
      console.error("[newsletter] Supabase error:", error);
      return {
        success: false,
        message: "Failed to subscribe. Please try again.",
      };
    }

    return { success: true, message: "Subscribed successfully!" };
  } catch (err) {
    console.error("[newsletter] Unexpected error:", err);
    return { success: false, message: "An unexpected error occurred." };
  }
}
