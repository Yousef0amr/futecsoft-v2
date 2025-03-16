import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useCookies } from 'react-cookie';
import Loader from '../components/common/Loader';
import { useNavigate } from 'react-router-dom';
import Relogin from '../components/auth/Relogin';
import { useDispatch } from "react-redux";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [cookies, setCookie, removeCookie] = useCookies();
    const [showLoginModal, setShowLoginModal] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const getDecodedToken = useCallback((token) => {
        try {
            return jwtDecode(token);
        } catch {
            return null;
        }
    }, []);

    const getAccessToken = useCallback(() => cookies.accessToken, [cookies.accessToken]);


    const logoutLocal = () => {
        removeCookie('accessToken');
        setIsAuthenticated(false);
    };

    const checkAuth = useCallback(() => {
        const token = getAccessToken();

        if (!token || typeof token !== 'string') {
            setIsAuthenticated(false);
            setIsLoading(false);
            return;
        }

        const isJwtToken = token.split('.').length === 3;

        if (!isJwtToken) {
            setIsAuthenticated(false);
            setIsLoading(false);
            return;
        }

        const decodedToken = getDecodedToken(token);

        if (!decodedToken) {
            setIsAuthenticated(false);
            setIsLoading(false);
            return;
        }

        const currentTime = Date.now() / 1000;

        if (decodedToken?.exp < currentTime) {
            logoutLocal();
            setShowLoginModal(true);
        } else {
            setIsAuthenticated(true);
        }

        setIsLoading(false);
    }, [getAccessToken, getDecodedToken, logoutLocal]);



    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    const loginLocal = useCallback((token) => {
        setCookie('accessToken', token, { path: '/', secure: true, httpOnly: false, sameSite: 'strict' });
        setIsAuthenticated(true);
    }, [setCookie]);

    const handleNavigateToLogin = () => {
        setShowLoginModal(false);
        logoutLocal();
        navigate('/login', { replace: true });
    };

    if (isLoading) {
        return <Loader />;
    }

    if (showLoginModal) {
        return (
            <Relogin handleNavigateToLogin={handleNavigateToLogin} showLoginModal={showLoginModal} setShowLoginModal={setShowLoginModal} />
        );
    }

    return (
        <AuthContext.Provider value={{ setShowLoginModal, isAuthenticated, logoutLocal, loginLocal, getAccessToken }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
