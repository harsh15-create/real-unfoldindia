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
            profiles: {
                Row: {
                    id: string
                    full_name: string | null
                    email: string | null
                    phone: string | null
                    avatar_url: string | null
                    bio: string | null
                    country: string | null
                    preferred_language: string | null
                    travel_style: string[] | null
                    preferred_regions: string[] | null
                    interests: string[] | null
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id: string
                    full_name?: string | null
                    email?: string | null
                    phone?: string | null
                    avatar_url?: string | null
                    bio?: string | null
                    country?: string | null
                    preferred_language?: string | null
                    travel_style?: string[] | null
                    preferred_regions?: string[] | null
                    interests?: string[] | null
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    full_name?: string | null
                    email?: string | null
                    phone?: string | null
                    avatar_url?: string | null
                    bio?: string | null
                    country?: string | null
                    preferred_language?: string | null
                    travel_style?: string[] | null
                    preferred_regions?: string[] | null
                    interests?: string[] | null
                    created_at?: string
                    updated_at?: string
                }
            }
            user_exploration_events: {
                Row: {
                    id: string
                    user_id: string
                    entity_type: 'city' | 'state' | 'region'
                    entity_id: string
                    signal_type: 'view' | 'save' | 'trip' | 'route' | 'ai'
                    weight: number
                    created_at: string
                }
                Insert: {
                    id?: string
                    user_id: string
                    entity_type: 'city' | 'state' | 'region'
                    entity_id: string
                    signal_type: 'view' | 'save' | 'trip' | 'route' | 'ai'
                    weight?: number
                    created_at?: string
                }
                Update: {
                    id?: string
                    user_id?: string
                    entity_type?: 'city' | 'state' | 'region'
                    entity_id?: string
                    signal_type?: 'view' | 'save' | 'trip' | 'route' | 'ai'
                    weight?: number
                    created_at?: string
                }
            }
            user_badges: {
                Row: {
                    id: string
                    user_id: string
                    badge_id: string
                    unlocked_at: string
                }
                Insert: {
                    id?: string
                    user_id: string
                    badge_id: string
                    unlocked_at?: string
                }
                Update: {
                    id?: string
                    user_id?: string
                    badge_id?: string
                    unlocked_at?: string
                }
            }
        }
    }
}
