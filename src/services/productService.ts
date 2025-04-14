
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

export const createProduct = async (product: Omit<Product, "id">) => {
  try {
    console.log('Creating product with data:', product);
    // Make sure all required fields are present
    if (!product.name || !product.category || !product.image || !product.sku) {
      console.error('Missing required product fields:', product);
      throw new Error('Missing required product fields');
    }
    
    // Remove any undefined or unwanted properties
    const cleanProduct = {
      name: product.name,
      image: product.image,
      category: product.category,
      price: product.price,
      stock: product.stock,
      sku: product.sku,
      description: product.description || ''
    };
    
    console.log('Sending cleaned product data:', cleanProduct);
    const response = await api.post('/products', cleanProduct);
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
    // Remove any undefined or unwanted properties
    const cleanProduct = {
      name: product.name,
      image: product.image,
      category: product.category,
      price: product.price,
      stock: product.stock,
      sku: product.sku,
      description: product.description || ''
    };
    
    const response = await api.put(`/products/${product.id}`, cleanProduct);
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
