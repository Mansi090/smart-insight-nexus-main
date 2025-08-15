import { useState, useEffect } from 'react';
import { SensorCard } from '@/components/Dashboard/SensorCard';
import { AlertsPanel } from '@/components/Dashboard/AlertsPanel';
import { SensorChart } from '@/components/Dashboard/SensorChart';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Thermometer, 
  Droplets, 
  Zap, 
  Activity,
  Wind,
  Gauge
} from 'lucide-react';

// Mock data generator for real-time simulation
const generateSensorData = () => {
  const now = new Date();
  const sensorData = [
    {
      id: 'TEMP-001',
      name: 'Temperature',
      value: 22.5 + (Math.random() - 0.5) * 4,
      unit: '°C',
      status: 'normal' as const,
      trend: 'stable' as const,
      lastUpdated: now,
      icon: Thermometer,
      threshold: { min: 18, max: 26 }
    },
    {
      id: 'HUM-001',
      name: 'Humidity',
      value: 45 + (Math.random() - 0.5) * 20,
      unit: '%',
      status: 'normal' as const,
      trend: 'down' as const,
      lastUpdated: now,
      icon: Droplets,
      threshold: { min: 30, max: 70 }
    },
    {
      id: 'PWR-001',
      name: 'Power Usage',
      value: 1250 + (Math.random() - 0.5) * 500,
      unit: 'W',
      status: 'warning' as const,
      trend: 'up' as const,
      lastUpdated: now,
      icon: Zap,
      threshold: { min: 800, max: 1500 }
    },
    {
      id: 'VIB-001',
      name: 'Vibration',
      value: 0.8 + Math.random() * 0.4,
      unit: 'Hz',
      status: 'normal' as const,
      trend: 'stable' as const,
      lastUpdated: now,
      icon: Activity,
      threshold: { min: 0, max: 2 }
    },
    {
      id: 'AIR-001',
      name: 'Air Quality',
      value: 85 + Math.random() * 10,
      unit: 'AQI',
      status: 'normal' as const,
      trend: 'up' as const,
      lastUpdated: now,
      icon: Wind,
      threshold: { min: 0, max: 100 }
    },
    {
      id: 'PRE-001',
      name: 'Pressure',
      value: 1013 + (Math.random() - 0.5) * 10,
      unit: 'hPa',
      status: 'normal' as const,
      trend: 'stable' as const,
      lastUpdated: now,
      icon: Gauge,
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
        status: (isOutOfRange ? 'critical' : isNearLimit ? 'warning' : 'normal') as 'normal' | 'warning' | 'critical'
      };
    }
    return sensor;
  });
};

// Generate chart data
const generateChartData = (hours: number = 24) => {
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

export default function Dashboard() {
  const [sensorData, setSensorData] = useState(generateSensorData());
  const [chartData] = useState(generateChartData());
  const [alerts] = useState([
    {
      id: 'ALT-001',
      type: 'warning' as const,
      title: 'High Power Consumption',
      message: 'Power usage has increased by 15% in the last hour. Consider checking HVAC efficiency.',
      timestamp: new Date(),
      sensorId: 'PWR-001',
      actionRequired: true,
      acknowledged: false
    },
    {
      id: 'ALT-002',
      type: 'info' as const,
      title: 'Maintenance Scheduled',
      message: 'Regular filter replacement scheduled for tomorrow at 9:00 AM.',
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      actionRequired: false,
      acknowledged: false
    },
    {
      id: 'ALT-003',
      type: 'success' as const,
      title: 'System Optimization Complete',
      message: 'Automated energy optimization has reduced consumption by 8%.',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      actionRequired: false,
      acknowledged: false
    }
  ]);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setSensorData(generateSensorData());
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleAcknowledgeAlert = (alertId: string) => {
    console.log('Acknowledging alert:', alertId);
    // In a real app, this would update the alert status
  };

  const handleDismissAlert = (alertId: string) => {
    console.log('Dismissing alert:', alertId);
    // In a real app, this would remove or hide the alert
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold iot-gradient-text mb-2">
            IoT Dashboard
          </h1>
          <p className="text-muted-foreground">
            Real-time monitoring of smart building systems
          </p>
        </div>
        <div className="flex items-center space-x-4 mt-4 lg:mt-0">
          <Badge variant="outline" className="text-success border-success/20">
            All Systems Online
          </Badge>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <div className="status-indicator status-online"></div>
            <span>Live Updates</span>
          </div>
        </div>
      </div>

      {/* Sensor Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sensorData.map((sensor) => (
          <SensorCard key={sensor.id} sensor={sensor} />
        ))}
      </div>

      {/* Charts and Alerts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Temperature Chart */}
        <div className="lg:col-span-2">
          <SensorChart
            title="Temperature Monitoring"
            data={chartData.map(d => ({
              timestamp: d.timestamp,
              value: d.temperature
            }))}
            unit="°C"
            color="hsl(var(--iot-cyan))"
            type="area"
          />
        </div>

        {/* Alerts Panel */}
        <div>
          <AlertsPanel
            alerts={alerts}
            onAcknowledge={handleAcknowledgeAlert}
            onDismiss={handleDismissAlert}
          />
        </div>
      </div>

      {/* Additional Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SensorChart
          title="Power Consumption"
          data={chartData.map(d => ({
            timestamp: d.timestamp,
            value: d.power
          }))}
          unit="W"
          color="hsl(var(--iot-orange))"
          type="area"
        />
        
        <SensorChart
          title="Humidity Levels"
          data={chartData.map(d => ({
            timestamp: d.timestamp,
            value: d.humidity
          }))}
          unit="%"
          color="hsl(var(--iot-blue))"
          type="line"
        />
      </div>

      {/* System Overview */}
      <Card className="iot-card p-6">
        <h3 className="text-lg font-semibold mb-4">System Overview</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-success mb-1">98.5%</div>
            <div className="text-sm text-muted-foreground">Uptime</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary mb-1">24/7</div>
            <div className="text-sm text-muted-foreground">Monitoring</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-iot-cyan mb-1">{sensorData.length}</div>
            <div className="text-sm text-muted-foreground">Active Sensors</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-warning mb-1">
              {alerts.filter(a => !a.acknowledged).length}
            </div>
            <div className="text-sm text-muted-foreground">Active Alerts</div>
          </div>
        </div>
      </Card>
    </div>
  );
}