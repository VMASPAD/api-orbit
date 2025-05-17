const express = require('express')
const mongoose = require('mongoose');
const User = require('./models.js');
const app = express()
const cors = require('cors');
const port = 4000
app.use(cors())
app.use(express.json());
const connectDB = async () => {
  try {
    const connection = await mongoose.connect('mongodb://localhost:27017/orbit-db', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log(`MongoDB Connected: ${connection.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};
connectDB();

app.get('/api/test', (req, res) => {
  res.json({ message: 'Server is working correctly' });
});
app.get('/api/content', async (req, res) => {
  try {
    const { username, email, password } = req.headers;
    const existingUser = await User.findOne({ username, password });
    console.log(existingUser);
    return res.status(200).json({ message: 'Your Apis', apis: existingUser.apis });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.post('/api/newContent', async (req, res) => {
  const { username, email, password, nameApi, content } = req.body;
  const existingUser = await User.findOne({ username, password });
  const newContent = content
  
  
});

app.post('/api/new', async (req, res) => {
  try {
    const { username, password, nameApi } = req.body;
     
    const user = await User.findOne({ username });
     
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
     
    if (user.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
     
    const newApi = {
      name: nameApi,
      content: []
    };
     
    user.apis.push(newApi);
     
    await user.save();
    
    res.status(200).json({ message: 'API added successfully', user });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.post('/api/user', async (req, res) => {
  try {
    const { username, email, password,apis } = req.body; 
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }
    
    const user = new User({ username, email, password, apis });
    await user.save();
    res.status(201).json({ message: 'User created successfully', user });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    if (error.code === 11000) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
