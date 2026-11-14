import { api } from './api';

export const authService = {
  async login(userName: string, password: string) {
    const response = await api.post('/auth/login', {
      userName,
      password,
    });

    return response.data;
  },
};