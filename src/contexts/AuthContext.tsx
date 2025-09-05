import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

interface AuthUser {
  id: number;
  name: string;
  email: string;
}

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  login: (email: string, pass: string) => Promise<void>;
  logout: () => void;
  register: (name: string, email: string, pass: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock checking for a session on initial load
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  const login = (email: string, pass: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      setLoading(true);
      setTimeout(() => {
        if (email === 'admin@example.com' && pass === 'password') {
          setUser({ id: 1, name: 'Admin User', email });
          resolve();
        } else {
          reject(new Error('Invalid email or password'));
        }
        setLoading(false);
      }, 1000);
    });
  };
  
  const register = (name: string, email: string, pass: string): Promise<void> => {
     return new Promise((resolve) => {
      setLoading(true);
      setTimeout(() => {
        setUser({ id: Date.now(), name, email });
        setLoading(false);
        resolve();
      }, 1000);
    });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};