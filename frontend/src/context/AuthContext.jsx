import { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import authServices from '@/services/auth.services';

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [initialized, setInitialized] = useState(false);


    // Verify token on app load

    const verifyToken = async () => {
        const token = Cookies.get('session_token');
        if (!token) {
            setLoading(false);
            setInitialized(true);
            return;
        }

        try {
            const response = await authServices.validateSession();
            
            if (response.data.success) {
                setUser(response.data.data);
                localStorage.setItem('user', JSON.stringify(response.data.data));
            } else {
                // Token invalid
                // logout();
            }
        } catch (error) {
            console.error('Token verification failed:', error);
            // logout();
        } finally {
            setLoading(false);
            setInitialized(true);
        }
    }

    useEffect(() => {
        verifyToken();
    }, []);


    return (
        <AuthContext.Provider value={{ user, loading, initialized }}>
            {children}
        </AuthContext.Provider>
    )
}


export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};


export default AuthContext;
export { AuthProvider };
