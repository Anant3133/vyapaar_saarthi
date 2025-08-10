interface UserContext {
  userPreferences?: {
    language: 'en' | 'hi';
    businessType?: string;
    location?: string;
  };
  conversationHistory?: any[];
  currentSession?: {
    startTime: Date;
    messageCount: number;
    topics: string[];
  };
}

export class ContextManager {
  private context: UserContext = {};
  private conversationHistory: any[] = [];
  private sessionTopics: Set<string> = new Set();

  constructor() {
    this.context = {
      currentSession: {
        startTime: new Date(),
        messageCount: 0,
        topics: []
      }
    };
  }

  updateUserContext(newContext: Partial<UserContext>): void {
    this.context = { ...this.context, ...newContext };
  }

  addMessage(message: any): void {
    this.conversationHistory.push(message);
    if (this.context.currentSession) {
      this.context.currentSession.messageCount++;
    }

    // Extract topics from message content
    this.extractTopics(message.content);
  }

  private extractTopics(content: string): void {
    const topicKeywords = {
      'license': ['license', 'लाइसेंस'],
      'gst': ['gst', 'जीएसटी', 'tax'],
      'registration': ['registration', 'पंजीकरण'],
      'compliance': ['compliance', 'अनुपालन'],
      'scheme': ['scheme', 'योजना', 'benefit'],
      'document': ['document', 'दस्तावेज', 'paper']
    };

    const lowerContent = content.toLowerCase();
    
    for (const [topic, keywords] of Object.entries(topicKeywords)) {
      if (keywords.some(keyword => lowerContent.includes(keyword))) {
        this.sessionTopics.add(topic);
      }
    }

    if (this.context.currentSession) {
      this.context.currentSession.topics = Array.from(this.sessionTopics);
    }
  }

  getContextualPrompt(userQuery: string): string {
    const sessionContext = this.getSessionContext();
    const userPrefs = this.context.userPreferences;
    
    let contextualPrompt = userQuery;
    
    if (userPrefs?.businessType) {
      contextualPrompt += ` (Business type: ${userPrefs.businessType})`;
    }
    
    if (userPrefs?.location) {
      contextualPrompt += ` (Location: ${userPrefs.location})`;
    }

    if (sessionContext.topics.length > 0) {
      contextualPrompt += ` (Previous topics: ${sessionContext.topics.join(', ')})`;
    }

    return contextualPrompt;
  }

  getSmartSuggestions(): string[] {
    const topics = Array.from(this.sessionTopics);
    const suggestions: string[] = [];
    const language = this.context.userPreferences?.language || 'en';

    const topicSuggestions = {
      en: {
        'license': 'How to renew my license?',
        'gst': 'GST compliance requirements',
        'registration': 'Company registration process',
        'compliance': 'Upcoming compliance deadlines',
        'scheme': 'Eligible government schemes',
        'document': 'Document verification status'
      },
      hi: {
        'license': 'अपना लाइसेंस कैसे नवीनीकृत करें?',
        'gst': 'GST अनुपालन आवश्यकताएं',
        'registration': 'कंपनी पंजीकरण प्रक्रिया',
        'compliance': 'आगामी अनुपालन समय सीमा',
        'scheme': 'पात्र सरकारी योजनाएं',
        'document': 'दस्तावेज सत्यापन स्थिति'
      }
    };

    topics.forEach(topic => {
      const suggestion = topicSuggestions[language][topic];
      if (suggestion) {
        suggestions.push(suggestion);
      }
    });

    return suggestions.slice(0, 3); // Return max 3 suggestions
  }

  getSessionContext(): { topics: string[]; messageCount: number; duration: number } {
    const session = this.context.currentSession;
    if (!session) {
      return { topics: [], messageCount: 0, duration: 0 };
    }

    const duration = Date.now() - session.startTime.getTime();
    
    return {
      topics: session.topics,
      messageCount: session.messageCount,
      duration: Math.floor(duration / 1000) // in seconds
    };
  }

  getConversationSummary(): string {
    const sessionContext = this.getSessionContext();
    const language = this.context.userPreferences?.language || 'en';
    
    if (language === 'hi') {
      return `बातचीत सारांश: ${sessionContext.messageCount} संदेश, मुख्य विषय: ${sessionContext.topics.join(', ')}`;
    } else {
      return `Conversation summary: ${sessionContext.messageCount} messages, topics discussed: ${sessionContext.topics.join(', ')}`;
    }
  }

  exportContext(): any {
    return {
      context: this.context,
      conversationHistory: this.conversationHistory,
      sessionTopics: Array.from(this.sessionTopics),
      sessionContext: this.getSessionContext()
    };
  }

  reset(): void {
    this.conversationHistory = [];
    this.sessionTopics.clear();
    this.context = {
      ...this.context,
      currentSession: {
        startTime: new Date(),
        messageCount: 0,
        topics: []
      }
    };
  }
}