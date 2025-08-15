import { useState, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';

interface SensorData {
  id: string;
  name: string;
  value: number;
  unit: string;
  status: 'normal' | 'warning' | 'critical';
  trend: 'up' | 'down' | 'stable';
  lastUpdated: Date;
  threshold?: {
    min: number;
    max: number;
  };
}

export function useSensorData() {
  const [sensorData, setSensorData] = useState<SensorData[]>([]);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Connect to WebSocket server
    const newSocket = io('http://localhost:5000');
    setSocket(newSocket);

    // Handle connection events
    newSocket.on('connect', () => {
      console.log('Connected to sensor data stream');
      setIsConnected(true);
    });

    newSocket.on('disconnect', () => {
      console.log('Disconnected from sensor data stream');
      setIsConnected(false);
    });

    // Handle sensor data updates
    newSocket.on('sensorUpdate', (data: any) => {
      // Convert string dates to Date objects
      const formattedData = data.map((sensor: any) => ({
        ...sensor,
        lastUpdated: new Date(sensor.lastUpdated)
      }));
      setSensorData(formattedData);
    });

    // Cleanup on unmount
    return () => {
      newSocket.disconnect();
    };
  }, []);

  return { sensorData, isConnected };
}