const express = require('express');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const cors = require('cors')
const app = express();
connectDB();

// Middleware to parse JSON requests
app.use(express.json());
app.use(cors())

// Mount the routes
app.use('/user/', userRoutes);
app.use('/auth/', authRoutes)

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));