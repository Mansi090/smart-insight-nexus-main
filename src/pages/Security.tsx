import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  Lock,
  Key,
  Eye,
  Clock,
  Activity
} from 'lucide-react';

interface SecurityEvent {
  id: string;
  type: 'login' | 'failed_login' | 'api_access' | 'configuration_change' | 'data_export';
  user: string;
  timestamp: Date;
  ip: string;
  success: boolean;
  details: string;
}

export default function Security() {
  const securityEvents: SecurityEvent[] = [
    {
      id: 'SEC-001',
      type: 'login',
      user: 'admin@smartbuild.com',
      timestamp: new Date(),
      ip: '192.168.1.100',
      success: true,
      details: 'Successful dashboard login'
    },
    {
      id: 'SEC-002',
      type: 'api_access',
      user: 'sensor-gateway',
      timestamp: new Date(Date.now() - 300000),
      ip: '192.168.1.205',
      success: true,
      details: 'API endpoint: /sensors/data'
    },
    {
      id: 'SEC-003',
      type: 'failed_login',
      user: 'unknown',
      timestamp: new Date(Date.now() - 600000),
      ip: '203.0.113.45',
      success: false,
      details: 'Failed login attempt - invalid credentials'
    },
    {
      id: 'SEC-004',
      type: 'configuration_change',
      user: 'admin@smartbuild.com',
      timestamp: new Date(Date.now() - 900000),
      ip: '192.168.1.100',
      success: true,
      details: 'Updated alert thresholds'
    }
  ];

  const getEventIcon = (type: string, success: boolean) => {
    if (!success) return <AlertTriangle className="w-4 h-4 text-destructive" />;
    
    switch (type) {
      case 'login':
        return <Eye className="w-4 h-4 text-success" />;
      case 'api_access':
        return <Key className="w-4 h-4 text-iot-blue" />;
      case 'configuration_change':
        return <Lock className="w-4 h-4 text-warning" />;
      default:
        return <Activity className="w-4 h-4 text-iot-cyan" />;
    }
  };

  const getEventBadge = (type: string, success: boolean) => {
    if (!success) return <Badge variant="destructive">Failed</Badge>;
    
    switch (type) {
      case 'login':
        return <Badge className="bg-success text-success-foreground">Login</Badge>;
      case 'api_access':
        return <Badge variant="outline">API Access</Badge>;
      case 'configuration_change':
        return <Badge className="bg-warning text-warning-foreground">Config Change</Badge>;
      case 'data_export':
        return <Badge className="bg-iot-purple text-white">Data Export</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-3 bg-gradient-primary rounded-xl">
          <Shield className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold iot-gradient-text">
            Security Monitor
          </h1>
          <p className="text-muted-foreground">
            System security status and access monitoring
          </p>
        </div>
      </div>

      {/* Security Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="iot-card p-6">
          <div className="flex items-center space-x-3">
            <CheckCircle className="w-8 h-8 text-success" />
            <div>
              <div className="text-2xl font-bold text-foreground">Secure</div>
              <div className="text-sm text-muted-foreground">System Status</div>
            </div>
          </div>
        </Card>
        
        <Card className="iot-card p-6">
          <div className="flex items-center space-x-3">
            <Eye className="w-8 h-8 text-iot-blue" />
            <div>
              <div className="text-2xl font-bold text-foreground">24</div>
              <div className="text-sm text-muted-foreground">Active Sessions</div>
            </div>
          </div>
        </Card>
        
        <Card className="iot-card p-6">
          <div className="flex items-center space-x-3">
            <AlertTriangle className="w-8 h-8 text-warning" />
            <div>
              <div className="text-2xl font-bold text-foreground">3</div>
              <div className="text-sm text-muted-foreground">Failed Attempts</div>
            </div>
          </div>
        </Card>
        
        <Card className="iot-card p-6">
          <div className="flex items-center space-x-3">
            <Key className="w-8 h-8 text-iot-cyan" />
            <div>
              <div className="text-2xl font-bold text-foreground">156</div>
              <div className="text-sm text-muted-foreground">API Calls/hr</div>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Security Score */}
        <Card className="iot-card p-6">
          <div className="flex items-center space-x-3 mb-6">
            <Shield className="w-5 h-5 text-primary" />
            <h3 className="font-semibold">Security Score</h3>
          </div>
          
          <div className="space-y-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-success mb-2">94%</div>
              <p className="text-sm text-muted-foreground">Overall Security Rating</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Authentication</span>
                  <span className="text-success">100%</span>
                </div>
                <Progress value={100} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Encryption</span>
                  <span className="text-success">98%</span>
                </div>
                <Progress value={98} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Access Control</span>
                  <span className="text-success">95%</span>
                </div>
                <Progress value={95} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Network Security</span>
                  <span className="text-warning">85%</span>
                </div>
                <Progress value={85} className="h-2" />
              </div>
            </div>
          </div>
        </Card>

        {/* Active Threats */}
        <Card className="iot-card p-6">
          <div className="flex items-center space-x-3 mb-6">
            <AlertTriangle className="w-5 h-5 text-primary" />
            <h3 className="font-semibold">Threat Detection</h3>
          </div>
          
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-warning/10 border border-warning/20">
              <div className="flex items-center space-x-3 mb-2">
                <AlertTriangle className="w-4 h-4 text-warning" />
                <span className="font-medium text-warning">Suspicious Activity</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Multiple failed login attempts from IP: 203.0.113.45
              </p>
              <div className="flex justify-between items-center mt-3">
                <span className="text-xs text-muted-foreground">10 minutes ago</span>
                <Button variant="outline" size="sm">Block IP</Button>
              </div>
            </div>
            
            <div className="p-4 rounded-lg bg-success/10 border border-success/20">
              <div className="flex items-center space-x-3 mb-2">
                <CheckCircle className="w-4 h-4 text-success" />
                <span className="font-medium text-success">All Clear</span>
              </div>
              <p className="text-sm text-muted-foreground">
                No active threats detected in the last 24 hours
              </p>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Blocked IPs (Last 24h)</h4>
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="font-mono">192.0.2.146</span>
                  <span className="text-muted-foreground">2h ago</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="font-mono">198.51.100.22</span>
                  <span className="text-muted-foreground">8h ago</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="font-mono">203.0.113.15</span>
                  <span className="text-muted-foreground">14h ago</span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Compliance Status */}
        <Card className="iot-card p-6">
          <div className="flex items-center space-x-3 mb-6">
            <Lock className="w-5 h-5 text-primary" />
            <h3 className="font-semibold">Compliance</h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">GDPR Compliance</span>
              <Badge className="bg-success text-success-foreground">Compliant</Badge>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm">ISO 27001</span>
              <Badge className="bg-success text-success-foreground">Certified</Badge>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm">SOC 2 Type II</span>
              <Badge variant="secondary">In Progress</Badge>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm">Data Encryption</span>
              <Badge className="bg-success text-success-foreground">AES-256</Badge>
            </div>
            
            <div className="space-y-2 pt-4 border-t border-border/50">
              <h4 className="font-medium text-sm">Recent Audits</h4>
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>Security Audit</span>
                  <span className="text-muted-foreground">30 days ago</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Penetration Test</span>
                  <span className="text-muted-foreground">90 days ago</span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Security Events Log */}
      <Card className="iot-card">
        <div className="p-6 border-b border-border/50">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Security Events</h3>
            <Button variant="outline" size="sm">
              Export Logs
            </Button>
          </div>
        </div>
        
        <ScrollArea className="h-[400px]">
          <div className="p-6 space-y-4">
            {securityEvents.map((event) => (
              <div key={event.id} className="flex items-start space-x-4 p-4 rounded-lg hover:bg-muted/50 transition-colors">
                {getEventIcon(event.type, event.success)}
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-3 mb-2">
                    {getEventBadge(event.type, event.success)}
                    <span className="font-medium text-sm">{event.user}</span>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-2">
                    {event.details}
                  </p>
                  
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{event.timestamp.toLocaleString()}</span>
                    </div>
                    <span className="font-mono">{event.ip}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </Card>
    </div>
  );
}