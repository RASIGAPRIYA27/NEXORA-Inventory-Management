
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

// Global error handler middleware
app.use((err, req, res, next) => {
  console.error('Global error handler caught:', err);
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err : {}
  });
});

// MongoDB Connection with detailed error handling
mongoose.connect('mongodb://localhost:27017/inventory-manager', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB Connected successfully to inventory-manager database'))
.catch(err => {
  console.error('MongoDB Connection Error:', err);
  console.error('Connection string: mongodb://localhost:27017/inventory-manager');
  console.error('Make sure MongoDB server is running and accessible');
});

// Define Schemas with validation
const ProductSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, 'Product name is required'],
    trim: true
  },
  image: { 
    type: String, 
    required: [true, 'Product image URL is required']
  },
  category: { 
    type: String, 
    required: [true, 'Product category is required'],
    trim: true
  },
  price: { 
    type: Number, 
    required: [true, 'Product price is required'],
    min: [0, 'Price cannot be negative']
  },
  stock: { 
    type: Number, 
    required: [true, 'Stock quantity is required'],
    min: [0, 'Stock cannot be negative']
  },
  sku: { 
    type: String, 
    required: [true, 'SKU is required'],
    unique: true,
    trim: true
  },
  description: { type: String }
});

const UserSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, 'User name is required'],
    trim: true
  },
  email: { 
    type: String, 
    required: [true, 'Email is required'], 
    unique: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email address']
  },
  role: { 
    type: String, 
    enum: {
      values: ['Admin', 'Manager', 'Staff'],
      message: '{VALUE} is not a valid role'
    },
    default: 'Staff'
  },
  avatar: { 
    type: String, 
    required: [true, 'Avatar URL is required']
  },
  active: { 
    type: Boolean, 
    default: true 
  },
  phone: { 
    type: String,
    validate: {
      validator: function(v) {
        return /\d{10,}/.test(v) || v === '';
      },
      message: props => `${props.value} is not a valid phone number!`
    }
  }
});

// Create models - explicitly set collection names to match your existing collections
console.log('Creating models with explicit collection names:');
console.log('Product -> products collection');
console.log('User -> user collection');
const Product = mongoose.model('Product', ProductSchema, 'products');
const User = mongoose.model('User', UserSchema, 'user'); // Using 'user' collection name as shown in your image

// Debug the collections at startup
mongoose.connection.once('open', async () => {
  try {
    console.log('Connected collections:', await mongoose.connection.db.listCollections().toArray());
  } catch (err) {
    console.error('Error listing collections:', err);
  }
});

// Product routes with better error handling
app.get('/api/products', async (req, res, next) => {
  try {
    console.log('Fetching products from database...');
    const products = await Product.find();
    console.log(`Found ${products.length} products`);
    res.json(products);
  } catch (err) {
    console.error('Error fetching products:', err);
    next(err);
  }
});

app.post('/api/products', async (req, res, next) => {
  try {
    console.log('Creating new product with data:', req.body);
    // Validate required fields
    const { name, category, price, stock, sku, image } = req.body;
    if (!name || !category || price === undefined || stock === undefined || !sku || !image) {
      return res.status(400).json({ 
        message: 'Missing required fields',
        requiredFields: ['name', 'category', 'price', 'stock', 'sku', 'image']
      });
    }
    
    const product = new Product(req.body);
    const newProduct = await product.save();
    console.log('Product created successfully:', newProduct);
    res.status(201).json(newProduct);
  } catch (err) {
    console.error('Error creating product:', err);
    if (err.code === 11000) {
      // Handle duplicate key error (e.g., duplicate SKU)
      return res.status(409).json({ message: 'Product with this SKU already exists' });
    }
    next(err);
  }
});

app.put('/api/products/:id', async (req, res, next) => {
  try {
    console.log(`Updating product with ID: ${req.params.id}`, req.body);
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id, 
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    console.log('Product updated successfully:', updatedProduct);
    res.json(updatedProduct);
  } catch (err) {
    console.error('Error updating product:', err);
    if (err.code === 11000) {
      return res.status(409).json({ message: 'Product with this SKU already exists' });
    }
    next(err);
  }
});

app.delete('/api/products/:id', async (req, res, next) => {
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
    next(err);
  }
});

// User routes with better error handling
app.get('/api/users', async (req, res, next) => {
  try {
    console.log('Fetching users from database...');
    const users = await User.find();
    console.log(`Found ${users.length} users`);
    res.json(users);
  } catch (err) {
    console.error('Error fetching users:', err);
    next(err);
  }
});

app.post('/api/users', async (req, res, next) => {
  try {
    console.log('Creating new user with data:', req.body);
    // Validate required fields
    const { name, email, avatar } = req.body;
    if (!name || !email || !avatar) {
      return res.status(400).json({
        message: 'Missing required fields',
        requiredFields: ['name', 'email', 'avatar']
      });
    }
    
    const user = new User(req.body);
    const newUser = await user.save();
    console.log('User created successfully:', newUser);
    res.status(201).json(newUser);
  } catch (err) {
    console.error("Error saving user:", err);
    if (err.code === 11000) {
      // Handle duplicate email error
      return res.status(409).json({ message: 'Email already exists' });
    }
    next(err);
  }
});

app.put('/api/users/:id', async (req, res, next) => {
  try {
    console.log(`Updating user with ID: ${req.params.id}`, req.body);
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id, 
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    console.log('User updated successfully:', updatedUser);
    res.json(updatedUser);
  } catch (err) {
    console.error('Error updating user:', err);
    if (err.code === 11000) {
      return res.status(409).json({ message: 'Email already exists' });
    }
    next(err);
  }
});

app.delete('/api/users/:id', async (req, res, next) => {
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
    next(err);
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
