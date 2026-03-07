import api from './api';

export interface LoginResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
    role: 'guest' | 'host' | 'admin';
  };
}

export const authService = {
  async login(email: string, password: string): Promise<LoginResponse> {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },

  async register(
    email: string,
    password: string,
    name: string,
    role: 'guest' | 'host'
  ): Promise<LoginResponse> {
    const response = await api.post('/auth/register', { email, password, name, role });
    return response.data;
  },

  async getCurrentUser() {
    const response = await api.get('/auth/me');
    return response.data;
  },
};

