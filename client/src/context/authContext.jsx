import { createContext, useState, useContext, useEffect } from "react";
import { registerRequest, loginRequest } from "../api/auth";


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

    const singup = async (user) => {
        try {
            const res = await registerRequest(user);
            console.log(res.data);

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
        console.log(res);
        setIsAuthenticated(true);
            
        } catch (error) {
            if(Array.isArray(error.response.data)){
            return setErrors(error.response.data)
            }

            setErrors([error.response.data.message])
        }
    }

    useEffect(() => {
        if(errors.length > 0){
            const timer = setTimeout(() => {
                setErrors([]);
            }, 10000)
            return () => clearTimeout(timer)
        }
    })

    return (
        <AuthContext.Provider value={{ singup, singin, user, isAuthenticated, errors }}>
            {children}
        </AuthContext.Provider>
    )
}