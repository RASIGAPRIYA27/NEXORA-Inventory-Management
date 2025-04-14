
import api from './api';
import { Product } from '@/pages/Inventory';

export const fetchProducts = async () => {
  try {
    console.log('Fetching products from API...');
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
    // Make sure all required fields are present
    if (!product.name || !product.category || !product.image || !product.sku) {
      console.error('Missing required product fields:', product);
      throw new Error('Missing required product fields');
    }
    
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
    console.log('Updating product:', product);
    const response = await api.put(`/products/${product.id}`, product);
    console.log('Updated product response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
};

export const deleteProduct = async (id: string | number) => {
  try {
    console.log('Deleting product with ID:', id);
    const response = await api.delete(`/products/${id}`);
    console.log('Delete product response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
};
