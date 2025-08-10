import React from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';

interface AnalyticsData {
  title: string;
  value: string;
  change: string;
  icon: any;
  color: string;
}

interface Capability {
  name: string;
  enabled: boolean;
  icon: any;
}

interface AnalyticsPanelProps {
  analytics: AnalyticsData[];
  capabilities: Capability[];
}

export function AnalyticsPanel({ analytics, capabilities }: AnalyticsPanelProps) {
  return (
    <div className="space-y-6">
      {/* Performance Analytics */}
      <Card className="bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>AI Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            {analytics.map((metric, index) => (
              <motion.div
                key={metric.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="space-y-2"
              >
                <div className="flex items-center space-x-2">
                  <metric.icon className={`w-4 h-4 ${metric.color}`} />
                  <span className="text-sm font-medium">{metric.title}</span>
                </div>
                <div className="text-lg font-bold">{metric.value}</div>
                <Badge variant="outline" className="text-xs">
                  {metric.change}
                </Badge>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Capabilities */}
      <Card className="bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>AI Capabilities</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {capabilities.map((capability, index) => (
              <motion.div
                key={capability.name}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="flex items-center justify-between p-2 rounded-lg bg-accent/20"
              >
                <div className="flex items-center space-x-2">
                  <capability.icon className="w-4 h-4 text-blue-600" />
                  <span className="text-sm">{capability.name}</span>
                </div>
                <div className={`w-2 h-2 rounded-full ${
                  capability.enabled ? 'bg-green-500' : 'bg-gray-300'
                }`} />
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Usage Statistics */}
      <Card className="bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Usage Today</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Queries Processed</span>
              <span>247/500</span>
            </div>
            <Progress value={49.4} className="h-2" />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Voice Interactions</span>
              <span>89/200</span>
            </div>
            <Progress value={44.5} className="h-2" />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Files Processed</span>
              <span>23/50</span>
            </div>
            <Progress value={46} className="h-2" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}