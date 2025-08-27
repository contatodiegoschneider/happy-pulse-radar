import { useState, useEffect } from 'react';

interface AuthState {
  isAuthenticated: boolean;
  isAdmin: boolean;
  sessionTimeLeft: number;
  login: (code: string) => boolean;
  logout: () => void;
  renewSession: () => void;
}

const ACCESS_CODE = 'RADAR2024';
const ADMIN_CODE = 'ADMIN2024';
const SESSION_DURATION = 3 * 60 * 60 * 1000; // 3 horas em milissegundos
const STORAGE_KEY = 'happiness_radar_session';

export const useAuth = (): AuthState => {
  // Inicializar com o valor correto baseado na sessão existente
  const getInitialAuthState = () => {
    const sessionData = localStorage.getItem(STORAGE_KEY);
    if (!sessionData) return { auth: false, admin: false };
    
    try {
      const { timestamp, code } = JSON.parse(sessionData);
      const timeElapsed = Date.now() - timestamp;
      const timeLeft = SESSION_DURATION - timeElapsed;
      const isValidSession = timeLeft > 0;
      const isAdminSession = code === ADMIN_CODE;
      return { 
        auth: isValidSession, 
        admin: isValidSession && isAdminSession 
      };
    } catch {
      return { auth: false, admin: false };
    }
  };

  const initialState = getInitialAuthState();
  const [isAuthenticated, setIsAuthenticated] = useState(initialState.auth);
  const [isAdmin, setIsAdmin] = useState(initialState.admin);
  const [sessionTimeLeft, setSessionTimeLeft] = useState(0);

  const checkSession = () => {
    const sessionData = localStorage.getItem(STORAGE_KEY);
    console.log('[Auth] Checking session:', sessionData);
    
    if (!sessionData) {
      console.log('[Auth] No session data found');
      setIsAuthenticated(false);
      setIsAdmin(false);
      setSessionTimeLeft(0);
      return false;
    }

    try {
      const { timestamp, code } = JSON.parse(sessionData);
      const timeElapsed = Date.now() - timestamp;
      const timeLeft = SESSION_DURATION - timeElapsed;

      console.log('[Auth] Time elapsed:', timeElapsed, 'Time left:', timeLeft);

      if (timeLeft <= 0) {
        console.log('[Auth] Session expired');
        logout();
        return false;
      }

      console.log('[Auth] Session valid, setting authenticated');
      setIsAuthenticated(true);
      setIsAdmin(code === ADMIN_CODE);
      setSessionTimeLeft(timeLeft);
      return true;
    } catch (error) {
      console.log('[Auth] Error parsing session data:', error);
      logout();
      return false;
    }
  };

  const login = (code: string): boolean => {
    if (code === ACCESS_CODE || code === ADMIN_CODE) {
      const sessionData = {
        timestamp: Date.now(),
        code: code
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(sessionData));
      setIsAuthenticated(true);
      setIsAdmin(code === ADMIN_CODE);
      setSessionTimeLeft(SESSION_DURATION);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY);
    setIsAuthenticated(false);
    setIsAdmin(false);
    setSessionTimeLeft(0);
  };

  const renewSession = () => {
    if (isAuthenticated) {
      const sessionData = localStorage.getItem(STORAGE_KEY);
      if (sessionData) {
        try {
          const { code } = JSON.parse(sessionData);
          const newSessionData = {
            timestamp: Date.now(),
            code: code
          };
          localStorage.setItem(STORAGE_KEY, JSON.stringify(newSessionData));
          setSessionTimeLeft(SESSION_DURATION);
        } catch {
          logout();
        }
      }
    }
  };

  useEffect(() => {
    checkSession();
    
    const interval = setInterval(() => {
      checkSession();
    }, 60000); // Verifica a cada minuto

    return () => clearInterval(interval);
  }, []);

  return {
    isAuthenticated,
    isAdmin,
    sessionTimeLeft,
    login,
    logout,
    renewSession
  };
};