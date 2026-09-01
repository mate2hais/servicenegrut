export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      classes: {
        Row: {
          age_group: Database["public"]["Enums"]["age_group"]
          coach_id: string | null
          created_at: string
          day_of_week: number
          discipline: Database["public"]["Enums"]["discipline"]
          end_time: string
          id: string
          level: string
          room: string | null
          start_time: string
          title: string
          updated_at: string
        }
        Insert: {
          age_group: Database["public"]["Enums"]["age_group"]
          coach_id?: string | null
          created_at?: string
          day_of_week: number
          discipline: Database["public"]["Enums"]["discipline"]
          end_time: string
          id?: string
          level?: string
          room?: string | null
          start_time: string
          title: string
          updated_at?: string
        }
        Update: {
          age_group?: Database["public"]["Enums"]["age_group"]
          coach_id?: string | null
          created_at?: string
          day_of_week?: number
          discipline?: Database["public"]["Enums"]["discipline"]
          end_time?: string
          id?: string
          level?: string
          room?: string | null
          start_time?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "classes_coach_id_fkey"
            columns: ["coach_id"]
            isOneToOne: false
            referencedRelation: "coaches"
            referencedColumns: ["id"]
          },
        ]
      }
      coaches: {
        Row: {
          bio: string | null
          created_at: string
          disciplines: Database["public"]["Enums"]["discipline"][]
          full_name: string
          id: string
          photo_url: string | null
          rank: string | null
          sort_order: number
          title: string
          updated_at: string
          years_experience: number
        }
        Insert: {
          bio?: string | null
          created_at?: string
          disciplines?: Database["public"]["Enums"]["discipline"][]
          full_name: string
          id?: string
          photo_url?: string | null
          rank?: string | null
          sort_order?: number
          title: string
          updated_at?: string
          years_experience?: number
        }
        Update: {
          bio?: string | null
          created_at?: string
          disciplines?: Database["public"]["Enums"]["discipline"][]
          full_name?: string
          id?: string
          photo_url?: string | null
          rank?: string | null
          sort_order?: number
          title?: string
          updated_at?: string
          years_experience?: number
        }
        Relationships: []
      }
      competitions: {
        Row: {
          approved: boolean
          city: string | null
          country: string
          created_at: string
          description: string | null
          discipline: Database["public"]["Enums"]["discipline"]
          end_date: string | null
          id: string
          organizer: string | null
          scope: Database["public"]["Enums"]["competition_scope"]
          source: string
          start_date: string
          title: string
          updated_at: string
          url: string | null
        }
        Insert: {
          approved?: boolean
          city?: string | null
          country?: string
          created_at?: string
          description?: string | null
          discipline: Database["public"]["Enums"]["discipline"]
          end_date?: string | null
          id?: string
          organizer?: string | null
          scope: Database["public"]["Enums"]["competition_scope"]
          source?: string
          start_date: string
          title: string
          updated_at?: string
          url?: string | null
        }
        Update: {
          approved?: boolean
          city?: string | null
          country?: string
          created_at?: string
          description?: string | null
          discipline?: Database["public"]["Enums"]["discipline"]
          end_date?: string | null
          id?: string
          organizer?: string | null
          scope?: Database["public"]["Enums"]["competition_scope"]
          source?: string
          start_date?: string
          title?: string
          updated_at?: string
          url?: string | null
        }
        Relationships: []
      }
      media_items: {
        Row: {
          age_group: Database["public"]["Enums"]["age_group"] | null
          created_at: string
          description: string | null
          discipline: Database["public"]["Enums"]["discipline"] | null
          id: string
          kind: Database["public"]["Enums"]["media_kind"]
          public_url: string
          session_date: string
          storage_path: string
          title: string | null
          updated_at: string
          uploaded_by: string | null
        }
        Insert: {
          age_group?: Database["public"]["Enums"]["age_group"] | null
          created_at?: string
          description?: string | null
          discipline?: Database["public"]["Enums"]["discipline"] | null
          id?: string
          kind: Database["public"]["Enums"]["media_kind"]
          public_url: string
          session_date?: string
          storage_path: string
          title?: string | null
          updated_at?: string
          uploaded_by?: string | null
        }
        Update: {
          age_group?: Database["public"]["Enums"]["age_group"] | null
          created_at?: string
          description?: string | null
          discipline?: Database["public"]["Enums"]["discipline"] | null
          id?: string
          kind?: Database["public"]["Enums"]["media_kind"]
          public_url?: string
          session_date?: string
          storage_path?: string
          title?: string | null
          updated_at?: string
          uploaded_by?: string | null
        }
        Relationships: []
      }
      membership_plans: {
        Row: {
          active: boolean
          age_group: Database["public"]["Enums"]["age_group"]
          created_at: string
          description: string | null
          discipline: Database["public"]["Enums"]["discipline"]
          duration_days: number
          id: string
          name: string
          price_lei: number
          sessions_per_week: number
          updated_at: string
        }
        Insert: {
          active?: boolean
          age_group: Database["public"]["Enums"]["age_group"]
          created_at?: string
          description?: string | null
          discipline: Database["public"]["Enums"]["discipline"]
          duration_days?: number
          id?: string
          name: string
          price_lei: number
          sessions_per_week?: number
          updated_at?: string
        }
        Update: {
          active?: boolean
          age_group?: Database["public"]["Enums"]["age_group"]
          created_at?: string
          description?: string | null
          discipline?: Database["public"]["Enums"]["discipline"]
          duration_days?: number
          id?: string
          name?: string
          price_lei?: number
          sessions_per_week?: number
          updated_at?: string
        }
        Relationships: []
      }
      memberships: {
        Row: {
          age_group: Database["public"]["Enums"]["age_group"]
          athlete_name: string | null
          created_at: string
          discipline: Database["public"]["Enums"]["discipline"]
          end_date: string
          id: string
          notes: string | null
          plan_id: string | null
          start_date: string
          status: Database["public"]["Enums"]["membership_status"]
          updated_at: string
          user_id: string
        }
        Insert: {
          age_group: Database["public"]["Enums"]["age_group"]
          athlete_name?: string | null
          created_at?: string
          discipline: Database["public"]["Enums"]["discipline"]
          end_date: string
          id?: string
          notes?: string | null
          plan_id?: string | null
          start_date?: string
          status?: Database["public"]["Enums"]["membership_status"]
          updated_at?: string
          user_id: string
        }
        Update: {
          age_group?: Database["public"]["Enums"]["age_group"]
          athlete_name?: string | null
          created_at?: string
          discipline?: Database["public"]["Enums"]["discipline"]
          end_date?: string
          id?: string
          notes?: string | null
          plan_id?: string | null
          start_date?: string
          status?: Database["public"]["Enums"]["membership_status"]
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "memberships_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "membership_plans"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          full_name: string | null
          id: string
          phone: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          full_name?: string | null
          id: string
          phone?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          full_name?: string | null
          id?: string
          phone?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      age_group: "kids" | "adults"
      app_role: "admin" | "member"
      competition_scope: "national" | "europe"
      discipline: "bjj" | "mma"
      media_kind: "photo" | "video"
      membership_status: "active" | "expired" | "cancelled"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      age_group: ["kids", "adults"],
      app_role: ["admin", "member"],
      competition_scope: ["national", "europe"],
      discipline: ["bjj", "mma"],
      media_kind: ["photo", "video"],
      membership_status: ["active", "expired", "cancelled"],
    },
  },
} as const
