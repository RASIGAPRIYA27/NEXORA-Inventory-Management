
import { describe, it, expect, vi, beforeEach } from 'vitest';
import axios from 'axios';
import { fetchUsers, createUser, updateUser, deleteUser } from '../services/userService';

// Mock axios
vi.mock('axios');
const mockedAxios = axios as unknown as { [key: string]: any };

// Mock the api module
vi.mock('../services/api', () => ({
  __esModule: true,
  default: {
    get: vi.fn().mockImplementation(() => Promise.resolve({ data: [] })),
    post: vi.fn().mockImplementation(() => Promise.resolve({ data: {} })),
    put: vi.fn().mockImplementation(() => Promise.resolve({ data: {} })),
    delete: vi.fn().mockImplementation(() => Promise.resolve({ data: {} })),
  }
}));

// Import the mocked api
import api from '../services/api';

describe('userService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('fetchUsers', () => {
    it('should call api.get with the correct endpoint', async () => {
      const mockUsers = [
        { id: 1, name: 'User 1', email: 'user1@example.com', role: 'Admin', avatar: '', active: true }
      ];
      
      (api.get as any).mockResolvedValueOnce({ data: mockUsers });
      
      const result = await fetchUsers();
      
      expect(api.get).toHaveBeenCalledWith('/users');
      expect(result).toEqual(mockUsers);
    });

    it('should throw an error when the request fails', async () => {
      const errorMessage = 'Network Error';
      (api.get as any).mockRejectedValueOnce(new Error(errorMessage));
      
      await expect(fetchUsers()).rejects.toThrow(errorMessage);
    });
  });

  describe('createUser', () => {
    it('should call api.post with the correct data', async () => {
      const newUser = {
        name: 'New User',
        email: 'newuser@example.com',
        role: 'Staff',
        avatar: '/placeholder.svg',
        active: true
      };
      
      const mockResponse = { ...newUser, id: 1 };
      (api.post as any).mockResolvedValueOnce({ data: mockResponse });
      
      const result = await createUser(newUser);
      
      expect(api.post).toHaveBeenCalledWith('/users', expect.objectContaining({
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        avatar: newUser.avatar,
        active: newUser.active
      }));
      expect(result).toEqual(mockResponse);
    });
  });
});
