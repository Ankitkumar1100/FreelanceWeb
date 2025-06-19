import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string, role: 'client' | 'freelancer') => Promise<void>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
  isLoading: boolean;
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

// Test credentials
const testUsers = {
  'freelancer@test.com': {
    id: '1',
    email: 'freelancer@test.com',
    name: 'Sarah Johnson',
    role: 'freelancer' as const,
    bio: 'Full-stack developer with 5+ years of experience in React, Node.js, and cloud technologies.',
    skills: ['React', 'Node.js', 'TypeScript', 'AWS', 'MongoDB'],
    hourlyRate: 75,
    rating: 4.9,
    totalReviews: 127,
    location: 'San Francisco, CA',
    joinedDate: '2020-01-15',
    isOnline: true,
    completedJobs: 156,
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400',
    portfolio: [
      {
        id: '1',
        title: 'E-commerce Platform',
        description: 'Built a full-stack e-commerce solution with React and Node.js',
        image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800',
        link: 'https://example.com',
        tags: ['React', 'Node.js', 'MongoDB']
      }
    ],
    profileComplete: true
  },
  'client@test.com': {
    id: '2',
    email: 'client@test.com',
    name: 'Tech Startup Inc.',
    role: 'client' as const,
    bio: 'Growing tech startup looking for talented developers and designers to help build innovative products.',
    location: 'New York, NY',
    joinedDate: '2023-01-15',
    rating: 4.7,
    totalReviews: 23,
    completedJobs: 15,
    avatar: 'https://images.pexels.com/photos/3184287/pexels-photo-3184287.jpeg?auto=compress&cs=tinysrgb&w=400',
    companySize: '10-50',
    industry: 'Technology',
    website: 'https://techstartup.com',
    profileComplete: true
  }
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored user on app load
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check test credentials
    if (password === 'test123' && testUsers[email as keyof typeof testUsers]) {
      const mockUser = testUsers[email as keyof typeof testUsers];
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
    } else {
      throw new Error('Invalid credentials');
    }
    
    setIsLoading(false);
  };

  const register = async (email: string, password: string, name: string, role: 'client' | 'freelancer') => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newUser: User = {
      id: Date.now().toString(),
      email,
      name,
      role,
      joinedDate: new Date().toISOString(),
      isOnline: true,
      rating: 0,
      totalReviews: 0,
      completedJobs: 0,
      profileComplete: false
    };
    
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
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
    isLoading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};