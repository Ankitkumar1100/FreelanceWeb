import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, username?: string) => Promise<void>;
  register: (
    name: string,
    phone: string,
    location: string,
    dob: string,
    username: string,
    email: string,
    password: string,
    isClient: boolean,
    isFreelancer: boolean,
    profilePicture?: string
  ) => Promise<void>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
  isLoading: boolean;
  forgotPassword: (email: string, newPassword: string) => Promise<void>;
  resetPassword: (email: string, oldPassword: string, newPassword: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

const API_BASE = 'https://freelance-web-seven.vercel.app/api/v1';

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string, username?: string) => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, username: username || email })
      });
      if (!res.ok) throw new Error('Login failed');
      // You may want to parse the user/token from the response
      const data = await res.json();
      // Save user/token as needed
      setUser(data.user || null);
      localStorage.setItem('user', JSON.stringify(data.user));
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (
    name: string,
    phone: string,
    location: string,
    dob: string,
    username: string,
    email: string,
    password: string,
    isClient: boolean,
    isFreelancer: boolean,
    profilePicture?: string
  ) => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_BASE}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          phone,
          location,
          dob,
          username,
          email,
          password,
          isActive: false,
          isClient,
          isFreelancer,
          profilePicture: profilePicture || ''
        })
      });
      if (!res.ok) throw new Error('Registration failed');
      const data = await res.json();
      setUser(data.user || null);
      localStorage.setItem('user', JSON.stringify(data.user));
    } finally {
      setIsLoading(false);
    }
  };

  const forgotPassword = async (email: string, newPassword: string) => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_BASE}/auth/forget-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, newPassword })
      });
      if (!res.ok) throw new Error('Failed to send reset email');
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (email: string, oldPassword: string, newPassword: string) => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_BASE}/auth/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: JSON.stringify({ email, oldPassword, newPassword })
      });
      if (!res.ok) throw new Error('Failed to reset password');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  const updateProfile = (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  const value = {
    user,
    login,
    register,
    logout,
    updateProfile,
    isLoading,
    forgotPassword,
    resetPassword
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};