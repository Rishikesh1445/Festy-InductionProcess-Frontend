import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface ProtectedRouteProps {
    allowedRole?: string;
}

export function getDefaultPathForRole(role?: string | null) {
    switch (role) {
        case 'HEAD': return '/head';
        case 'MANAGER': return '/manager';
        case 'COORD': return '/coord';
        default: return '/no-role'; // fallback for 'NO-ROLE' or undefined/null/unknown
    }
}

export default function ProtectedRoute({ allowedRole }: ProtectedRouteProps) {
    const { user, loading } = useAuth();

    if (loading) {
        return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>Loading...</div>;
    }

    // Not logged in -> Login page
    if (!user?.authenticated) {
        return <Navigate to="/" replace />;
    }

    // Rule 1: NO-ROLE specific check (any role not in the main 3 goes here)
    if (allowedRole === 'NO-ROLE') {
        if (user.role === 'HEAD' || user.role === 'MANAGER' || user.role === 'COORD') {
            return <Navigate to={getDefaultPathForRole(user.role)} replace />;
        }
        // they are 'NO-ROLE', allow access
        return <Outlet />;
    }

    // Rule 2: Normal specific role check
    if (allowedRole && user.role !== allowedRole) {
        // Has a different role, send them to their role's default page
        return <Navigate to={getDefaultPathForRole(user.role)} replace />;
    }

    return <Outlet />;
}
