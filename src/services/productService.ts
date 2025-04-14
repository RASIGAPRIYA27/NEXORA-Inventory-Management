
import api from './api';
import { Product } from '@/pages/Inventory';

export const fetchProducts = async () => {
  try {
    const response = await api.get('/products');
    console.log('Fetched products:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const createProduct = async (product: Omit<Product, 'id'>) => {
  try {
    console.log('Creating product with data:', product);
    const response = await api.post('/products', product);
    console.log('Created product response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

export const updateProduct = async (product: Product) => {
  try {
    const response = await api.put(`/products/${product.id}`, product);
    return response.data;
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
};

export const deleteProduct = async (id: string | number) => {
  try {
    const response = await api.delete(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
};
