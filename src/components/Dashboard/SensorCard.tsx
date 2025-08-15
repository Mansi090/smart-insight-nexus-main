import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface SensorData {
  id: string;
  name: string;
  value: number;
  unit: string;
  status: 'normal' | 'warning' | 'critical';
  trend: 'up' | 'down' | 'stable';
  lastUpdated: Date;
  icon?: React.ComponentType<{ className?: string }>;
  threshold?: {
    min: number;
    max: number;
  };
}

interface SensorCardProps {
  sensor: SensorData;
  className?: string;
}

export const SensorCard: React.FC<SensorCardProps> = ({ sensor, className }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal':
        return 'text-success';
      case 'warning':
        return 'text-warning';
      case 'critical':
        return 'text-destructive';
      default:
        return 'text-muted-foreground';
    }
  };

  const getStatusIndicator = (status: string) => {
    switch (status) {
      case 'normal':
        return 'status-indicator status-online';
      case 'warning':
        return 'status-indicator status-warning';
      case 'critical':
        return 'status-indicator status-error';
      default:
        return 'status-indicator';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-success" />;
      case 'down':
        return <TrendingDown className="w-4 h-4 text-destructive" />;
      default:
        return <Minus className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getProgressPercentage = () => {
    if (!sensor.threshold) return 50;
    const { min, max } = sensor.threshold;
    const range = max - min;
    const position = ((sensor.value - min) / range) * 100;
    return Math.max(0, Math.min(100, position));
  };

  return (
    <Card className={cn('iot-card p-6 hover:shadow-glow transition-all duration-300', className)}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          {sensor.icon && (
            <div className="p-2 bg-primary/10 rounded-lg">
              <sensor.icon className="w-5 h-5 text-primary" />
            </div>
          )}
          <div>
            <h3 className="font-medium text-foreground">{sensor.name}</h3>
            <p className="text-sm text-muted-foreground">
              Last updated: {sensor.lastUpdated.toLocaleTimeString()}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {getTrendIcon(sensor.trend)}
          <div className={getStatusIndicator(sensor.status)}></div>
        </div>
      </div>

      <div className="space-y-4">
        {/* Main reading */}
        <div className="flex items-baseline space-x-2">
          <span className="sensor-reading">
            {sensor.value.toFixed(1)}
          </span>
          <span className="text-lg text-muted-foreground font-medium">
            {sensor.unit}
          </span>
        </div>

        {/* Status and threshold */}
        {sensor.threshold && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Range:</span>
              <span className="text-foreground">
                {sensor.threshold.min} - {sensor.threshold.max} {sensor.unit}
              </span>
            </div>
            <div className="w-full bg-secondary rounded-full h-2">
              <div
                className={cn(
                  'h-2 rounded-full transition-all duration-500',
                  sensor.status === 'normal' ? 'bg-success' :
                  sensor.status === 'warning' ? 'bg-warning' : 'bg-destructive'
                )}
                style={{ width: `${getProgressPercentage()}%` }}
              />
            </div>
          </div>
        )}

        <div className="flex items-center justify-between pt-2 border-t border-border/50">
          <span className={cn('text-sm font-medium', getStatusColor(sensor.status))}>
            {sensor.status.charAt(0).toUpperCase() + sensor.status.slice(1)}
          </span>
          <span className="text-xs text-muted-foreground">
            ID: {sensor.id}
          </span>
        </div>
      </div>
    </Card>
  );
};