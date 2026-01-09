
import { supabase } from '@/lib/supabaseClient';

export const changePassword = async (email: string, currentPassword: string, newPassword: string) => {
    try {
        // 1. Verify current password by attempting to sign in
        const { error: signInError } = await supabase.auth.signInWithPassword({
            email,
            password: currentPassword
        });

        if (signInError) {
            return { success: false, error: "Incorrect current password" };
        }

        // 2. If verified, proceed to update
        const { data, error } = await supabase.auth.updateUser({
            password: newPassword
        });

        if (error) throw error;
        return { success: true, data };
    } catch (error: any) {
        console.error('Error changing password:', error);
        return { success: false, error: error.message };
    }
};
