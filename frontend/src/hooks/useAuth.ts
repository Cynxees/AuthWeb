import { useContext, useEffect } from 'react';
import { UserContext }  from '../contexts/UserContext'
import { login, register } from '../services/authService';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {

    const context = useContext(UserContext);
    const navigate = useNavigate();

    if (!context) {
    
        throw new Error('useAuth error: context not found');
    
    }

    const { user, setUser } = context;

    useEffect(() => {

        const storedUser = localStorage.getItem('user');
        
        if (storedUser) {
        
            setUser(JSON.parse(storedUser));
            navigate('/home')
        
        }
    
    }, [setUser]);


    const loginUser = async (username: string, password: string, rememberMe: boolean) => {

        const user = await login(username, password);
        setUser(user);
        
        if (rememberMe) {
            
            localStorage.setItem('user', JSON.stringify(user));
        
        }

    };

    const registerUser = async (username: string, password: string) => {

        const user = await register(username, password);
        setUser(user);
    
    };


    const logoutUser = () => {

        setUser(null);
        localStorage.removeItem('user');
    
    };


    return {
        user,
        loginUser,
        registerUser,
        logoutUser
    };
};
