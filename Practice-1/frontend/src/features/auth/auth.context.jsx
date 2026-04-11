import { useState } from "react"
import { AuthContext } from "./auth.context.js"
import { login, register } from "./services/auth.api"

export const AuthProvider = ({ children}) =>{
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const handleLogin = async (email, password) => {
          setLoading(true)
        try{
            const response = await login(email,password)
                        setUser(response?.user ?? null)
        }
        catch(error){
            console.error('Error in handleLogin:', error)
        }
        finally{
            setLoading(false)
        }

    }

    const handleRegister = async (username, email, password) => {
        setLoading(true)
        try{
            const response = await register(username,email,password)
            setUser(response?.user ?? null)
        }
        catch(error){
            console.error('Error in handleRegister:', error)
        }
        finally{
            setLoading(false)
        }   
    }

    return (
        <AuthContext.Provider value={{ user, loading, handleLogin, handleRegister }}>
            {children}
        </AuthContext.Provider>
    )
}
