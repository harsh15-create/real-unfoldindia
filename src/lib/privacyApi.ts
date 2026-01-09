
import { supabase } from '@/lib/supabaseClient';

export interface PrivacySettings {
    id: string;
    user_id: string;
    location_access_enabled: boolean;
    push_notifications_enabled: boolean;
    analytics_data_sharing_enabled: boolean;
}

// Fetch settings, creating default record if none exists
export const fetchPrivacySettings = async (userId: string): Promise<PrivacySettings | null> => {
    try {
        const { data, error } = await supabase
            .from('privacy_settings')
            .select('*')
            .eq('user_id', userId)
            .single();

        if (error && error.code === 'PGRST116') {
            // No row found, create default
            const { data: newData, error: createError } = await supabase
                .from('privacy_settings')
                .insert({
                    user_id: userId,
                    location_access_enabled: true,
                    push_notifications_enabled: true,
                    analytics_data_sharing_enabled: false
                })
                .select()
                .single();

            if (createError) throw createError;
            return newData as PrivacySettings;
        }

        if (error) throw error;
        return data as PrivacySettings;
    } catch (err) {
        console.error('Error fetching privacy settings:', err);
        return null;
    }
};

// Update a specific setting
export const updatePrivacySetting = async (
    userId: string,
    key: keyof Omit<PrivacySettings, 'id' | 'user_id'>,
    value: boolean
) => {
    try {
        const { error } = await supabase
            .from('privacy_settings')
            .update({ [key]: value })
            .eq('user_id', userId);

        if (error) throw error;
        return true;
    } catch (err) {
        console.error(`Error updating ${key}:`, err);
        return false;
    }
};

// Request account deletion
export const requestAccountDeletion = async (userId: string) => {
    try {
        const { error } = await supabase
            .from('account_deletion_requests')
            .insert({
                user_id: userId,
                status: 'pending_confirmation'
            });

        if (error) throw error;
        return true;
    } catch (err) {
        console.error('Error requesting deletion:', err);
        return false;
    }
};
