export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      OrganizationAdmins: {
        Row: {
          createdAt: string
          id: string
          organizationId: string
          profileId: string
        }
        Insert: {
          createdAt?: string
          id?: string
          organizationId: string
          profileId: string
        }
        Update: {
          createdAt?: string
          id?: string
          organizationId?: string
          profileId?: string
        }
        Relationships: [
          {
            foreignKeyName: "OrganizationAdmins_organizationId_fkey"
            columns: ["organizationId"]
            isOneToOne: false
            referencedRelation: "Organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "OrganizationAdmins_profileId_fkey"
            columns: ["profileId"]
            isOneToOne: false
            referencedRelation: "Profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      OrganizationMembers: {
        Row: {
          createdAt: string
          id: string
          organizationId: string
          profileId: string
        }
        Insert: {
          createdAt?: string
          id?: string
          organizationId: string
          profileId: string
        }
        Update: {
          createdAt?: string
          id?: string
          organizationId?: string
          profileId?: string
        }
        Relationships: [
          {
            foreignKeyName: "OrganizationMembers_organizationId_fkey"
            columns: ["organizationId"]
            isOneToOne: false
            referencedRelation: "Organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "OrganizationMembers_profileId_fkey"
            columns: ["profileId"]
            isOneToOne: false
            referencedRelation: "Profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      Organizations: {
        Row: {
          createdAt: string
          description: string | null
          id: string
          name: string
          ownerId: string
          slug: string
        }
        Insert: {
          createdAt?: string
          description?: string | null
          id?: string
          name: string
          ownerId: string
          slug: string
        }
        Update: {
          createdAt?: string
          description?: string | null
          id?: string
          name?: string
          ownerId?: string
          slug?: string
        }
        Relationships: [
          {
            foreignKeyName: "Organization_ownerId_fkey"
            columns: ["ownerId"]
            isOneToOne: false
            referencedRelation: "Profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      Profiles: {
        Row: {
          createdAt: string
          firstName: string
          id: string
          lastName: string
          userId: string
          username: string
        }
        Insert: {
          createdAt?: string
          firstName: string
          id?: string
          lastName: string
          userId: string
          username: string
        }
        Update: {
          createdAt?: string
          firstName?: string
          id?: string
          lastName?: string
          userId?: string
          username?: string
        }
        Relationships: []
      }
      ProjectManagers: {
        Row: {
          createdAt: string
          id: string
          profileId: string
          projectId: string
        }
        Insert: {
          createdAt?: string
          id?: string
          profileId: string
          projectId: string
        }
        Update: {
          createdAt?: string
          id?: string
          profileId?: string
          projectId?: string
        }
        Relationships: [
          {
            foreignKeyName: "ProjectManagers_profileId_fkey"
            columns: ["profileId"]
            isOneToOne: false
            referencedRelation: "Profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ProjectManagers_projectId_fkey"
            columns: ["projectId"]
            isOneToOne: false
            referencedRelation: "Projects"
            referencedColumns: ["id"]
          },
        ]
      }
      Projects: {
        Row: {
          createdAt: string
          description: string | null
          id: string
          name: string
          organizationId: string
          slug: string
        }
        Insert: {
          createdAt?: string
          description?: string | null
          id?: string
          name: string
          organizationId: string
          slug: string
        }
        Update: {
          createdAt?: string
          description?: string | null
          id?: string
          name?: string
          organizationId?: string
          slug?: string
        }
        Relationships: [
          {
            foreignKeyName: "Projects_organizationId_fkey"
            columns: ["organizationId"]
            isOneToOne: false
            referencedRelation: "Organizations"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_profile_id: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

