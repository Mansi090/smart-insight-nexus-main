import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  AlertTriangle, 
  AlertCircle, 
  Info, 
  CheckCircle,
  Clock,
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Alert {
  id: string;
  type: 'critical' | 'warning' | 'info' | 'success';
  title: string;
  message: string;
  timestamp: Date;
  sensorId?: string;
  acknowledged?: boolean;
  actionRequired?: boolean;
}

interface AlertsPanelProps {
  alerts: Alert[];
  onAcknowledge?: (alertId: string) => void;
  onDismiss?: (alertId: string) => void;
  className?: string;
}

export const AlertsPanel: React.FC<AlertsPanelProps> = ({
  alerts,
  onAcknowledge,
  onDismiss,
  className
}) => {
  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'critical':
        return <AlertCircle className="w-5 h-5 text-destructive" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-warning" />;
      case 'info':
        return <Info className="w-5 h-5 text-iot-blue" />;
      case 'success':
        return <CheckCircle className="w-5 h-5 text-success" />;
      default:
        return <Info className="w-5 h-5 text-muted-foreground" />;
    }
  };

  const getAlertBadgeVariant = (type: string) => {
    switch (type) {
      case 'critical':
        return 'destructive';
      case 'warning':
        return 'secondary';
      case 'success':
        return 'default';
      default:
        return 'outline';
    }
  };

  const getPriorityAlerts = () => {
    return alerts
      .filter(alert => !alert.acknowledged)
      .sort((a, b) => {
        const priority = { critical: 3, warning: 2, info: 1, success: 0 };
        return priority[b.type] - priority[a.type];
      });
  };

  const priorityAlerts = getPriorityAlerts();

  return (
    <Card className={cn('iot-card h-full', className)}>
      <div className="p-6 border-b border-border/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-warning/10 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-warning" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">System Alerts</h3>
              <p className="text-sm text-muted-foreground">
                {priorityAlerts.length} active alerts
              </p>
            </div>
          </div>
          {priorityAlerts.length > 0 && (
            <Badge variant="destructive" className="animate-pulse">
              {priorityAlerts.filter(a => a.type === 'critical').length} Critical
            </Badge>
          )}
        </div>
      </div>

      <ScrollArea className="flex-1 p-6">
        {priorityAlerts.length === 0 ? (
          <div className="text-center py-8">
            <CheckCircle className="w-12 h-12 text-success mx-auto mb-4" />
            <h4 className="font-medium text-foreground mb-2">All Systems Normal</h4>
            <p className="text-sm text-muted-foreground">
              No active alerts at this time
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {priorityAlerts.map((alert) => (
              <div
                key={alert.id}
                className={cn(
                  'p-4 rounded-lg border transition-all duration-300 hover:shadow-sm',
                  alert.type === 'critical' && 'border-destructive/20 bg-destructive/5',
                  alert.type === 'warning' && 'border-warning/20 bg-warning/5',
                  alert.type === 'info' && 'border-iot-blue/20 bg-iot-blue/5',
                  alert.type === 'success' && 'border-success/20 bg-success/5'
                )}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    {getAlertIcon(alert.type)}
                    <div className="flex-1">
                      <h4 className="font-medium text-foreground text-sm">
                        {alert.title}
                      </h4>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge 
                          variant={getAlertBadgeVariant(alert.type)}
                          className="text-xs"
                        >
                          {alert.type.toUpperCase()}
                        </Badge>
                        {alert.sensorId && (
                          <Badge variant="outline" className="text-xs">
                            {alert.sensorId}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  {onDismiss && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDismiss(alert.id)}
                      className="h-6 w-6 p-0 text-muted-foreground hover:text-foreground"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>

                <p className="text-sm text-muted-foreground mb-3">
                  {alert.message}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    <span>{alert.timestamp.toLocaleString()}</span>
                  </div>

                  {alert.actionRequired && onAcknowledge && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onAcknowledge(alert.id)}
                      className="h-7 text-xs"
                    >
                      Acknowledge
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </ScrollArea>
    </Card>
  );
};