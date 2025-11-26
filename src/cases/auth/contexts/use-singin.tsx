import { useState } from 'react';
import { useAuth } from '../hooks/use-auth';
import type { SignInDto } from '../dtos/auth.dto.tsx';

export function useSignIn() {
  const { signIn, isLoading, error, clearError } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();

    try {
      await signIn({ email, password } as SignInDto);
      setEmail('');
      setPassword('');
      return true;
    } catch {
      return false;
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    handleSubmit,
    isLoading,
    error,
    clearError,
  };
}
