export class AIEngine {
  private responseTemplates: Record<string, Record<string, string[]>>;

  constructor() {
    this.responseTemplates = {
      en: {
        greeting: [
          "Hello! I'm your AI Assistant for the EODB Portal. How can I help you today?",
          "Welcome! I'm here to assist you with government processes and business compliance.",
          "Hi there! I can help you with license applications, registrations, and compliance queries."
        ],
        license: [
          "For trade license applications, you'll need: 1) Business registration proof, 2) Identity documents, 3) Address proof, 4) NOC from local authority. Processing typically takes 7-14 days.",
          "Trade licenses require specific documentation based on your business type. I can guide you through the process step by step.",
          "The trade license application involves document verification, technical review, and final approval stages."
        ],
        gst: [
          "GST registration requires: 1) PAN card, 2) Aadhaar card, 3) Business proof, 4) Bank account details, 5) Address proof. Usually takes 3-7 working days.",
          "For GST registration, you'll need to provide business incorporation documents, identity proofs, and bank account details.",
          "GST registration is mandatory for businesses with turnover above ₹40 lakhs. I can help you with the application process."
        ],
        status: [
          "To check your application status, please provide your application ID. You can also check the Dashboard section for real-time updates.",
          "Application status can be tracked using your reference number. Would you like me to guide you to the tracking section?",
          "You can monitor your application progress through the Compliance Tracker or Dashboard analytics."
        ],
        schemes: [
          "Popular government schemes include: Startup India (tax benefits), MSME Development (funding support), Digital India (technology adoption), and PM SVANidhi (street vendor loans).",
          "Based on your business type, I can recommend specific schemes. Are you looking for funding, tax benefits, or skill development programs?",
          "Government incentives vary by sector, location, and business size. I can help you find eligible schemes."
        ],
        documents: [
          "Required documents vary by application type. Common documents include: PAN card, Aadhaar, address proof, business registration, and bank details.",
          "Document requirements depend on the specific license or registration you're applying for. Which service are you interested in?",
          "I can provide a complete checklist of documents for your specific application type."
        ],
        default: [
          "I can help you with license applications, GST registration, compliance queries, scheme information, and government processes. What would you like to know?",
          "I'm here to assist with all aspects of business compliance and government procedures. How can I help you today?",
          "Feel free to ask about any government process, application status, or business compliance requirement."
        ]
      },
      hi: {
        greeting: [
          "नमस्ते! मैं EODB पोर्टल का AI सहायक हूं। आज मैं आपकी कैसे सहायता कर सकता हूं?",
          "स्वागत है! मैं सरकारी प्रक्रियाओं और व्यापारिक अनुपालन में आपकी सहायता के लिए यहां हूं।",
          "नमस्कार! मैं लाइसेंस आवेदन, पंजीकरण और अनुपालन प्रश्नों में आपकी मदद कर सकता हूं।"
        ],
        license: [
          "ट्रेड लाइसेंस के लिए आवश्यक: 1) व्यापार पंजीकरण प्रमाण, 2) पहचान दस्तावेज, 3) पता प्रमाण, 4) स्थानीय प्राधिकरण से NOC। प्रक्रिया में 7-14 दिन लगते हैं।",
          "ट्रेड लाइसेंस के लिए आपके व्यापार प्रकार के आधार पर विशिष्ट दस्तावेज चाहिए। मैं चरणबद्ध मार्गदर्शन कर सकता हूं।",
          "ट्रेड लाइसेंस आवेदन में दस्तावेज सत्यापन, तकनीकी समीक्षा और अंतिम अनुमोदन शामिल है।"
        ],
        gst: [
          "GST पंजीकरण के लिए: 1) PAN कार्ड, 2) आधार कार्ड, 3) व्यापार प्रमाण, 4) बैंक खाता विवरण, 5) पता प्रमाण। आमतौर पर 3-7 दिन लगते हैं।",
          "GST पंजीकरण के लिए व्यापार निगमन दस्तावेज, पहचान प्रमाण और बैंक खाता विवरण की आवश्यकता होती है।",
          "40 लाख से अधिक टर्नओवर वाले व्यापार के लिए GST पंजीकरण अनिवार्य है। मैं आवेदन प्रक्रिया में मदद कर सकता हूं।"
        ],
        status: [
          "आवेदन स्थिति जांचने के लिए कृपया आवेदन ID प्रदान करें। रियल-टाइम अपडेट के लिए डैशबोर्ड भी देख सकते हैं।",
          "आवेदन की स्थिति संदर्भ संख्या से ट्रैक की जा सकती है। क्या मैं आपको ट्रैकिंग सेक्शन तक ले जाऊं?",
          "आप अपने आवेदन की प्रगति अनुपालन ट्रैकर या डैशबोर्ड एनालिटिक्स के माध्यम से देख सकते हैं।"
        ],
        schemes: [
          "लोकप्रिय सरकारी योजनाएं: स्टार्टअप इंडिया (कर लाभ), MSME विकास (फंडिंग), डिजिटल इंडिया (तकनीक अपनाना), PM SVANidhi (स्ट्रीट वेंडर लोन)।",
          "आपके व्यापार प्रकार के आधार पर मैं विशिष्ट योजनाओं की सिफारिश कर सकता हूं। क्या आप फंडिंग, कर लाभ या कौशल विकास कार्यक्रम खोज रहे हैं?",
          "सरकारी प्रोत्साहन सेक्टर, स्थान और व्यापार आकार के अनुसार भिन्न होते हैं। मैं पात्र योजनाएं खोजने में मदद कर सकता हूं।"
        ],
        documents: [
          "आवश्यक दस्तावेज आवेदन प्रकार के अनुसार भिन्न होते हैं। सामान्य दस्तावेज: PAN कार्ड, आधार, पता प्रमाण, व्यापार पंजीकरण और बैंक विवरण।",
          "दस्तावेज आवश्यकताएं उस विशिष्ट लाइसेंस या पंजीकरण पर निर्भर करती हैं जिसके लिए आप आवेदन कर रहे हैं। आप किस सेवा में रुचि रखते हैं?",
          "मैं आपके विशिष्ट आवेदन प्रकार के लिए दस्तावेजों की पूर्ण चेकलिस्ट प्रदान कर सकता हूं।"
        ],
        default: [
          "मैं लाइसेंस आवेदन, GST पंजीकरण, अनुपालन प्रश्न, योजना जानकारी और सरकारी प्रक्रियाओं में मदद कर सकता हूं। आप क्या जानना चाहते हैं?",
          "मैं व्यापारिक अनुपालन और सरकारी प्रक्रियाओं के सभी पहलुओं में सहायता के लिए यहां हूं। आज मैं आपकी कैसे मदद कर सकता हूं?",
          "किसी भी सरकारी प्रक्रिया, आवेदन स्थिति या व्यापारिक अनुपालन आवश्यकता के बारे में पूछने में संकोच न करें।"
        ]
      }
    };
  }

