import { createContext } from "react";
import { useState, useEffect } from "react"; // Import useState from React；
import axios from "axios";


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

    const login = async (inputs) => {
        const res = await axios.post('http://localhost:8080/api/auth/login', inputs);
        console.log('Token:', res.data.access_token); // 输出 token
        setUser(res.data);
    }

    const logout = async (inputs) => {
        const res = await axios.post('http://localhost:8080/api/auth/logout');
        setUser(null);
    }

    //listen the change of user, then store the change into local storage
    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(user));
    },[user]);

    return(
        <AuthContext.Provider value={{user, login, logout}}>{children}</AuthContext.Provider>
    )
}