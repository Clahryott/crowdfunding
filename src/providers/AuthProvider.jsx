import { createContext, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider( { children }) {
    const [token, setToken] = useState(window.localStorage.getItem("token"));
    const loggedIn = !!token;
    return <AuthContext.Provider value={{loggedIn, token, setToken}}>
        {children}
    </AuthContext.Provider>
}