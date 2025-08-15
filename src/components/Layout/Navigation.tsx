import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  Activity, 
  MessageSquare, 
  Upload, 
  Shield, 
  Settings,
  Menu,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const navigation = [
  {
    name: 'Dashboard',
    href: '/',
    icon: Activity,
    description: 'Real-time sensor monitoring'
  },
  {
    name: 'AI Assistant',
    href: '/chat',
    icon: MessageSquare,
    description: 'RAG-powered maintenance chat'
  },
  {
    name: 'Documents',
    href: '/documents',
    icon: Upload,
    description: 'Upload manuals & specs'
  },
  {
    name: 'Security',
    href: '/security',
    icon: Shield,
    description: 'System security status'
  },
  {
    name: 'Settings',
    href: '/settings',
    icon: Settings,
    description: 'System configuration'
  }
];

export const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 lg:z-50 lg:bg-card lg:border-r lg:border-border">
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-center h-16 px-6 border-b border-border">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Activity className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold iot-gradient-text">
                SmartBuild
              </span>
            </div>
          </div>

          {/* Navigation Items */}
          <div className="flex-1 flex flex-col py-6 px-3 space-y-1">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    'nav-item flex items-center px-4 py-3 text-sm font-medium rounded-xl group',
                    isActive ? 'nav-item active' : 'text-muted-foreground hover:text-foreground'
                  )}
                >
                  <item.icon 
                    className={cn(
                      'mr-3 h-5 w-5 flex-shrink-0',
                      isActive ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'
                    )}
                  />
                  <div className="flex flex-col">
                    <span>{item.name}</span>
                    <span className="text-xs text-muted-foreground group-hover:text-foreground/70">
                      {item.description}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Status Indicator */}
          <div className="px-6 py-4 border-t border-border">
            <div className="flex items-center space-x-3">
              <div className="status-indicator status-online"></div>
              <div className="flex flex-col">
                <span className="text-sm font-medium">System Online</span>
                <span className="text-xs text-muted-foreground">All sensors connected</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div className="lg:hidden">
        {/* Mobile header */}
        <div className="flex items-center justify-between h-16 px-4 bg-card border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold iot-gradient-text">SmartBuild</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div className="fixed inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
            <div className="fixed top-0 right-0 w-full max-w-sm h-full bg-card border-l border-border shadow-xl">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between h-16 px-6 border-b border-border">
                  <span className="text-lg font-bold iot-gradient-text">Menu</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <X className="h-6 w-6" />
                  </Button>
                </div>
                <div className="flex-1 py-6 px-3 space-y-1">
                  {navigation.map((item) => {
                    const isActive = location.pathname === item.href;
                    return (
                      <Link
                        key={item.name}
                        to={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={cn(
                          'nav-item flex items-center px-4 py-3 text-sm font-medium rounded-xl',
                          isActive ? 'nav-item active' : 'text-muted-foreground'
                        )}
                      >
                        <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
                        <div className="flex flex-col">
                          <span>{item.name}</span>
                          <span className="text-xs text-muted-foreground">
                            {item.description}
                          </span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};