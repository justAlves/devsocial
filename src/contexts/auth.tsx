import React, {ReactNode, createContext, useContext, useState} from 'react';

interface AuthProps {
    signed: boolean;
}

export const AuthContext = createContext({} as AuthProps);

interface AuthProviderProps {
    children: ReactNode;
}

export default function AuthProvider({children}: AuthProviderProps) {
    const [user, setUser] = useState(null);

    return (
        <AuthContext.Provider value={{signed: !!user}}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
