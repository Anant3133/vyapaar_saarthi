export const generateAdvancedResponse = (query: string, language: 'en' | 'hi') => {
  const lowerQuery = query.toLowerCase();
  
  // Intent detection
  let intent = 'general';
  let confidence = 85;
  
  if (lowerQuery.includes('license') || lowerQuery.includes('लाइसेंस')) {
    intent = 'license_inquiry';
    confidence = 95;
  } else if (lowerQuery.includes('gst') || lowerQuery.includes('जीएसटी')) {
    intent = 'tax_inquiry';
    confidence = 93;
  } else if (lowerQuery.includes('document') || lowerQuery.includes('दस्तावेज')) {
    intent = 'document_inquiry';
    confidence = 90;
  } else if (lowerQuery.includes('scheme') || lowerQuery.includes('योजना')) {
    intent = 'scheme_inquiry';
    confidence = 88;
  } else if (lowerQuery.includes('status') || lowerQuery.includes('स्थिति')) {
    intent = 'status_inquiry';
    confidence = 92;
  }

  const responses = {
    en: {
      license_inquiry: {
        response: `I can help you with license applications! Here's what you need to know:\n\n📋 **Required Documents:**\n• Business registration proof\n• Identity documents (PAN, Aadhaar)\n• Address proof\n• NOC from local authority\n\n⏱️ **Processing Time:** 7-14 working days\n💰 **Fees:** ₹2,500 - ₹5,000 (varies by type)\n\n🔄 **Process:**\n1. Submit application online\n2. Document verification\n3. Site inspection (if required)\n4. Approval & license issuance\n\nWould you like me to guide you through the specific type of license you need?`,
        suggestions: [
          'What type of license do I need?',
          'Trade license application process',
          'Required documents checklist',
          'Track my license application',
          'License renewal procedure'
        ]
      },
      tax_inquiry: {
        response: `GST Registration made easy! Here's your complete guide:\n\n📝 **Eligibility:**\n• Turnover > ₹40 lakhs (most states)\n• Turnover > ₹20 lakhs (special category states)\n• Voluntary registration available below threshold\n\n📄 **Required Documents:**\n• PAN card\n• Aadhaar card\n• Business registration certificate\n• Bank account details\n• Address proof\n• Digital signature\n\n⚡ **Process Timeline:**\n• Application submission: Online\n• Verification: 3-7 working days\n• Certificate issuance: Immediate upon approval\n\n💡 **Benefits:**\n• Input tax credit\n• Interstate business operations\n• Government tender participation\n• Enhanced business credibility`,
        suggestions: [
          'GST registration fees',
          'Documents for GST registration',
          'GST filing requirements',
          'How to check GST status',
          'GST cancellation process'
        ]
      },
      document_inquiry: {
        response: `Here's your comprehensive document guide:\n\n🆔 **Identity Documents:**\n• PAN Card (mandatory)\n• Aadhaar Card\n• Passport\n• Voter ID\n• Driving License\n\n🏠 **Address Proof:**\n• Utility bills (electricity, gas, water)\n• Bank statements\n• Rent agreement\n• Property tax receipt\n• Aadhaar card\n\n🏢 **Business Documents:**\n• Certificate of Incorporation\n• Partnership deed\n• MOA & AOA\n• Bank account proof\n• Rent agreement for business premises\n\n📋 **Additional Requirements:**\n• Passport size photographs\n• Digital signature certificate\n• NOC from local authority (if applicable)\n\n✅ All documents should be self-attested and notarized where required.`,
        suggestions: [
          'Digital signature requirements',
          'Document verification process',
          'Notarization requirements',
          'Document validity periods',
          'Address proof alternatives'
        ]
      },
      scheme_inquiry: {
        response: `🎯 **Top Government Schemes for Businesses:**\n\n🚀 **Startup India:**\n• 3-year tax exemption\n• Fast-track patent process\n• Fund of Funds access\n• Simplified compliance\n\n🏭 **MSME Benefits:**\n• Collateral-free loans up to ₹10 lakhs\n• Subsidy schemes\n• Technology upgradation support\n• Export promotion assistance\n\n💰 **Financial Support:**\n• PM MUDRA loans\n• Credit guarantee schemes\n• Interest subvention\n• Capital investment subsidies\n\n🌱 **Sector-Specific:**\n• Digital India initiatives\n• Make in India benefits\n• Export promotion schemes\n• Skill development programs\n\nWhich sector or business size are you interested in?`,
        suggestions: [
          'Startup India eligibility',
          'MSME loan schemes',
          'Export incentives',
          'Technology adoption schemes',
          'Women entrepreneur schemes'
        ]
      },
      general: {
        response: `I'm here to help with all your business compliance needs! I can assist you with:\n\n🏢 **License Applications:**\n• Trade licenses\n• Professional licenses\n• Industry-specific permits\n\n📋 **Registrations:**\n• Company registration\n• Partnership registration\n• GST registration\n• MSME registration\n\n🎯 **Government Schemes:**\n• Startup benefits\n• MSME incentives\n• Export promotion\n• Skill development\n\n📊 **Compliance Support:**\n• Filing requirements\n• Deadline tracking\n• Renewal reminders\n\nWhat specific area would you like to explore?`,
        suggestions: [
          'Business registration process',
          'Required licenses for my business',
          'Government schemes and benefits',
          'Compliance calendar and deadlines',
          'Document requirements'
        ]
      }
    },
    hi: {
      license_inquiry: {
        response: `मैं लाइसेंस आवेदन में आपकी सहायता कर सकता हूं! यहां आपको जानने योग्य बातें हैं:\n\n📋 **आवश्यक दस्तावेज:**\n• व्यापार पंजीकरण प्रमाण\n• पहचान दस्तावेज (PAN, आधार)\n• पता प्रमाण\n• स्थानीय प्राधिकरण से NOC\n\n⏱️ **प्रक्रिया समय:** 7-14 कार्य दिवस\n💰 **शुल्क:** ₹2,500 - ₹5,000 (प्रकार के अनुसार)\n\n🔄 **प्रक्रिया:**\n1. ऑनलाइन आवेदन जमा करें\n2. दस्तावेज सत्यापन\n3. साइट निरीक्षण (यदि आवश्यक)\n4. अनुमोदन और लाइसेंस जारी करना\n\nक्या आप चाहते हैं कि मैं आपको विशिष्ट प्रकार के लाइसेंस के लिए मार्गदर्शन करूं?`,
        suggestions: [
          'मुझे किस प्रकार का लाइसेंस चाहिए?',
          'ट्रेड लाइसेंस आवेदन प्रक्रिया',
          'आवश्यक दस्तावेजों की सूची',
          'मेरे लाइसेंस आवेदन को ट्रैक करें',
          'लाइसेंस नवीनीकरण प्रक्रिया'
        ]
      },
      general: {
        response: `मैं आपकी सभी व्यापारिक अनुपालन आवश्यकताओं में सहायता के लिए यहां हूं! मैं आपकी सहायता कर सकता हूं:\n\n🏢 **लाइसेंस आवेदन:**\n• ट्रेड लाइसेंस\n• पेशेवर लाइसेंस\n• उद्योग-विशिष्ट परमिट\n\n📋 **पंजीकरण:**\n• कंपनी पंजीकरण\n• साझेदारी पंजीकरण\n• GST पंजीकरण\n• MSME पंजीकरण\n\n🎯 **सरकारी योजनाएं:**\n• स्टार्टअप लाभ\n• MSME प्रोत्साहन\n• निर्यात संवर्धन\n• कौशल विकास\n\n📊 **अनुपालन सहायता:**\n• फाइलिंग आवश्यकताएं\n• समय सीमा ट्रैकिंग\n• नवीनीकरण अनुस्मारक\n\nआप किस विशिष्ट क्षेत्र का अन्वेषण करना चाहते हैं?`,
        suggestions: [
          'व्यापार पंजीकरण प्रक्रिया',
          'मेरे व्यापार के लिए आवश्यक लाइसेंस',
          'सरकारी योजनाएं और लाभ',
          'अनुपालन कैलेंडर और समय सीमा',
          'दस्तावेज आवश्यकताएं'
        ]
      }
    }
  };

  const langResponses = responses[language];
  const responseData = langResponses[intent] || langResponses.general;

  return {
    response: responseData.response,
    suggestions: responseData.suggestions || [],
    actionItems: [],
    metadata: {
      confidence,
      intent,
      sources: ['EODB Portal Knowledge Base', 'Government Guidelines', 'Legal Database']
    }
  };
};

