
import api from './api';
import { User } from '@/pages/Users';

export const fetchUsers = async () => {
  try {
    const response = await api.get('/users');
    console.log('Fetched users:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export const createUser = async (user: Omit<User, 'id'>) => {
  try {
    console.log('Creating user with data:', user);
    const response = await api.post('/users', user);
    console.log('Created user response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

export const updateUser = async (user: User) => {
  try {
    const response = await api.put(`/users/${user.id}`, user);
    return response.data;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

export const deleteUser = async (id: string | number) => {
  try {
    const response = await api.delete(`/users/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};
