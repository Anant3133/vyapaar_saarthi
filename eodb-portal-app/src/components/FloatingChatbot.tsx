import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MessageCircle, 
  X, 
  Send, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  Bot,
  User,
  Minimize2,
  Maximize2
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  type?: 'text' | 'quick-action' | 'suggestion';
}

interface FloatingChatbotProps {
  language: 'en' | 'hi';
  user?: any;
}

export function FloatingChatbot({ language, user }: FloatingChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [hasNewMessage, setHasNewMessage] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const translations = {
    en: {
      chatAssistant: 'AI Assistant',
      typePlaceholder: 'Type your message...',
      send: 'Send',
      minimize: 'Minimize',
      maximize: 'Maximize',
      close: 'Close',
      voiceInput: 'Voice Input',
      speakResponse: 'Speak Response',
      online: 'Online',
      thinking: 'AI is thinking...',
      welcomeMessage: `Hello ${user?.name || 'there'}! I'm your AI assistant for the EODB Portal. I can help you with:`,
      capabilities: [
        '📝 License applications and status',
        '🏢 Business registration guidance',
        '📊 Compliance tracking',
        '💡 Government schemes and incentives',
        '📋 Document requirements',
        '❓ General queries about the portal'
      ],
      quickActions: [
        'Check application status',
        'Required documents',
        'Government schemes',
        'Contact support'
      ],
      errorMessage: 'Sorry, I encountered an error. Please try again.',
      voiceNotSupported: 'Voice recognition is not supported in your browser.',
      listeningMessage: 'Listening... Speak now',
      suggestions: [
        'How do I apply for a trade license?',
        'What documents do I need for company registration?',
        'Show me available government schemes',
        'Help me track my application'
      ]
    },
    hi: {
      chatAssistant: 'AI सहायक',
      typePlaceholder: 'अपना संदेश टाइप करें...',
      send: 'भेजें',
      minimize: 'छोटा करें',
      maximize: 'बड़ा करें',
      close: 'बंद करें',
      voiceInput: 'वॉयस इनपुट',
      speakResponse: 'उत्तर सुनें',
      online: 'ऑनलाइन',
      thinking: 'AI सोच रहा है...',
      welcomeMessage: `नमस्ते ${user?.name || 'वहाँ'}! मैं EODB पोर्टल के लिए आपका AI सहायक हूँ। मैं इनमें आपकी मदद कर सकता हूँ:`,
      capabilities: [
        '📝 लाइसेंस आवेदन और स्थिति',
        '🏢 व्यवसाय पंजीकरण मार्गदर्शन',
        '📊 अनुपालन ट्रैकिंग',
        '💡 सरकारी योजनाएं और प्रोत्साहन',
        '📋 दस्तावेज़ आवश्यकताएं',
        '❓ पोर्टल के बारे में सामान्य प्रश्न'
      ],
      quickActions: [
        'आवेदन स्थिति जांचें',
        'आवश्यक दस्तावेज़',
        'सरकारी योजनाएं',
        'सहायता संपर्क'
      ],
      errorMessage: 'क्षमा करें, मुझे एक त्रुटि का सामना करना पड़ा। कृपया फिर से कोशिश करें।',
      voiceNotSupported: 'आपके ब्राउज़र में वॉयस पहचान समर्थित नहीं है।',
      listeningMessage: 'सुन रहा हूँ... अब बोलें',
      suggestions: [
        'मैं ट्रेड लाइसेंस के लिए कैसे आवेदन करूं?',
        'कंपनी पंजीकरण के लिए मुझे कौन से दस्तावेज़ चाहिए?',
        'मुझे उपलब्ध सरकारी योजनाएं दिखाएं',
        'मेरे आवेदन को ट्रैक करने में मदद करें'
      ]
    }
  };

  const t = translations[language];

  // Initialize welcome message
  useEffect(() => {
    if (messages.length === 0) {
      const welcomeMsg: Message = {
        id: '1',
        content: t.welcomeMessage,
        sender: 'bot',
        timestamp: new Date(),
        type: 'text'
      };
      setMessages([welcomeMsg]);
    }
  }, [language, user]);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && !isMinimized) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen, isMinimized]);

  const generateBotResponse = async (userMessage: string): Promise<string> => {
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

    const lowerMessage = userMessage.toLowerCase();

    // Business registration queries
    if (lowerMessage.includes('register') || lowerMessage.includes('registration') || lowerMessage.includes('पंजीकरण')) {
      return language === 'hi' 
        ? `व्यवसाय पंजीकरण के लिए:\n\n1. व्यवसाय प्रकार चुनें (प्रोप्राइटरशिप, पार्टनरशिप, LLP, प्राइवेट लिमिटेड)\n2. आवश्यक दस्तावेज़ तैयार करें\n3. ऑनलाइन आवेदन भरें\n4. शुल्क का भुगतान करें\n\nक्या आपको किसी विशेष चरण के बारे में और जानकारी चाहिए?`
        : `For business registration:\n\n1. Choose your business type (Proprietorship, Partnership, LLP, Private Limited)\n2. Prepare required documents\n3. Fill online application\n4. Pay fees\n\nWould you like more details about any specific step?`;
    }

    // License application queries
    if (lowerMessage.includes('license') || lowerMessage.includes('लाइसेंस')) {
      return language === 'hi'
        ? `लाइसेंस आवेदन के लिए:\n\n📋 आवश्यक दस्तावेज़:\n• PAN कार्ड\n• आधार कार्ड\n• व्यवसाय प्रमाण\n• पता प्रमाण\n\n⏱️ प्रसंस्करण समय: 7-15 दिन\n💰 शुल्क: व्यवसाय प्रकार के अनुसार\n\nकौन सा लाइसेंस चाहिए?`
        : `For license application:\n\n📋 Required documents:\n• PAN Card\n• Aadhaar Card\n• Business proof\n• Address proof\n\n⏱️ Processing time: 7-15 days\n💰 Fees: Based on business type\n\nWhich license do you need?`;
    }

    // Status check queries
    if (lowerMessage.includes('status') || lowerMessage.includes('track') || lowerMessage.includes('स्थिति')) {
      return language === 'hi'
        ? `आवेदन स्थिति जांचने के लिए:\n\n1. डैशबोर्ड पर जाएं\n2. "मेरे आवेदन" सेक्शन देखें\n3. आवेदन संख्या से खोजें\n\nया आप अपना आवेदन संदर्भ संख्या बता सकते हैं?`
        : `To check application status:\n\n1. Go to Dashboard\n2. Check "My Applications" section\n3. Search by application number\n\nOr you can provide your application reference number?`;
    }

    // Government schemes queries
    if (lowerMessage.includes('scheme') || lowerMessage.includes('incentive') || lowerMessage.includes('योजना')) {
      return language === 'hi'
        ? `उपलब्ध सरकारी योजनाएं:\n\n🚀 स्टार्टअप इंडिया\n💰 MUDRA लोन\n🏭 PLI योजना\n🌿 क्लीन एनर्जी सब्सिडी\n\nआपका व्यवसाय प्रकार क्या है? मैं आपके लिए सबसे उपयुक्त योजनाएं सुझा सकता हूं।`
        : `Available government schemes:\n\n🚀 Startup India\n💰 MUDRA Loan\n🏭 PLI Scheme\n🌿 Clean Energy Subsidy\n\nWhat's your business type? I can suggest the most suitable schemes for you.`;
    }

    // Default responses
    const defaultResponses = language === 'hi' ? [
      'मैं आपकी मदद करने के लिए यहाँ हूँ! कृपया अपना प्रश्न स्पष्ट रूप से बताएं।',
      'आप लाइसेंस, पंजीकरण, या अनुपालन के बारे में पूछ सकते हैं।',
      'मुझे और जानकारी दें ताकि मैं बेहतर सहायता कर सकूं।'
    ] : [
      'I\'m here to help! Please feel free to ask about licenses, registrations, or compliance.',
      'You can ask me about application status, required documents, or government schemes.',
      'Could you provide more details so I can assist you better?'
    ];

    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const botResponse = await generateBotResponse(inputValue);
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: botResponse,
        sender: 'bot',
        timestamp: new Date(),
        type: 'text'
      };

      setMessages(prev => [...prev, botMessage]);
      
      if (!isOpen || isMinimized) {
        setHasNewMessage(true);
      }
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: t.errorMessage,
        sender: 'bot',
        timestamp: new Date(),
        type: 'text'
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickAction = (action: string) => {
    setInputValue(action);
    handleSendMessage();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert(t.voiceNotSupported);
      return;
    }

    setIsListening(!isListening);
    // Voice recognition implementation would go here
  };

  const toggleSpeech = () => {
    setIsSpeaking(!isSpeaking);
    // Text-to-speech implementation would go here
  };

  const openChat = () => {
    setIsOpen(true);
    setHasNewMessage(false);
  };

  const closeChat = () => {
    setIsOpen(false);
    setIsMinimized(false);
  };

  return (
    <TooltipProvider>
      <div className="fixed bottom-6 right-6 z-50">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="mb-4"
            >
              <Card className={`w-80 sm:w-96 shadow-2xl border-0 bg-background/95 backdrop-blur-lg ${isMinimized ? 'h-16' : 'h-[32rem]'}`}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-4 py-3 border-b">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-sm font-medium">{t.chatAssistant}</CardTitle>
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        <span className="text-xs text-muted-foreground">{t.online}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setIsMinimized(!isMinimized)}
                          className="h-8 w-8 p-0"
                        >
                          {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{isMinimized ? t.maximize : t.minimize}</p>
                      </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={closeChat}
                          className="h-8 w-8 p-0"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{t.close}</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </CardHeader>

                {!isMinimized && (
                  <CardContent className="p-0 flex flex-col h-[28rem]">
                    {/* Messages Area */}
                    <ScrollArea className="flex-1 p-4">
                      <div className="space-y-4">
                        {messages.map((message) => (
                          <div
                            key={message.id}
                            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                          >
                            <div
                              className={`max-w-[80%] rounded-lg px-3 py-2 ${
                                message.sender === 'user'
                                  ? 'bg-blue-500 text-white ml-4'
                                  : 'bg-muted text-foreground mr-4'
                              }`}
                            >
                              <div className="flex items-start space-x-2">
                                {message.sender === 'bot' && (
                                  <Bot className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                )}
                                <div className="text-sm whitespace-pre-wrap">
                                  {message.content}
                                </div>
                                {message.sender === 'user' && (
                                  <User className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                )}
                              </div>
                              <div className="text-xs opacity-70 mt-1">
                                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </div>
                            </div>
                          </div>
                        ))}

                        {/* Quick Actions */}
                        {messages.length === 1 && (
                          <div className="space-y-3">
                            <div className="text-sm text-muted-foreground">
                              {t.capabilities.map((capability, index) => (
                                <div key={index} className="py-1">{capability}</div>
                              ))}
                            </div>
                            
                            <div className="flex flex-wrap gap-2">
                              {t.quickActions.map((action, index) => (
                                <Button
                                  key={index}
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleQuickAction(action)}
                                  className="text-xs"
                                >
                                  {action}
                                </Button>
                              ))}
                            </div>
                          </div>
                        )}

                        {isLoading && (
                          <div className="flex justify-start">
                            <div className="bg-muted rounded-lg px-3 py-2 mr-4">
                              <div className="flex items-center space-x-2">
                                <Bot className="w-4 h-4" />
                                <div className="text-sm">{t.thinking}</div>
                                <div className="flex space-x-1">
                                  <div className="w-1 h-1 bg-current rounded-full animate-bounce" />
                                  <div className="w-1 h-1 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                                  <div className="w-1 h-1 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                        
                        <div ref={messagesEndRef} />
                      </div>
                    </ScrollArea>

                    {/* Input Area */}
                    <div className="border-t p-4">
                      <div className="flex items-center space-x-2">
                        <div className="flex-1 relative">
                          <Input
                            ref={inputRef}
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder={t.typePlaceholder}
                            disabled={isLoading}
                            className="pr-20"
                          />
                          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={toggleVoiceInput}
                                  className={`h-6 w-6 p-0 ${isListening ? 'text-red-500' : ''}`}
                                >
                                  {isListening ? <MicOff className="w-3 h-3" /> : <Mic className="w-3 h-3" />}
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>{t.voiceInput}</p>
                              </TooltipContent>
                            </Tooltip>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={toggleSpeech}
                                  className={`h-6 w-6 p-0 ${isSpeaking ? 'text-blue-500' : ''}`}
                                >
                                  {isSpeaking ? <VolumeX className="w-3 h-3" /> : <Volume2 className="w-3 h-3" />}
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>{t.speakResponse}</p>
                              </TooltipContent>
                            </Tooltip>
                          </div>
                        </div>
                        <Button
                          onClick={handleSendMessage}
                          disabled={!inputValue.trim() || isLoading}
                          size="sm"
                          className="h-9 w-9 p-0"
                        >
                          <Send className="w-4 h-4" />
                        </Button>
                      </div>

                      {/* Suggestions */}
                      {messages.length <= 2 && (
                        <div className="mt-3 flex flex-wrap gap-1">
                          {t.suggestions.slice(0, 2).map((suggestion, index) => (
                            <Button
                              key={index}
                              variant="ghost"
                              size="sm"
                              onClick={() => setInputValue(suggestion)}
                              className="text-xs text-muted-foreground h-auto p-1 justify-start"
                            >
                              💡 {suggestion}
                            </Button>
                          ))}
                        </div>
                      )}
                    </div>
                  </CardContent>
                )}
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Chat Toggle Button */}
        <Tooltip>
          <TooltipTrigger asChild>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={isOpen ? closeChat : openChat}
                className="h-14 w-14 rounded-full shadow-lg bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 border-0 relative"
              >
                <AnimatePresence mode="wait">
                  {isOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X className="w-6 h-6 text-white" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="chat"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <MessageCircle className="w-6 h-6 text-white" />
                    </motion.div>
                  )}
                </AnimatePresence>
                
                {/* New message indicator */}
                {hasNewMessage && !isOpen && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center"
                  >
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="w-2 h-2 bg-white rounded-full"
                    />
                  </motion.div>
                )}
              </Button>
            </motion.div>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p>{t.chatAssistant}</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
}