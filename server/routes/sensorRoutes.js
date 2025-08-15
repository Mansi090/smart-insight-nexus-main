const express = require('express');
const router = express.Router();
const sensorService = require('../services/sensorService');

// Get current sensor data
router.get('/', (req, res) => {
  const sensorData = sensorService.generateSensorData();
  res.json(sensorData);
});

// Get historical chart data
router.get('/chart', (req, res) => {
  const hours = req.query.hours ? parseInt(req.query.hours) : 24;
  const chartData = sensorService.generateChartData(hours);
  res.json(chartData);
});

module.exports = router;