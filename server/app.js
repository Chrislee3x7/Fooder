require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const roomRoutes = require('./routes/rooms');
const userRoutes = require('./routes/users');
const yelpRoutes = require('./routes/yelp');
const gptRoutes = require('./routes/gpt');
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
app.use('/api/gpt', gptRoutes);


// connect to database before starting server
mongoose.connect(process.env.MONGO_URI, {
  // 'fooder' lines up with database name on MongoAtlas
  dbName: 'fooder'
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error(err));

io.on('connection', (socket) => {
  console.log('A user connected');

  // Joining a room
  socket.on('joinRoom', ({ userId, roomCode }) => {
      socket.join(roomCode);
      socket.to(roomCode).emit('userJoined', { userId, roomCode });
      console.log(`User ${userId} joined room ${roomCode}`);
  });

  socket.on('finishedQuestions', ({ userId, roomCode }) => {
    socket.join(roomCode);
    socket.to(roomCode).emit('userFinishedQuestions', { userId, roomCode });
    console.log(`User ${userId} finished in room ${roomCode}`);
  });

  // Starting a room
  socket.on('startRoom', ({ roomCode }) => {
    socket.join(roomCode);
    socket.to(roomCode).emit('roomStarted');
    console.log(`${roomCode} started`);
});

  // Handling disconnect
  socket.on('disconnect', () => {
      console.log('User disconnected');
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
