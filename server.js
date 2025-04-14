
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Initialize express app
const app = express();
dotenv.config();

// Middlewares
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/inventory-manager', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.error('MongoDB Connection Error:', err));

// Define Schemas
const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  sku: { type: String, required: true },
  description: { type: String }
});

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, enum: ['Admin', 'Manager', 'Staff'], default: 'Staff' },
  avatar: { type: String, required: true },
  active: { type: Boolean, default: true },
  phone: { type: String }
});

// Create models - explicitly set collection names to match your existing collections
const Product = mongoose.model('Product', ProductSchema, 'products');
const User = mongoose.model('User', UserSchema, 'user'); // Changed from 'users' to 'user' to match your collection name

// Product routes
app.get('/api/products', async (req, res) => {
  try {
    console.log('Fetching products from database...');
    const products = await Product.find();
    console.log(`Found ${products.length} products`);
    res.json(products);
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).json({ message: err.message });
  }
});

app.post('/api/products', async (req, res) => {
  try {
    console.log('Creating new product with data:', req.body);
    const product = new Product(req.body);
    const newProduct = await product.save();
    console.log('Product created successfully:', newProduct);
    res.status(201).json(newProduct);
  } catch (err) {
    console.error('Error creating product:', err);
    res.status(400).json({ message: err.message });
  }
});

app.put('/api/products/:id', async (req, res) => {
  try {
    console.log(`Updating product with ID: ${req.params.id}`, req.body);
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id, 
      req.body,
      { new: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    console.log('Product updated successfully:', updatedProduct);
    res.json(updatedProduct);
  } catch (err) {
    console.error('Error updating product:', err);
    res.status(400).json({ message: err.message });
  }
});

app.delete('/api/products/:id', async (req, res) => {
  try {
    console.log(`Deleting product with ID: ${req.params.id}`);
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    console.log('Product deleted successfully');
    res.json({ message: 'Product deleted', id: req.params.id });
  } catch (err) {
    console.error('Error deleting product:', err);
    res.status(500).json({ message: err.message });
  }
});

// User routes
app.get('/api/users', async (req, res) => {
  try {
    console.log('Fetching users from database...');
    const users = await User.find();
    console.log(`Found ${users.length} users`);
    res.json(users);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ message: err.message });
  }
});

app.post('/api/users', async (req, res) => {
  try {
    console.log('Creating new user with data:', req.body);
    const user = new User(req.body);
    const newUser = await user.save();
    console.log('User created successfully:', newUser);
    res.status(201).json(newUser);
  } catch (err) {
    console.error("Error saving user:", err);
    res.status(400).json({ message: err.message });
  }
});

app.put('/api/users/:id', async (req, res) => {
  try {
    console.log(`Updating user with ID: ${req.params.id}`, req.body);
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id, 
      req.body,
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    console.log('User updated successfully:', updatedUser);
    res.json(updatedUser);
  } catch (err) {
    console.error('Error updating user:', err);
    res.status(400).json({ message: err.message });
  }
});

app.delete('/api/users/:id', async (req, res) => {
  try {
    console.log(`Deleting user with ID: ${req.params.id}`);
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    console.log('User deleted successfully');
    res.json({ message: 'User deleted', id: req.params.id });
  } catch (err) {
    console.error('Error deleting user:', err);
    res.status(500).json({ message: err.message });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