  async processQuery(query: string, language: 'en' | 'hi' = 'en'): Promise<{
    response: string;
    suggestions: string[];
    actionItems?: any[];
    relatedInfo?: any[];
  }> {
    const lowerQuery = query.toLowerCase();
    const langTemplates = this.responseTemplates[language];

    let category = 'default';
    
    // Intent recognition
    if (lowerQuery.includes('hello') || lowerQuery.includes('hi') || lowerQuery.includes('नमस्ते') || lowerQuery.includes('स्वागत')) {
      category = 'greeting';
    } else if (lowerQuery.includes('license') || lowerQuery.includes('लाइसेंस') || lowerQuery.includes('trade')) {
      category = 'license';
    } else if (lowerQuery.includes('gst') || lowerQuery.includes('जीएसटी') || lowerQuery.includes('tax')) {
      category = 'gst';
    } else if (lowerQuery.includes('status') || lowerQuery.includes('स्थिति') || lowerQuery.includes('track')) {
      category = 'status';
    } else if (lowerQuery.includes('scheme') || lowerQuery.includes('योजना') || lowerQuery.includes('incentive')) {
      category = 'schemes';
    } else if (lowerQuery.includes('document') || lowerQuery.includes('दस्तावेज') || lowerQuery.includes('paper')) {
      category = 'documents';
    }

    const responses = langTemplates[category];
    const response = responses[Math.floor(Math.random() * responses.length)];

    const suggestions = this.generateSuggestions(category, language);
    const actionItems = this.generateActionItems(category, language);

    return {
      response,
      suggestions,
      actionItems,
      relatedInfo: []
    };
  }

