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
      article_categories: {
        Row: {
          article_id: string
          category_id: string
        }
        Insert: {
          article_id: string
          category_id: string
        }
        Update: {
          article_id?: string
          category_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "article_categories_article_id_fkey"
            columns: ["article_id"]
            isOneToOne: false
            referencedRelation: "articles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "article_categories_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      article_tags: {
        Row: {
          article_id: string
          tag_id: string
        }
        Insert: {
          article_id: string
          tag_id: string
        }
        Update: {
          article_id?: string
          tag_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "article_tags_article_id_fkey"
            columns: ["article_id"]
            isOneToOne: false
            referencedRelation: "articles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "article_tags_tag_id_fkey"
            columns: ["tag_id"]
            isOneToOne: false
            referencedRelation: "tags"
            referencedColumns: ["id"]
          },
        ]
      }
      articles: {
        Row: {
          author_id: string | null
          content: Json
          cover_image: string | null
          created_at: string
          excerpt: string | null
          featured: boolean | null
          id: string
          read_time: string | null
          slug: string
          status: string
          title: string
          updated_at: string
          youtube_id: string | null
        }
        Insert: {
          author_id?: string | null
          content?: Json
          cover_image?: string | null
          created_at?: string
          excerpt?: string | null
          featured?: boolean | null
          id?: string
          read_time?: string | null
          slug: string
          status?: string
          title: string
          updated_at?: string
          youtube_id?: string | null
        }
        Update: {
          author_id?: string | null
          content?: Json
          cover_image?: string | null
          created_at?: string
          excerpt?: string | null
          featured?: boolean | null
          id?: string
          read_time?: string | null
          slug?: string
          status?: string
          title?: string
          updated_at?: string
          youtube_id?: string | null
        }
        Relationships: []
      }
      categories: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
          slug: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
          slug: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          slug?: string
        }
        Relationships: []
      }
      comments: {
        Row: {
          article_id: string | null
          created_at: string
          id: string
          parent_id: string | null
          post_id: string | null
          text: string
          updated_at: string
          user_id: string
        }
        Insert: {
          article_id?: string | null
          created_at?: string
          id?: string
          parent_id?: string | null
          post_id?: string | null
          text: string
          updated_at?: string
          user_id: string
        }
        Update: {
          article_id?: string | null
          created_at?: string
          id?: string
          parent_id?: string | null
          post_id?: string | null
          text?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "comments_article_id_fkey"
            columns: ["article_id"]
            isOneToOne: false
            referencedRelation: "articles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comments_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "comments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comments_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
        ]
      }
      course_modules: {
        Row: {
          course_id: string
          created_at: string
          description: string | null
          id: string
          sort_order: number
          title: string
        }
        Insert: {
          course_id: string
          created_at?: string
          description?: string | null
          id?: string
          sort_order?: number
          title: string
        }
        Update: {
          course_id?: string
          created_at?: string
          description?: string | null
          id?: string
          sort_order?: number
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "course_modules_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      course_tags: {
        Row: {
          course_id: string
          tag_id: string
        }
        Insert: {
          course_id: string
          tag_id: string
        }
        Update: {
          course_id?: string
          tag_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "course_tags_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "course_tags_tag_id_fkey"
            columns: ["tag_id"]
            isOneToOne: false
            referencedRelation: "tags"
            referencedColumns: ["id"]
          },
        ]
      }
      courses: {
        Row: {
          cover_image: string | null
          created_at: string
          description: string | null
          id: string
          price: number | null
          slug: string
          status: string
          title: string
          updated_at: string
        }
        Insert: {
          cover_image?: string | null
          created_at?: string
          description?: string | null
          id?: string
          price?: number | null
          slug: string
          status?: string
          title: string
          updated_at?: string
        }
        Update: {
          cover_image?: string | null
          created_at?: string
          description?: string | null
          id?: string
          price?: number | null
          slug?: string
          status?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      event_registrations: {
        Row: {
          created_at: string
          email: string
          event_id: string
          experience_level: string | null
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          email: string
          event_id: string
          experience_level?: string | null
          id?: string
          name: string
        }
        Update: {
          created_at?: string
          email?: string
          event_id?: string
          experience_level?: string | null
          id?: string
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "event_registrations_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
      events: {
        Row: {
          cover_image: string | null
          created_at: string
          description: string | null
          duration: string | null
          event_date: string
          id: string
          slug: string
          speaker_name: string | null
          speaker_title: string | null
          title: string
          updated_at: string
        }
        Insert: {
          cover_image?: string | null
          created_at?: string
          description?: string | null
          duration?: string | null
          event_date: string
          id?: string
          slug: string
          speaker_name?: string | null
          speaker_title?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          cover_image?: string | null
          created_at?: string
          description?: string | null
          duration?: string | null
          event_date?: string
          id?: string
          slug?: string
          speaker_name?: string | null
          speaker_title?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      inquiries: {
        Row: {
          created_at: string
          email: string
          id: string
          message: string
          name: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          message: string
          name: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          message?: string
          name?: string
        }
        Relationships: []
      }
      learning_path_tutorials: {
        Row: {
          article_id: string
          created_at: string
          duration: string | null
          id: string
          learning_path_id: string
          order_index: number
        }
        Insert: {
          article_id: string
          created_at?: string
          duration?: string | null
          id?: string
          learning_path_id: string
          order_index?: number
        }
        Update: {
          article_id?: string
          created_at?: string
          duration?: string | null
          id?: string
          learning_path_id?: string
          order_index?: number
        }
        Relationships: [
          {
            foreignKeyName: "learning_path_tutorials_article_id_fkey"
            columns: ["article_id"]
            isOneToOne: false
            referencedRelation: "articles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "learning_path_tutorials_learning_path_id_fkey"
            columns: ["learning_path_id"]
            isOneToOne: false
            referencedRelation: "learning_paths"
            referencedColumns: ["id"]
          },
        ]
      }
      learning_paths: {
        Row: {
          created_at: string
          description: string | null
          id: string
          intro_video_id: string | null
          level: string
          slug: string
          tags: string[] | null
          thumbnail_url: string | null
          title: string
          updated_at: string
          what_you_learn: string[] | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          intro_video_id?: string | null
          level?: string
          slug: string
          tags?: string[] | null
          thumbnail_url?: string | null
          title: string
          updated_at?: string
          what_you_learn?: string[] | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          intro_video_id?: string | null
          level?: string
          slug?: string
          tags?: string[] | null
          thumbnail_url?: string | null
          title?: string
          updated_at?: string
          what_you_learn?: string[] | null
        }
        Relationships: []
      }
      newsletter: {
        Row: {
          created_at: string
          email: string
          id: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
        }
        Relationships: []
      }
      post_tags: {
        Row: {
          post_id: string
          tag_id: string
        }
        Insert: {
          post_id: string
          tag_id: string
        }
        Update: {
          post_id?: string
          tag_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "post_tags_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_tags_tag_id_fkey"
            columns: ["tag_id"]
            isOneToOne: false
            referencedRelation: "tags"
            referencedColumns: ["id"]
          },
        ]
      }
      posts: {
        Row: {
          author_id: string | null
          content: Json
          created_at: string
          headline: string
          id: string
          preview: string | null
          updated_at: string
          youtube_id: string | null
        }
        Insert: {
          author_id?: string | null
          content?: Json
          created_at?: string
          headline: string
          id?: string
          preview?: string | null
          updated_at?: string
          youtube_id?: string | null
        }
        Update: {
          author_id?: string | null
          content?: Json
          created_at?: string
          headline?: string
          id?: string
          preview?: string | null
          updated_at?: string
          youtube_id?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string
          id: string
          name: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          id?: string
          name?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          id?: string
          name?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      reactions: {
        Row: {
          article_id: string | null
          created_at: string
          id: string
          post_id: string | null
          type: string
          user_id: string
        }
        Insert: {
          article_id?: string | null
          created_at?: string
          id?: string
          post_id?: string | null
          type: string
          user_id: string
        }
        Update: {
          article_id?: string | null
          created_at?: string
          id?: string
          post_id?: string | null
          type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "reactions_article_id_fkey"
            columns: ["article_id"]
            isOneToOne: false
            referencedRelation: "articles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reactions_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
        ]
      }
      tags: {
        Row: {
          created_at: string
          id: string
          name: string
          slug: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          slug: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          slug?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      videos: {
        Row: {
          article_id: string | null
          created_at: string
          id: string
          thumbnail: string | null
          title: string
          youtube_url: string
        }
        Insert: {
          article_id?: string | null
          created_at?: string
          id?: string
          thumbnail?: string | null
          title: string
          youtube_url: string
        }
        Update: {
          article_id?: string | null
          created_at?: string
          id?: string
          thumbnail?: string | null
          title?: string
          youtube_url?: string
        }
        Relationships: [
          {
            foreignKeyName: "videos_article_id_fkey"
            columns: ["article_id"]
            isOneToOne: false
            referencedRelation: "articles"
            referencedColumns: ["id"]
          },
        ]
      }
      waitlist: {
        Row: {
          created_at: string
          email: string
          id: string
          interest: string | null
          name: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          interest?: string | null
          name: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          interest?: string | null
          name?: string
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
      app_role: "admin" | "moderator" | "user"
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
      app_role: ["admin", "moderator", "user"],
    },
  },
} as const
