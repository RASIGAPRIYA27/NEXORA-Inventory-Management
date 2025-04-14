
import api from './api';
import { User } from '@/pages/Users';

export const fetchUsers = async () => {
  const response = await api.get('/users');
  return response.data;
};

export const createUser = async (user: Omit<User, 'id'>) => {
  const response = await api.post('/users', user);
  return response.data;
};

export const updateUser = async (user: User) => {
  const response = await api.put(`/users/${user.id}`, user);
  return response.data;
};

export const deleteUser = async (id: string | number) => {
  const response = await api.delete(`/users/${id}`);
  return response.data;
};
