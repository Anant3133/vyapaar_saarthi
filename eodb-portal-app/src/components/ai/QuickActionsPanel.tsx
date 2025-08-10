import React from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';

interface QuickAction {
  title: string;
  query: string;
  icon: any;
}

interface QuickActionCategory {
  title: string;
  icon: any;
  actions: QuickAction[];
}

interface QuickActionsPanelProps {
  categories: QuickActionCategory[];
  onActionClick: (query: string) => void;
}

export function QuickActionsPanel({ categories, onActionClick }: QuickActionsPanelProps) {
  return (
    <div className="space-y-4">
      {categories.map((category, categoryIndex) => (
        <motion.div
          key={category.title}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: categoryIndex * 0.1 }}
        >
          <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center space-x-2 text-sm">
                <category.icon className="w-4 h-4" />
                <span>{category.title}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {category.actions.map((action, actionIndex) => (
                  <motion.div
                    key={action.title}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: (categoryIndex * 0.1) + (actionIndex * 0.05) }}
                  >
                    <Button
                      variant="ghost"
                      className="w-full justify-start h-auto p-3 text-left"
                      onClick={() => onActionClick(action.query)}
                    >
                      <div className="flex items-center space-x-3">
                        <action.icon className="w-4 h-4 text-blue-600 flex-shrink-0" />
                        <div>
                          <div className="text-sm font-medium">{action.title}</div>
                          <div className="text-xs text-muted-foreground truncate">
                            {action.query}
                          </div>
                        </div>
                      </div>
                    </Button>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}