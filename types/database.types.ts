// ─── Supabase Database Types ─────────────────────────────────────────────────
// This mirrors the schema defined in the project spec.
// When you run `supabase gen types typescript`, replace this file.

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      // ── Newsletter Subscribers ────────────────────────────────────
      subscribers: {
        Row: {
          id: string
          email: string
          created_at: string
          source: string | null
        }
        Insert: {
          id?: string
          email: string
          created_at?: string
          source?: string | null
        }
        Update: {
          id?: string
          email?: string
          created_at?: string
          source?: string | null
        }
      }

      // ── Gallery Images ────────────────────────────────────────────
      gallery_images: {
        Row: {
          id: string
          src: string
          alt: string
          caption: string | null
          category: string
          location: string | null
          photographer: string | null
          width: number | null
          height: number | null
          created_at: string
        }
        Insert: {
          id?: string
          src: string
          alt: string
          caption?: string | null
          category: string
          location?: string | null
          photographer?: string | null
          width?: number | null
          height?: number | null
          created_at?: string
        }
        Update: Partial<Database['public']['Tables']['gallery_images']['Insert']>
      }

      // ── Timeline Events ───────────────────────────────────────────
      timeline_events: {
        Row: {
          id: string
          year: number
          title: string
          description: string
          category: string
          image_src: string | null
          significance_level: number
          created_at: string
        }
        Insert: {
          id?: string
          year: number
          title: string
          description: string
          category: string
          image_src?: string | null
          significance_level?: number
          created_at?: string
        }
        Update: Partial<Database['public']['Tables']['timeline_events']['Insert']>
      }

      // ── Chart Data ────────────────────────────────────────────────
      chart_data: {
        Row: {
          id: string
          chart_id: string
          country: string
          metric: string
          value: number
          unit: string | null
          year: number | null
          source: string | null
          created_at: string
        }
        Insert: {
          id?: string
          chart_id: string
          country: string
          metric: string
          value: number
          unit?: string | null
          year?: number | null
          source?: string | null
          created_at?: string
        }
        Update: Partial<Database['public']['Tables']['chart_data']['Insert']>
      }

      // ── Inventions ────────────────────────────────────────────────
      inventions: {
        Row: {
          id: string
          name: string
          year: number
          inventor: string
          description: string
          category: string
          image_src: string | null
          impact_rating: number
          wikipedia_url: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          year: number
          inventor: string
          description: string
          category: string
          image_src?: string | null
          impact_rating?: number
          wikipedia_url?: string | null
          created_at?: string
        }
        Update: Partial<Database['public']['Tables']['inventions']['Insert']>
      }

      // ── Page Visits (Analytics) ───────────────────────────────────
      page_visits: {
        Row: {
          id: string
          page: string
          visited_at: string
        }
        Insert: {
          id?: string
          page: string
          visited_at?: string
        }
        Update: Partial<Database['public']['Tables']['page_visits']['Insert']>
      }

      // ── Quiz Questions ────────────────────────────────────────────
      quiz_questions: {
        Row: {
          id: string
          question: string
          options: Json
          correct_answer: number
          explanation: string | null
          category: string
          difficulty: string
        }
        Insert: {
          id?: string
          question: string
          options: Json
          correct_answer: number
          explanation?: string | null
          category: string
          difficulty?: string
        }
        Update: Partial<Database['public']['Tables']['quiz_questions']['Insert']>
      }
    }

    Views: {
      [_ in never]: never
    }

    Functions: {
      [_ in never]: never
    }

    Enums: {
      [_ in never]: never
    }
  }
}

// ─── Convenience Types ────────────────────────────────────────────────────────
export type Subscriber      = Database['public']['Tables']['subscribers']['Row']
export type GalleryImage    = Database['public']['Tables']['gallery_images']['Row']
export type TimelineEvent   = Database['public']['Tables']['timeline_events']['Row']
export type ChartDataPoint  = Database['public']['Tables']['chart_data']['Row']
export type Invention       = Database['public']['Tables']['inventions']['Row']
export type PageVisit       = Database['public']['Tables']['page_visits']['Row']
export type QuizQuestion    = Database['public']['Tables']['quiz_questions']['Row']
