
import axios from 'axios';
import { fetchUsers, createUser, updateUser, deleteUser } from '../services/userService';

// Mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

// Mock the api module
jest.mock('../services/api', () => ({
  __esModule: true,
  default: {
    get: jest.fn().mockImplementation(() => Promise.resolve({ data: [] })),
    post: jest.fn().mockImplementation(() => Promise.resolve({ data: {} })),
    put: jest.fn().mockImplementation(() => Promise.resolve({ data: {} })),
    delete: jest.fn().mockImplementation(() => Promise.resolve({ data: {} })),
  }
}));

// Import the mocked api
import api from '../services/api';

describe('userService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('fetchUsers', () => {
    it('should call api.get with the correct endpoint', async () => {
      const mockUsers = [
        { id: 1, name: 'User 1', email: 'user1@example.com', role: 'Admin', avatar: '', active: true }
      ];
      
      (api.get as jest.Mock).mockResolvedValueOnce({ data: mockUsers });
      
      const result = await fetchUsers();
      
      expect(api.get).toHaveBeenCalledWith('/users');
      expect(result).toEqual(mockUsers);
    });

    it('should throw an error when the request fails', async () => {
      const errorMessage = 'Network Error';
      (api.get as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));
      
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
      (api.post as jest.Mock).mockResolvedValueOnce({ data: mockResponse });
      
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
