import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
export type UserRole = 'admin' | null;

interface AuthContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  isInitializing: boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRoleState] = useState<UserRole>(null);
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    const storedRole = localStorage.getItem('role') as UserRole | null;
    if (storedRole) setRoleState(storedRole);
    setIsInitializing(false);
  }, []);

  const setRole = (newRole: UserRole) => {
    setRoleState(newRole);
    if (newRole) {
      localStorage.setItem('role', newRole);
    } else {
      localStorage.removeItem('role');
    }
  };

  const logout = () => {
    Cookies.remove('accessToken', { path: '/' });
    Cookies.remove('refreshToken', { path: '/' });
  };

  return (
    <AuthContext.Provider value={{ role, setRole, isInitializing, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
