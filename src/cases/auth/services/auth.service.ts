import type { SignInDto, SignUpDto, AuthResponse } from '../dtos/auth.dto.tsx';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export class AuthService {
  async signUp(data: SignUpDto): Promise<AuthResponse> {
    const response = await fetch(`${API_URL}/auth/sign-up`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to register');
    }

    return response.json();
  }

  async signIn(data: SignInDto): Promise<AuthResponse> {
    const response = await fetch(`${API_URL}/auth/sign-in`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Invalid credentials');
    }

    return response.json();
  }

  async signOut(): Promise<void> {
    const response = await fetch(`${API_URL}/auth/sign-out`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.getToken()}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to sign out');
    }

    this.clearToken();
  }

  saveToken(token: string): void {
    localStorage.setItem('auth_token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  clearToken(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
  }

  saveUser(user: any): void {
    localStorage.setItem('auth_user', JSON.stringify(user));
  }

  getUser(): any {
    const user = localStorage.getItem('auth_user');
    return user ? JSON.parse(user) : null;
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
