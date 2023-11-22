import { createContext, useState, useContext, useEffect } from "react";
import { registerRequest, loginRequest, verityTokenRequest, logoutRequest } from "../api/auth";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    } return context
}

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(true)

    const singup = async (user) => {
        try {
            const res = await registerRequest(user);
            setUser(res.data);
            setIsAuthenticated(true);
            
        } catch (error) {
            setErrors(error.response.data);
        }
    }

    const singin = async (user) => {

        try {
            const res = await loginRequest(user);
            setUser(res.data);
            setIsAuthenticated(true);

        } catch (error) {
            if (Array.isArray(error.response.data)) {
                return setErrors(error.response.data)
            }
            setErrors([error.response.data.message])
        }
    }

    const logout = async () => {
        try {
            const res = await logoutRequest();
            console.log(res)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (errors.length > 0) {
            const timer = setTimeout(() => {
                setErrors([]);
            }, 10000)
            return () => clearTimeout(timer)
        }
    }, [errors])

    useEffect(() => {
        const chekLogin = async () => {
            const cookies = Cookies.get();

            if (!cookies.token) {
                setIsAuthenticated(false);
                setUser(null);
                setLoading(false);
                return;
            }
            try {
                const res = await verityTokenRequest(cookies.token);
                if (!res.data) {
                    setIsAuthenticated(false);
                    setLoading(false);
                    return
                }

                setIsAuthenticated(true);
                setUser(res.data);
                setLoading(false);

            } catch (error) {
                console.log(error)
                setIsAuthenticated(false);
                setUser(null);
                setLoading(false);
            }

        }

        chekLogin();
    }, [])

    return (
        <AuthContext.Provider value={{ singup, singin, user, isAuthenticated, errors, logout, loading }}>
            {children}
        </AuthContext.Provider>
    )
}