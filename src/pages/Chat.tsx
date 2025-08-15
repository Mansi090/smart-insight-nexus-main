import { useState, useRef, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { 
  MessageSquare, 
  Send, 
  Bot, 
  User, 
  FileText,
  Zap,
  Clock,
  CheckCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  type: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  sources?: string[];
  confidence?: number;
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'system',
      content: 'Welcome to the Smart Building AI Assistant! I can help you with maintenance questions, sensor data analysis, and operational optimization. What would you like to know?',
      timestamp: new Date(),
    },
    {
      id: '2',
      type: 'user',
      content: 'What is the current status of the HVAC system?',
      timestamp: new Date(Date.now() - 60000),
    },
    {
      id: '3',
      type: 'assistant',
      content: 'Based on current sensor readings, the HVAC system is operating normally. Temperature is maintained at 22.5°C with 45% humidity. Power consumption is slightly elevated at 1,250W, which is 15% above normal. I recommend checking the air filter status as this could indicate a restriction.',
      timestamp: new Date(Date.now() - 30000),
      sources: ['Sensor Data: TEMP-001, HUM-001, PWR-001', 'Maintenance Manual: HVAC-2024'],
      confidence: 0.92
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Simulate AI processing
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: generateAIResponse(inputValue),
        timestamp: new Date(),
        sources: ['Real-time Sensor Data', 'Building Maintenance Manual', 'Historical Performance Data'],
        confidence: 0.88 + Math.random() * 0.1
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 2000);
  };

  const generateAIResponse = (input: string): string => {
    const responses = [
      "Based on the latest sensor data and maintenance records, I can see that the system is performing within normal parameters. The temperature sensors indicate optimal conditions, and the predictive maintenance model suggests the next service interval should be in 3 weeks.",
      "I've analyzed the building's energy consumption patterns and identified a potential 12% efficiency improvement. The main recommendation is to adjust the HVAC schedule during off-peak hours and implement zone-based cooling controls.",
      "The vibration sensors on the main mechanical systems show normal readings. However, I notice a slight increase in Motor-003's vibration frequency over the past week. I recommend scheduling an inspection within the next 5 days to prevent potential failure.",
      "According to the integrated maintenance documentation and current sensor readings, the air filtration system is due for replacement. The pressure differential indicates 85% filter capacity usage. Replacing now would improve air quality and reduce energy consumption by approximately 8%.",
      "The building's smart lighting system is operating efficiently. Motion sensors indicate proper occupancy detection, and energy usage is 23% below baseline. The LED fixtures in Zone-C show slightly reduced luminosity and may need attention in the next maintenance cycle."
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const getMessageIcon = (type: string) => {
    switch (type) {
      case 'user':
        return <User className="w-5 h-5" />;
      case 'assistant':
        return <Bot className="w-5 h-5" />;
      default:
        return <MessageSquare className="w-5 h-5" />;
    }
  };

  const suggestedQueries = [
    "What's the maintenance schedule for this week?",
    "Analyze energy consumption patterns",
    "Check all sensor health status",
    "Predict next equipment failure",
    "Optimize HVAC efficiency"
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-3 bg-gradient-primary rounded-xl">
            <MessageSquare className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold iot-gradient-text">
              AI Assistant
            </h1>
            <p className="text-muted-foreground">
              RAG-powered maintenance and optimization assistant
            </p>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {suggestedQueries.map((query, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              onClick={() => setInputValue(query)}
              className="text-xs"
            >
              {query}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Chat Interface */}
        <div className="lg:col-span-3">
          <Card className="iot-card h-[700px] flex flex-col">
            {/* Messages */}
            <ScrollArea className="flex-1 p-6" ref={scrollAreaRef}>
              <div className="space-y-6">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      'flex space-x-4',
                      message.type === 'user' && 'flex-row-reverse space-x-reverse'
                    )}
                  >
                    <div className={cn(
                      'p-2 rounded-lg flex-shrink-0',
                      message.type === 'user' 
                        ? 'bg-primary text-primary-foreground' 
                        : message.type === 'assistant'
                        ? 'bg-iot-cyan/10 text-iot-cyan'
                        : 'bg-muted text-muted-foreground'
                    )}>
                      {getMessageIcon(message.type)}
                    </div>
                    
                    <div className={cn(
                      'flex-1 space-y-2',
                      message.type === 'user' && 'text-right'
                    )}>
                      <div className={cn(
                        'inline-block p-4 rounded-lg max-w-4xl',
                        message.type === 'user' 
                          ? 'bg-primary text-primary-foreground ml-auto' 
                          : 'bg-muted'
                      )}>
                        <p className="text-sm leading-relaxed">{message.content}</p>
                        
                        {message.sources && (
                          <div className="mt-3 pt-3 border-t border-border/50">
                            <div className="flex items-center space-x-2 mb-2">
                              <FileText className="w-4 h-4 text-muted-foreground" />
                              <span className="text-xs font-medium text-muted-foreground">Sources:</span>
                            </div>
                            <div className="flex flex-wrap gap-1">
                              {message.sources.map((source, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {source}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        {message.confidence && (
                          <div className="mt-2 flex items-center space-x-2">
                            <CheckCircle className="w-4 h-4 text-success" />
                            <span className="text-xs text-muted-foreground">
                              Confidence: {(message.confidence * 100).toFixed(0)}%
                            </span>
                          </div>
                        )}
                      </div>
                      
                      <div className={cn(
                        'flex items-center space-x-2 text-xs text-muted-foreground',
                        message.type === 'user' && 'justify-end'
                      )}>
                        <Clock className="w-3 h-3" />
                        <span>{message.timestamp.toLocaleTimeString()}</span>
                      </div>
                    </div>
                  </div>
                ))}
                
                {isLoading && (
                  <div className="flex space-x-4">
                    <div className="p-2 rounded-lg bg-iot-cyan/10 text-iot-cyan">
                      <Bot className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="bg-muted p-4 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                          <span className="text-sm text-muted-foreground">AI is thinking...</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            {/* Input */}
            <div className="p-6 border-t border-border/50">
              <div className="flex space-x-3">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about maintenance, sensor data, or system optimization..."
                  className="flex-1"
                  disabled={isLoading}
                />
                <Button 
                  onClick={handleSendMessage}
                  disabled={isLoading || !inputValue.trim()}
                  className="px-6"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Stats */}
          <Card className="iot-card p-6">
            <h3 className="font-semibold mb-4 flex items-center space-x-2">
              <Zap className="w-5 h-5 text-primary" />
              <span>System Status</span>
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Active Sensors</span>
                <Badge variant="outline">6/6</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Documents Indexed</span>
                <Badge variant="outline">127</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">AI Confidence</span>
                <Badge className="bg-success text-success-foreground">High</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Last Training</span>
                <span className="text-sm">2h ago</span>
              </div>
            </div>
          </Card>

          {/* Recent Recommendations */}
          <Card className="iot-card p-6">
            <h3 className="font-semibold mb-4">Recent Insights</h3>
            <div className="space-y-3">
              <div className="p-3 rounded-lg bg-success/10 border border-success/20">
                <p className="text-sm font-medium text-success mb-1">Energy Optimization</p>
                <p className="text-xs text-muted-foreground">8% reduction achieved</p>
              </div>
              <div className="p-3 rounded-lg bg-warning/10 border border-warning/20">
                <p className="text-sm font-medium text-warning mb-1">Maintenance Due</p>
                <p className="text-xs text-muted-foreground">Filter replacement needed</p>
              </div>
              <div className="p-3 rounded-lg bg-iot-blue/10 border border-iot-blue/20">
                <p className="text-sm font-medium text-iot-blue mb-1">Performance Alert</p>
                <p className="text-xs text-muted-foreground">Motor efficiency check</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}