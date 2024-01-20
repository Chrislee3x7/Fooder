require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const roomRoutes = require('./routes/rooms');
const userRoutes = require('./routes/users');
const yelpRoutes = require('./routes/yelp');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/room', roomRoutes);
app.use('/api/user', userRoutes);
app.use('/api/yelp', yelpRoutes);

// connect to database before starting server
mongoose.connect(process.env.MONGO_URI, {
  // 'fooder' lines up with database name on MongoAtlas
  dbName: 'fooder'
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Socket.io Connection
io.on('connection', (socket) => {
  console.log('A user connected');
});
