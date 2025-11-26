export interface SignInDto {
  email: string;
  password: string;
}

export interface SignUpDto {
  email: string;
  password: string;
  name: string;
  cityId?: string;
  address?: string;
  zipcode?: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  address?: string;
  zipcode?: string;
  city?: {
    id: string;
    name: string;
  };
}

export interface AuthResponse {
  message: string;
  user: any;
  customer: User;
  session?: any;
}
