const generateSensorData = () => {
  const now = new Date();
  const sensorData = [
    {
      id: 'TEMP-001',
      name: 'Temperature',
      value: 22.5 + (Math.random() - 0.5) * 4,
      unit: '°C',
      status: 'normal',
      trend: 'stable',
      lastUpdated: now,
      threshold: { min: 18, max: 26 }
    },
    {
      id: 'HUM-001',
      name: 'Humidity',
      value: 45 + (Math.random() - 0.5) * 20,
      unit: '%',
      status: 'normal',
      trend: 'down',
      lastUpdated: now,
      threshold: { min: 30, max: 70 }
    },
    {
      id: 'PWR-001',
      name: 'Power Usage',
      value: 1250 + (Math.random() - 0.5) * 500,
      unit: 'W',
      status: 'warning',
      trend: 'up',
      lastUpdated: now,
      threshold: { min: 800, max: 1500 }
    },
    {
      id: 'VIB-001',
      name: 'Vibration',
      value: 0.8 + Math.random() * 0.4,
      unit: 'Hz',
      status: 'normal',
      trend: 'stable',
      lastUpdated: now,
      threshold: { min: 0, max: 2 }
    },
    {
      id: 'AIR-001',
      name: 'Air Quality',
      value: 85 + Math.random() * 10,
      unit: 'AQI',
      status: 'normal',
      trend: 'up',
      lastUpdated: now,
      threshold: { min: 0, max: 100 }
    },
    {
      id: 'PRE-001',
      name: 'Pressure',
      value: 1013 + (Math.random() - 0.5) * 10,
      unit: 'hPa',
      status: 'normal',
      trend: 'stable',
      lastUpdated: now,
      threshold: { min: 1000, max: 1030 }
    }
  ];

  // Set status based on threshold
  return sensorData.map(sensor => {
    if (sensor.threshold) {
      const { min, max } = sensor.threshold;
      const isOutOfRange = sensor.value < min || sensor.value > max;
      const isNearLimit = sensor.value < min * 1.1 || sensor.value > max * 0.9;
      
      return {
        ...sensor,
        status: (isOutOfRange ? 'critical' : isNearLimit ? 'warning' : 'normal')
      };
    }
    return sensor;
  });
};

const generateChartData = (hours = 24) => {
  const data = [];
  const now = new Date();
  
  for (let i = hours; i >= 0; i--) {
    const timestamp = new Date(now.getTime() - i * 60 * 60 * 1000);
    data.push({
      timestamp: timestamp.toISOString(),
      temperature: 22 + Math.sin(i * 0.1) * 3 + (Math.random() - 0.5) * 2,
      humidity: 50 + Math.cos(i * 0.15) * 15 + (Math.random() - 0.5) * 5,
      power: 1200 + Math.sin(i * 0.2) * 300 + (Math.random() - 0.5) * 100,
      vibration: 0.5 + Math.sin(i * 0.3) * 0.3 + (Math.random() - 0.5) * 0.1
    });
  }
  
  return data;
};

module.exports = {
  generateSensorData,
  generateChartData
};