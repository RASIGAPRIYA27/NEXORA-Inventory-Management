
import api from './api';
import { Product } from '@/pages/Inventory';

export const fetchProducts = async () => {
  const response = await api.get('/products');
  return response.data;
};

export const createProduct = async (product: Omit<Product, 'id'>) => {
  const response = await api.post('/products', product);
  return response.data;
};

export const updateProduct = async (product: Product) => {
  const response = await api.put(`/products/${product.id}`, product);
  return response.data;
};

export const deleteProduct = async (id: number) => {
  const response = await api.delete(`/products/${id}`);
  return response.data;
};
