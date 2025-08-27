import { useState, useEffect } from 'react';

interface AuthState {
  isAuthenticated: boolean;
  sessionTimeLeft: number;
  login: (code: string) => boolean;
  logout: () => void;
  renewSession: () => void;
}

const ACCESS_CODE = 'RADAR2024';
const SESSION_DURATION = 3 * 60 * 60 * 1000; // 3 horas em milissegundos
const STORAGE_KEY = 'happiness_radar_session';

export const useAuth = (): AuthState => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [sessionTimeLeft, setSessionTimeLeft] = useState(0);

  const checkSession = () => {
    const sessionData = localStorage.getItem(STORAGE_KEY);
    console.log('[Auth] Checking session:', sessionData);
    
    if (!sessionData) {
      console.log('[Auth] No session data found');
      setIsAuthenticated(false);
      setSessionTimeLeft(0);
      return false;
    }

    try {
      const { timestamp } = JSON.parse(sessionData);
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
      setSessionTimeLeft(timeLeft);
      return true;
    } catch (error) {
      console.log('[Auth] Error parsing session data:', error);
      logout();
      return false;
    }
  };

  const login = (code: string): boolean => {
    if (code === ACCESS_CODE) {
      const sessionData = {
        timestamp: Date.now(),
        code: code
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(sessionData));
      setIsAuthenticated(true);
      setSessionTimeLeft(SESSION_DURATION);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY);
    setIsAuthenticated(false);
    setSessionTimeLeft(0);
  };

  const renewSession = () => {
    if (isAuthenticated) {
      const sessionData = {
        timestamp: Date.now(),
        code: ACCESS_CODE
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(sessionData));
      setSessionTimeLeft(SESSION_DURATION);
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
    sessionTimeLeft,
    login,
    logout,
    renewSession
  };
};