export const formatFileSize = (bytes: number) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const processWithAI = async (query: string, selectedLanguage: 'en' | 'hi'): Promise<any> => {
  const startTime = Date.now();
  
  try {
    const response = await new Promise((resolve) => {
      setTimeout(() => {
        const responses = generateAdvancedResponse(query, selectedLanguage);
        resolve(responses);
      }, 800 + Math.random() * 1200);
    });
    
    const processingTime = Date.now() - startTime;
    
    return {
      ...response,
      metadata: {
        ...response.metadata,
        processingTime
      }
    };
  } catch (error) {
    throw new Error('AI processing failed');
  }
};

export const initializeSpeechServices = (selectedLanguage: 'en' | 'hi') => {
  let synthesis: SpeechSynthesis | null = null;
  let recognition: any = null;

  if (typeof window !== 'undefined') {
    synthesis = window.speechSynthesis;
    
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = selectedLanguage === 'hi' ? 'hi-IN' : 'en-US';
    }
  }

  return { synthesis, recognition };
};

export const exportChatData = (messages: any[], selectedLanguage: 'en' | 'hi', chatAnalytics: any[]) => {
  const chatData = {
    timestamp: new Date().toISOString(),
    messages: messages,
    language: selectedLanguage,
    analytics: chatAnalytics
  };
  
  const element = document.createElement('a');
  element.href = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(chatData, null, 2));
  element.download = `eodb-chat-${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
};