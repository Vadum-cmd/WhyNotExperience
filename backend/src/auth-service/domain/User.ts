export interface User {
  id: string;
  email: string;
  passwordHash: string;
  name: string;
  role: 'guest' | 'host' | 'admin';
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateUserRequest {
  email: string;
  password: string;
  name: string;
  role: 'guest' | 'host';
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface UserResponse {
  id: string;
  email: string;
  name: string;
  role: string;
}


