import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Settings as SettingsIcon, 
  Wifi, 
  Bell, 
  Shield, 
  Database,
  Zap,
  Save
} from 'lucide-react';

export default function Settings() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-3 bg-gradient-primary rounded-xl">
          <SettingsIcon className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold iot-gradient-text">
            System Settings
          </h1>
          <p className="text-muted-foreground">
            Configure IoT sensors, alerts, and system preferences
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Connection Settings */}
        <Card className="iot-card p-6">
          <div className="flex items-center space-x-3 mb-6">
            <Wifi className="w-5 h-5 text-primary" />
            <h3 className="font-semibold">Connection</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">MQTT Broker</label>
              <Input placeholder="mqtt://localhost:1883" value="mqtt://smartbuild.local:1883" />
            </div>
            
            <div>
              <label className="text-sm font-medium mb-2 block">WebSocket Port</label>
              <Input placeholder="8080" value="8080" />
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm">Auto-reconnect</span>
              <Switch defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm">SSL/TLS Encryption</span>
              <Switch defaultChecked />
            </div>
            
            <div className="pt-2">
              <Badge className="bg-success text-success-foreground">Connected</Badge>
            </div>
          </div>
        </Card>

        {/* Alert Settings */}
        <Card className="iot-card p-6">
          <div className="flex items-center space-x-3 mb-6">
            <Bell className="w-5 h-5 text-primary" />
            <h3 className="font-semibold">Alerts</h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">Critical Alerts</span>
              <Switch defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm">Warning Alerts</span>
              <Switch defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm">Info Notifications</span>
              <Switch />
            </div>
            
            <Separator />
            
            <div>
              <label className="text-sm font-medium mb-2 block">Email Notifications</label>
              <Input placeholder="admin@company.com" />
            </div>
            
            <div>
              <label className="text-sm font-medium mb-2 block">Alert Threshold (minutes)</label>
              <Input placeholder="5" value="5" />
            </div>
          </div>
        </Card>

        {/* Security Settings */}
        <Card className="iot-card p-6">
          <div className="flex items-center space-x-3 mb-6">
            <Shield className="w-5 h-5 text-primary" />
            <h3 className="font-semibold">Security</h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">Two-Factor Auth</span>
              <Switch defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm">API Key Rotation</span>
              <Switch defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm">Audit Logging</span>
              <Switch defaultChecked />
            </div>
            
            <Separator />
            
            <div>
              <label className="text-sm font-medium mb-2 block">Session Timeout (hours)</label>
              <Input placeholder="8" value="8" />
            </div>
            
            <Button variant="outline" size="sm" className="w-full">
              Regenerate API Keys
            </Button>
          </div>
        </Card>
      </div>

      {/* Data Management */}
      <Card className="iot-card p-6">
        <div className="flex items-center space-x-3 mb-6">
          <Database className="w-5 h-5 text-primary" />
          <h3 className="font-semibold">Data Management</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-4">
            <h4 className="font-medium">Data Retention</h4>
            <div>
              <label className="text-sm font-medium mb-2 block">Sensor Data (days)</label>
              <Input placeholder="90" value="90" />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Alert History (days)</label>
              <Input placeholder="30" value="30" />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Chat History (days)</label>
              <Input placeholder="365" value="365" />
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-medium">Backup Settings</h4>
            <div className="flex items-center justify-between">
              <span className="text-sm">Auto Backup</span>
              <Switch defaultChecked />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Backup Frequency</label>
              <select className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm">
                <option>Daily</option>
                <option>Weekly</option>
                <option>Monthly</option>
              </select>
            </div>
            <Button variant="outline" size="sm" className="w-full">
              Backup Now
            </Button>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-medium">Export Options</h4>
            <Button variant="outline" size="sm" className="w-full">
              Export Sensor Data
            </Button>
            <Button variant="outline" size="sm" className="w-full">
              Export Documents
            </Button>
            <Button variant="outline" size="sm" className="w-full">
              Export Configuration
            </Button>
            <div className="pt-2">
              <Badge variant="outline">Last export: 2 days ago</Badge>
            </div>
          </div>
        </div>
      </Card>

      {/* Performance Settings */}
      <Card className="iot-card p-6">
        <div className="flex items-center space-x-3 mb-6">
          <Zap className="w-5 h-5 text-primary" />
          <h3 className="font-semibold">Performance</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Sensor Update Interval (seconds)</label>
              <Input placeholder="5" value="5" />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Chart Refresh Rate (seconds)</label>
              <Input placeholder="10" value="10" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Enable Data Compression</span>
              <Switch defaultChecked />
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Max Concurrent Connections</label>
              <Input placeholder="100" value="100" />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Memory Usage Limit (MB)</label>
              <Input placeholder="512" value="512" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Enable Caching</span>
              <Switch defaultChecked />
            </div>
          </div>
        </div>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button className="px-8">
          <Save className="w-4 h-4 mr-2" />
          Save Settings
        </Button>
      </div>
    </div>
  );
}