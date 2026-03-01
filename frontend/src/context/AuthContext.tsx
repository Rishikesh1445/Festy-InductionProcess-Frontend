import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";

export interface User {
    name: string;
    email: string;
    role: string | null;
    authenticated: boolean;
    claims?: any;
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: () => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const login = () => {
        window.location.href = "http://localhost:8080/oauth2/authorization/dauth";
    };

    const logout = () => {
        window.location.href = "http://localhost:8080/api/logout";
    };

    const fetchUser = async () => {
        try {
            const res = await fetch("http://localhost:8080/api/me", {
                credentials: "include",
            });

            if (res.ok) {
                const data = await res.json();
                if (data.authenticated) {
                    setUser(data);
                } else {
                    setUser(null);
                }
            } else {
                setUser(null);
            }
        } catch (err) {
            console.error(err);
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
