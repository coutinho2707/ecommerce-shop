import { useState } from 'react';
import { useAuth } from '../hooks/use-auth';
import type { SignUpDto } from '../dtos/auth.dto.tsx';

export function useSignUp() {
  const { signUp, isLoading, error, clearError } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [cityId, setCityId] = useState('');
  const [address, setAddress] = useState('');
  const [zipcode, setZipcode] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();

    try {
      await signUp({
        email,
        password,
        name,
        cityId,
        address,
        zipcode,
      } as SignUpDto);
      // Reset form
      setEmail('');
      setPassword('');
      setName('');
      setCityId('');
      setAddress('');
      setZipcode('');
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
    name,
    setName,
    cityId,
    setCityId,
    address,
    setAddress,
    zipcode,
    setZipcode,
    handleSubmit,
    isLoading,
    error,
    clearError,
  };
}
