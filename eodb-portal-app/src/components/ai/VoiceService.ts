export class VoiceService {
  private synthesis: SpeechSynthesis | null = null;
  private recognition: any = null;
  private currentLanguage: 'en' | 'hi' = 'en';

  constructor() {
    if (typeof window !== 'undefined') {
      this.synthesis = window.speechSynthesis;
      
      // Initialize speech recognition
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        this.recognition = new SpeechRecognition();
        this.recognition.continuous = false;
        this.recognition.interimResults = false;
      }
    }
  }

  isSupported(): boolean {
    return !!(this.synthesis && this.recognition);
  }

  setLanguage(language: 'en' | 'hi'): void {
    this.currentLanguage = language;
    if (this.recognition) {
      this.recognition.lang = language === 'hi' ? 'hi-IN' : 'en-US';
    }
  }

  async speak(text: string, language: 'en' | 'hi' = this.currentLanguage): Promise<void> {
    if (!this.synthesis) return;

    return new Promise((resolve, reject) => {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language === 'hi' ? 'hi-IN' : 'en-US';
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 1;

      utterance.onend = () => resolve();
      utterance.onerror = (error) => reject(error);

      this.synthesis.speak(utterance);
    });
  }

  async startListening(): Promise<string> {
    if (!this.recognition) {
      throw new Error('Speech recognition not supported');
    }

    return new Promise((resolve, reject) => {
      this.recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        resolve(transcript);
      };

      this.recognition.onerror = (error: any) => {
        reject(error);
      };

      this.recognition.start();
    });
  }

  stopListening(): void {
    if (this.recognition) {
      this.recognition.stop();
    }
  }

  stopSpeaking(): void {
    if (this.synthesis) {
      this.synthesis.cancel();
    }
  }

  preprocessTextForSpeech(text: string, language: 'en' | 'hi'): string {
    // Remove special characters and format for better speech synthesis
    return text
      .replace(/[^\w\s\u0900-\u097F.,!?]/g, '') // Keep alphanumeric, spaces, Devanagari, and basic punctuation
      .replace(/\s+/g, ' ')
      .trim();
  }

  processVoiceCommand(transcript: string, language: 'en' | 'hi'): { intent: string; confidence: number } {
    const lowerTranscript = transcript.toLowerCase();
    
    const intents = {
      en: {
        'check_status': ['status', 'check', 'track', 'progress'],
        'apply_license': ['apply', 'license', 'application', 'register'],
        'get_documents': ['document', 'paper', 'requirement', 'need'],
        'show_schemes': ['scheme', 'benefit', 'incentive', 'program']
      },
      hi: {
        'check_status': ['स्थिति', 'जांच', 'ट्रैक', 'प्रगति'],
        'apply_license': ['आवेदन', 'लाइसेंस', 'पंजीकरण', 'रजिस्टर'],
        'get_documents': ['दस्तावेज', 'कागज', 'आवश्यकता', 'चाहिए'],
        'show_schemes': ['योजना', 'लाभ', 'प्रोत्साहन', 'कार्यक्रम']
      }
    };

    const langIntents = intents[language];
    let bestIntent = 'default';
    let maxConfidence = 0;

    for (const [intent, keywords] of Object.entries(langIntents)) {
      const matches = keywords.filter(keyword => lowerTranscript.includes(keyword)).length;
      const confidence = matches / keywords.length;
      
      if (confidence > maxConfidence) {
        maxConfidence = confidence;
        bestIntent = intent;
      }
    }

    return {
      intent: bestIntent,
      confidence: maxConfidence
    };
  }
}