  private generateSuggestions(category: string, language: 'en' | 'hi'): string[] {
    const suggestions = {
      en: {
        greeting: ['How to apply for trade license?', 'GST registration process', 'Check application status', 'Available government schemes'],
        license: ['Required documents for trade license', 'License application fees', 'Processing timeline', 'Renewal procedure'],
        gst: ['GST registration documents', 'Tax filing process', 'GST rates and slabs', 'Compliance requirements'],
        status: ['Track application progress', 'Download certificate', 'Contact support', 'Update application'],
        schemes: ['Startup India benefits', 'MSME loan schemes', 'Tax incentives', 'Export promotion schemes'],
        documents: ['Document verification', 'Digital signature', 'Notarization requirements', 'Translation needs'],
        default: ['License applications', 'Registration services', 'Compliance tracker', 'Government schemes']
      },
      hi: {
        greeting: ['ट्रेड लाइसेंस के लिए कैसे आवेदन करें?', 'GST पंजीकरण प्रक्रिया', 'आवेदन की स्थिति जांचें', 'उपलब्ध सरकारी योजनाएं'],
        license: ['ट्रेड लाइसेंस के लिए आवश्यक दस्तावेज', 'लाइसेंस आवेदन शुल्क', 'प्रसंस्करण समयसीमा', 'नवीनीकरण प्रक्रिया'],
        gst: ['GST पंजीकरण दस्तावेज', 'कर फाइलिंग प्रक्रिया', 'GST दरें और स्लैब', 'अनुपालन आवश्यकताएं'],
        status: ['आवेदन प्रगति ट्रैक करें', 'प्रमाणपत्र डाउनलोड करें', 'सहायता से संपर्क करें', 'आवेदन अपडेट करें'],
        schemes: ['स्टार्टअप इंडिया लाभ', 'MSME लोन योजनाएं', 'कर प्रोत्साहन', 'निर्यात संवर्धन योजनाएं'],
        documents: ['दस्तावेज सत्यापन', 'डिजिटल हस्ताक्षर', 'नोटरीकरण आवश्यकताएं', 'अनुवाद आवश्यकताएं'],
        default: ['लाइसेंस आवेदन', 'पंजीकरण सेवाएं', 'अनुपालन ट्रैकर', 'सरकारी योजनाएं']
      }
    };

    return suggestions[language][category] || suggestions[language].default;
  }

  private generateActionItems(category: string, language: 'en' | 'hi'): any[] {
    if (category === 'license') {
      return [
        {
          title: language === 'en' ? 'Start License Application' : 'लाइसेंस आवेदन शुरू करें',
          status: language === 'en' ? 'Available' : 'उपलब्ध',
          actions: ['view_details', 'start_application']
        }
      ];
    } else if (category === 'status') {
      return [
        {
          title: language === 'en' ? 'Track Application' : 'आवेदन ट्रैक करें',
          status: language === 'en' ? 'Active' : 'सक्रिय',
          actions: ['track_progress', 'view_details']
        }
      ];
    }
    return [];
  }
}