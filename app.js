const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRouter = require('./authRouter');
const adminRouter = require('./adminRouter');
const userRouter = require('./userRouter');
const auctionRouter = require('./autionRouter');

// Initialize Express app
const app = express();

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(bodyParser.json()); // Parse JSON request bodies

// Connect to MongoDB
mongoose.connect('mongodb+srv://archana2002:archana07@cluster0.zzcjkzd.mongodb.net/visitorDb?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Routes
app.use('/api/auth', authRouter);
app.use('/api/admin', adminRouter);
app.use('/api/user', userRouter);
app.use('/api/auction', auctionRouter);


// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});