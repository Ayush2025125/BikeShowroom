const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

const adminRoutes = require('./routes/adminRoutes.js');
const contactRoutes = require('./routes/contactRoutes.js');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/admin', adminRoutes);

app.use('/api', contactRoutes);

// DB Connection
mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log('MongoDB connected');
  app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });
}).catch(err => console.error(err));
