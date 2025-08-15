import { Card } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { TrendingUp, BarChart3 } from 'lucide-react';

interface SensorDataPoint {
  timestamp: string;
  value: number;
  status?: 'normal' | 'warning' | 'critical';
}

interface SensorChartProps {
  title: string;
  data: SensorDataPoint[];
  unit: string;
  color?: string;
  type?: 'line' | 'area';
  className?: string;
}

export const SensorChart: React.FC<SensorChartProps> = ({
  title,
  data,
  unit,
  color = 'hsl(var(--primary))',
  type = 'area',
  className
}) => {
  const formatTooltipValue = (value: number) => {
    return [`${value.toFixed(2)} ${unit}`, title];
  };

  const formatXAxisTick = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const getGradientId = () => `gradient-${title.replace(/\s+/g, '-').toLowerCase()}`;

  return (
    <Card className={`chart-container ${className || ''}`}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <BarChart3 className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">{title}</h3>
            <p className="text-sm text-muted-foreground">
              Last 24 hours • {data.length} readings
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <TrendingUp className="w-4 h-4" />
          <span>Real-time</span>
        </div>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          {type === 'area' ? (
            <AreaChart data={data}>
              <defs>
                <linearGradient id={getGradientId()} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={color} stopOpacity={0.3}/>
                  <stop offset="95%" stopColor={color} stopOpacity={0.05}/>
                </linearGradient>
              </defs>
              <CartesianGrid 
                strokeDasharray="3 3" 
                stroke="hsl(var(--border))"
                strokeOpacity={0.3}
              />
              <XAxis 
                dataKey="timestamp"
                tickFormatter={formatXAxisTick}
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}${unit}`}
              />
              <Tooltip
                formatter={formatTooltipValue}
                labelFormatter={(timestamp) => new Date(timestamp).toLocaleString()}
                contentStyle={{
                  backgroundColor: 'hsl(var(--popover))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                  boxShadow: 'var(--shadow-card)'
                }}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke={color}
                strokeWidth={2}
                fill={`url(#${getGradientId()})`}
                dot={{ fill: color, strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: color, strokeWidth: 2, fill: 'hsl(var(--background))' }}
              />
            </AreaChart>
          ) : (
            <LineChart data={data}>
              <CartesianGrid 
                strokeDasharray="3 3" 
                stroke="hsl(var(--border))"
                strokeOpacity={0.3}
              />
              <XAxis 
                dataKey="timestamp"
                tickFormatter={formatXAxisTick}
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}${unit}`}
              />
              <Tooltip
                formatter={formatTooltipValue}
                labelFormatter={(timestamp) => new Date(timestamp).toLocaleString()}
                contentStyle={{
                  backgroundColor: 'hsl(var(--popover))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                  boxShadow: 'var(--shadow-card)'
                }}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke={color}
                strokeWidth={2}
                dot={{ fill: color, strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: color, strokeWidth: 2, fill: 'hsl(var(--background))' }}
              />
            </LineChart>
          )}
        </ResponsiveContainer>
      </div>

      <div className="flex items-center justify-between mt-4 pt-4 border-t border-border/50">
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }}></div>
            <span className="text-muted-foreground">Current: </span>
            <span className="font-medium text-foreground">
              {data[data.length - 1]?.value?.toFixed(2)} {unit}
            </span>
          </div>
        </div>
        <div className="text-xs text-muted-foreground">
          Updated {new Date().toLocaleTimeString()}
        </div>
      </div>
    </Card>
  );
};