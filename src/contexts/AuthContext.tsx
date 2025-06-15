
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User } from '@supabase/supabase-js';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, userData: any) => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (updates: any) => Promise<void>;
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

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Mock implementation for now - will be replaced with actual Supabase integration
  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const signIn = async (email: string, password: string) => {
    // Mock sign in
    console.log('Signing in with:', email, password);
    setUser({
      id: '1',
      email,
      created_at: new Date().toISOString(),
      user_metadata: { name: 'João Silva' },
      app_metadata: {},
      aud: 'authenticated',
      email_confirmed_at: new Date().toISOString(),
      last_sign_in_at: new Date().toISOString(),
      role: 'authenticated',
      updated_at: new Date().toISOString(),
      confirmation_sent_at: new Date().toISOString()
    } as User);
  };

  const signUp = async (email: string, password: string, userData: any) => {
    // Mock sign up
    console.log('Signing up with:', email, password, userData);
    setUser({
      id: '1',
      email,
      created_at: new Date().toISOString(),
      user_metadata: userData,
      app_metadata: {},
      aud: 'authenticated',
      email_confirmed_at: new Date().toISOString(),
      last_sign_in_at: new Date().toISOString(),
      role: 'authenticated',
      updated_at: new Date().toISOString(),
      confirmation_sent_at: new Date().toISOString()
    } as User);
  };

  const signOut = async () => {
    setUser(null);
  };

  const updateProfile = async (updates: any) => {
    if (user) {
      setUser({
        ...user,
        user_metadata: { ...user.user_metadata, ...updates }
      });
    }
  };

  const value = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    updateProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
