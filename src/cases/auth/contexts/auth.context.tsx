import { createContext, useState, useCallback, useEffect } from 'react';
import type { ReactNode } from 'react';
import { AuthService } from '../services/auth.service';
import type { SignInDto, SignUpDto, User } from '../dtos/auth.dto.tsx';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  signIn: (data: SignInDto) => Promise<void>;
  signUp: (data: SignUpDto) => Promise<void>;
  signOut: () => Promise<void>;
  clearError: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

const authService = new AuthService();

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Carregar usuário do localStorage ao montar
  useEffect(() => {
    const storedUser = authService.getUser();
    if (storedUser && authService.isAuthenticated()) {
      setUser(storedUser);
    }
  }, []);

  const signIn = useCallback(async (data: SignInDto) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await authService.signIn(data);
      authService.saveUser(response.customer);
      const accessToken = response.session?.access_token;
      if (!accessToken) {
        throw new Error('No access token received from server');
      }
      authService.saveToken(accessToken);
      console.log('signIn - Token saved:', accessToken ? 'success' : 'failed');
      setUser(response.customer);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Login failed';
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const signUp = useCallback(async (data: SignUpDto) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await authService.signUp(data);
      authService.saveUser(response.customer);
      const accessToken = response.session?.access_token;
      if (!accessToken) {
        throw new Error('No access token received from server');
      }
      authService.saveToken(accessToken);
      console.log('signUp - Token saved:', accessToken ? 'success' : 'failed');
      setUser(response.customer);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Registration failed';
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const signOut = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      await authService.signOut();
      setUser(null);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Sign out failed';
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    error,
    signIn,
    signUp,
    signOut,
    clearError,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
