const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Create HTTP server
const server = http.createServer(app);

// Setup Socket.io
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// Import routes
const sensorRoutes = require('./routes/sensorRoutes');
const documentRoutes = require('./routes/documentRoutes');
const chatRoutes = require('./routes/chatRoutes');

// Use routes
app.use('/api/sensors', sensorRoutes);
app.use('/api/documents', documentRoutes);
app.use('/api/chat', chatRoutes);

// Socket.io connection
io.on('connection', (socket) => {
  console.log('New client connected');
  
  // Send real-time sensor data every 5 seconds
  const sensorInterval = setInterval(() => {
    const sensorData = require('./services/sensorService').generateSensorData();
    socket.emit('sensorUpdate', sensorData);
  }, 5000);

  socket.on('disconnect', () => {
    console.log('Client disconnected');
    clearInterval(sensorInterval);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});