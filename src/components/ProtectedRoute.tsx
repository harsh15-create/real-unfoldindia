import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/auth/AuthContext';
import { Loader2 } from 'lucide-react';

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const { user, loading, profile } = useAuth();
    const location = useLocation();

    if (loading) {
        return (
            <div className="h-screen w-full flex items-center justify-center bg-background">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // If user is logged in but profile is incomplete (e.g. missing required fields)
    // And we are NOT already on the complete-profile page
    if (
        user &&
        (!profile || !profile.full_name || !profile.country) &&
        location.pathname !== '/complete-profile'
    ) {
        return <Navigate to="/complete-profile" replace />;
    }

    return <>{children}</>;
};
