import React from 'react';
import { motion } from 'motion/react';
import { Bot, User, Volume2, ThumbsUp, Bookmark, Copy, Clock, Brain } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  suggestions?: string[];
  actionItems?: any[];
  attachments?: any[];
  metadata?: {
    confidence?: number;
    processingTime?: number;
    sources?: string[];
    intent?: string;
  };
  liked?: boolean;
  bookmarked?: boolean;
  isTyping?: boolean;
}

interface MessageComponentProps {
  message: Message;
  onPlayAudio: (content: string) => void;
  onLike: (messageId: string) => void;
  onBookmark: (messageId: string) => void;
  onCopy: (content: string) => void;
  isSpeaking: boolean;
}

export function MessageComponent({
  message,
  onPlayAudio,
  onLike,
  onBookmark,
  onCopy,
  isSpeaking
}: MessageComponentProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
    >
      <div className={`flex items-start space-x-3 max-w-[85%] ${
        message.type === 'user' ? 'flex-row-reverse space-x-reverse' : 'flex-row'
      }`}>
        <Avatar className="w-8 h-8 flex-shrink-0">
          {message.type === 'user' ? (
            <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face" />
          ) : (
            <AvatarFallback className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              <Bot className="w-4 h-4" />
            </AvatarFallback>
          )}
        </Avatar>
        
        <div className={`${
          message.type === 'user' 
            ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white' 
            : 'bg-card border border-border'
        } rounded-2xl px-4 py-3 relative group shadow-sm`}>
          <div className="space-y-2">
            <p className="text-sm whitespace-pre-line leading-relaxed">{message.content}</p>
            
            {/* Metadata for bot messages */}
            {message.type === 'bot' && message.metadata && (
              <div className="flex items-center space-x-4 text-xs text-muted-foreground pt-2 border-t border-border/50">
                {message.metadata.confidence && (
                  <div className="flex items-center space-x-1">
                    <Brain className="w-3 h-3" />
                    <span>{message.metadata.confidence}% confident</span>
                  </div>
                )}
                {message.metadata.processingTime && (
                  <div className="flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>{message.metadata.processingTime}ms</span>
                  </div>
                )}
                {message.metadata.intent && (
                  <Badge variant="outline" className="text-xs">
                    {message.metadata.intent.replace('_', ' ')}
                  </Badge>
                )}
              </div>
            )}
            
            {/* Attachments */}
            {message.attachments && message.attachments.length > 0 && (
              <div className="space-y-2 pt-2 border-t border-border/50">
                {message.attachments.map((attachment, index) => (
                  <div key={index} className="flex items-center space-x-2 text-xs bg-accent/20 rounded p-2">
                    <span>{attachment.name}</span>
                    <span className="text-muted-foreground">({attachment.size})</span>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="flex items-center justify-between mt-3">
            <p className="text-xs opacity-70">
              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </p>
            
            {/* Message Actions */}
            <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
              {message.type === 'bot' && (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 text-xs"
                    onClick={() => onPlayAudio(message.content)}
                    disabled={isSpeaking}
                  >
                    <Volume2 className="w-3 h-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 text-xs"
                    onClick={() => onLike(message.id)}
                  >
                    <ThumbsUp className={`w-3 h-3 ${message.liked ? 'text-green-600' : ''}`} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 text-xs"
                    onClick={() => onBookmark(message.id)}
                  >
                    <Bookmark className={`w-3 h-3 ${message.bookmarked ? 'text-yellow-600' : ''}`} />
                  </Button>
                </>
              )}
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 text-xs"
                onClick={() => onCopy(message.content)}
              >
                <Copy className="w-3 h-3" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}