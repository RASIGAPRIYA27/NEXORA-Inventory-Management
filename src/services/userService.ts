
import api from './api';
import { User } from '@/pages/Users';

export const fetchUsers = async () => {
  try {
    console.log('Fetching users from API...');
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
    // Make sure all required fields are present
    if (!user.name || !user.email || !user.role || !user.avatar) {
      console.error('Missing required user fields:', user);
      throw new Error('Missing required user fields');
    }
    
    // Remove any undefined or unwanted properties
    const cleanUser = {
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
      active: user.active !== undefined ? user.active : true,
      phone: user.phone || ''
    };
    
    console.log('Sending cleaned user data:', cleanUser);
    const response = await api.post('/users', cleanUser);
    console.log('Created user response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

export const updateUser = async (user: User) => {
  try {
    console.log('Updating user:', user);
    // Remove any undefined or unwanted properties
    const cleanUser = {
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
      active: user.active !== undefined ? user.active : true,
      phone: user.phone || ''
    };
    
    const response = await api.put(`/users/${user.id}`, cleanUser);
    console.log('Updated user response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

export const deleteUser = async (id: string | number) => {
  try {
    console.log('Deleting user with ID:', id);
    const response = await api.delete(`/users/${id}`);
    console.log('Delete user response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};
