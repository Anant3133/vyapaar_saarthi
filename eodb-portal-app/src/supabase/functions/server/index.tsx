import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { Hono } from 'npm:hono';
import { cors } from 'npm:hono/cors';
import { logger } from 'npm:hono/logger';
import { createClient } from 'npm:@supabase/supabase-js@2';
import * as kv from './kv_store.tsx';

const app = new Hono();

// Initialize Supabase client
const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
);

// Middleware
app.use('*', cors({
  origin: '*',
  allowHeaders: ['*'],
  allowMethods: ['*'],
}));

app.use('*', logger(console.log));

// Helper function to check authorization
async function checkAuthorization(authHeader: string | undefined) {
  if (!authHeader) return null;
  
  const accessToken = authHeader.split(' ')[1];
  if (!accessToken) return null;
  
  try {
    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    return error ? null : user;
  } catch (error) {
    console.log('Authorization error:', error);
    return null;
  }
}

// Health check
app.get('/make-server-45c5d27d/health', (c) => {
  return c.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// User signup
app.post('/make-server-45c5d27d/signup', async (c) => {
  try {
    const { email, password, name, businessType, phoneNumber } = await c.req.json();
    
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { 
        name, 
        businessType, 
        phoneNumber,
        memberSince: new Date().toISOString(),
        totalApplications: 0,
        completedApplications: 0,
        verified: false
      },
      // Automatically confirm the user's email since an email server hasn't been configured.
      email_confirm: true
    });

    if (error) {
      console.log('Signup error:', error);
      return c.json({ error: error.message }, 400);
    }

    return c.json({ user: data.user });
  } catch (error) {
    console.log('Signup processing error:', error);
    return c.json({ error: 'Failed to create user' }, 500);
  }
});

// Dashboard analytics
app.get('/make-server-45c5d27d/dashboard/analytics', async (c) => {
  const user = await checkAuthorization(c.req.header('Authorization'));
  if (!user) {
    return c.json({ error: 'Unauthorized' }, 401);
  }

  try {
    // Get user-specific analytics from KV store
    const userAnalytics = await kv.get(`analytics:${user.id}`);
    
    if (!userAnalytics) {
      // Initialize default analytics for new user
      const defaultAnalytics = {
        activeLicenses: 0,
        pendingApplications: 0,
        upcomingDeadlines: 0,
        complianceScore: 100,
        applicationTrends: [],
        processingBottlenecks: [],
        statusBreakdown: {
          approved: 0,
          pending: 0,
          rejected: 0,
          draft: 0
        }
      };
      
      await kv.set(`analytics:${user.id}`, defaultAnalytics);
      return c.json(defaultAnalytics);
    }

    return c.json(userAnalytics);
  } catch (error) {
    console.log('Analytics fetch error:', error);
    return c.json({ error: 'Failed to fetch analytics' }, 500);
  }
});

// Submit application
app.post('/make-server-45c5d27d/applications', async (c) => {
  const user = await checkAuthorization(c.req.header('Authorization'));
  if (!user) {
    return c.json({ error: 'Unauthorized' }, 401);
  }

  try {
    const applicationData = await c.req.json();
    
    const application = {
      id: `APP${Date.now()}`,
      userId: user.id,
      ...applicationData,
      status: 'submitted',
      submittedAt: new Date().toISOString(),
      progress: 25,
      estimatedCompletion: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString()
    };

    // Store application
    await kv.set(`application:${application.id}`, application);
    
    // Update user applications list
    const userApplications = await kv.get(`user_applications:${user.id}`) || [];
    userApplications.push(application.id);
    await kv.set(`user_applications:${user.id}`, userApplications);

    // Update analytics
    const analytics = await kv.get(`analytics:${user.id}`) || { pendingApplications: 0 };
    analytics.pendingApplications = (analytics.pendingApplications || 0) + 1;
    await kv.set(`analytics:${user.id}`, analytics);

    return c.json({ application });
  } catch (error) {
    console.log('Application submission error:', error);
    return c.json({ error: 'Failed to submit application' }, 500);
  }
});

// Get user applications
app.get('/make-server-45c5d27d/applications', async (c) => {
  const user = await checkAuthorization(c.req.header('Authorization'));
  if (!user) {
    return c.json({ error: 'Unauthorized' }, 401);
  }

  try {
    const userApplications = await kv.get(`user_applications:${user.id}`) || [];
    const applications = [];

    for (const appId of userApplications) {
      const app = await kv.get(`application:${appId}`);
      if (app) applications.push(app);
    }

    return c.json({ applications });
  } catch (error) {
    console.log('Applications fetch error:', error);
    return c.json({ error: 'Failed to fetch applications' }, 500);
  }
});

// Get available schemes
app.get('/make-server-45c5d27d/schemes', async (c) => {
  const user = await checkAuthorization(c.req.header('Authorization'));
  if (!user) {
    return c.json({ error: 'Unauthorized' }, 401);
  }

  try {
    let schemes = await kv.get('schemes:all');
    
    if (!schemes) {
      // Initialize default schemes
      schemes = [
        {
          id: 'startup-india',
          title: 'Startup India Scheme',
          description: 'Tax benefits and funding support for startups',
          category: 'Tax Benefit',
          maxFunding: '₹50L',
          eligibility: 85,
          requirements: ['Business registered < 10 years', 'Annual turnover < ₹100Cr', 'Working on innovation'],
          benefits: ['3 years tax exemption', 'Easy compliance', 'IPR fast-track'],
          applicationProcess: '7-10 working days',
          documents: ['Certificate of Incorporation', 'PAN Card', 'Business Plan'],
          featured: true
        },
        {
          id: 'msme-development',
          title: 'MSME Development Scheme',
          description: 'Training and development support for MSMEs',
          category: 'Training',
          maxFunding: '₹25L',
          eligibility: 92,
          requirements: ['MSME Registration', 'Valid GST Number', 'Clean credit history'],
          benefits: ['Skill development programs', 'Marketing support', 'Credit guarantee'],
          applicationProcess: '5-7 working days',
          documents: ['MSME Certificate', 'GST Certificate', 'Bank Statement'],
          featured: true
        },
        {
          id: 'digital-india',
          title: 'Digital India Initiative',
          description: 'Digital transformation and technology adoption',
          category: 'Technology',
          maxFunding: '₹15L',
          eligibility: 78,
          requirements: ['Technology-based business', 'Digital payment adoption', 'Online presence'],
          benefits: ['Digital infrastructure support', 'Training programs', 'Market access'],
          applicationProcess: '10-15 working days',
          documents: ['Business Registration', 'Technology Plan', 'Digital Payment Records'],
          featured: false
        }
      ];
      
      await kv.set('schemes:all', schemes);
    }

    return c.json({ schemes });
  } catch (error) {
    console.log('Schemes fetch error:', error);
    return c.json({ error: 'Failed to fetch schemes' }, 500);
  }
});

// AI Chat endpoint
app.post('/make-server-45c5d27d/ai/chat', async (c) => {
  const user = await checkAuthorization(c.req.header('Authorization'));
  if (!user) {
    return c.json({ error: 'Unauthorized' }, 401);
  }

  try {
    const { message, language = 'en' } = await c.req.json();
    
    // Simple AI response logic (in production, this would integrate with actual AI services)
    const responses = {
      en: {
        greeting: "Hello! I'm here to help you with your business applications and compliance requirements.",
        license: "I can help you with various license applications including trade licenses, GST registration, and environmental clearances.",
        schemes: "Based on your business profile, I recommend checking out the Startup India Scheme and MSME Development programs.",
        status: "You can track your application status in real-time from your dashboard.",
        documents: "Common documents needed include PAN card, address proof, and business registration certificate.",
        default: "I'm here to help! You can ask me about license applications, schemes, compliance requirements, or application status."
      },
      hi: {
        greeting: "नमस्ते! मैं आपके व्यावसायिक आवेदनों और अनुपालन आवश्यकताओं में मदद के लिए यहाँ हूँ।",
        license: "मैं ट्रेड लाइसेंस, जीएसटी पंजीकरण, और पर्यावरण मंजूरी सहित विभिन्न लाइसेंस आवेदनों में आपकी मदद कर सकता हूँ।",
        schemes: "आपकी व्यावसायिक प्रोफ़ाइल के आधार पर, मैं स्टार्टअप इंडिया योजना और एमएसएमई विकास कार्यक्रमों की जांच करने की सलाह देता हूँ।",
        status: "आप अपने डैशबोर्ड से अपने आवेदन की स्थिति को वास्तविक समय में ट्रैक कर सकते हैं।",
        documents: "आवश्यक सामान्य दस्तावेजों में पैन कार्ड, पता प्रमाण, और व्यावसायिक पंजीकरण प्रमाणपत्र शामिल हैं।",
        default: "मैं मदद के लिए यहाँ हूँ! आप मुझसे लाइसेंस आवेदन, योजनाएं, अनुपालन आवश्यकताएं, या आवेदन स्थिति के बारे में पूछ सकते हैं।"
      }
    };

    let response = responses[language].default;
    let suggestions = [];

    // Simple keyword matching for AI responses
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('नमस्ते')) {
      response = responses[language].greeting;
      suggestions = language === 'hi' 
        ? ['लाइसेंस आवेदन कैसे करें?', 'उपलब्ध योजनाएं दिखाएं', 'अनुपालन आवश्यकताएं']
        : ['How to apply for licenses?', 'Show available schemes', 'Compliance requirements'];
    } else if (lowerMessage.includes('license') || lowerMessage.includes('लाइसेंस')) {
      response = responses[language].license;
      suggestions = language === 'hi' 
        ? ['ट्रेड लाइसेंस के लिए आवेदन', 'जीएसटी पंजीकरण', 'आवश्यक दस्तावेज']
        : ['Apply for trade license', 'GST registration', 'Required documents'];
    } else if (lowerMessage.includes('scheme') || lowerMessage.includes('योजना')) {
      response = responses[language].schemes;
      suggestions = language === 'hi' 
        ? ['स्टार्टअप इंडिया योजना', 'एमएसएमई विकास', 'पात्रता जांचें']
        : ['Startup India Scheme', 'MSME Development', 'Check eligibility'];
    } else if (lowerMessage.includes('status') || lowerMessage.includes('स्थिति')) {
      response = responses[language].status;
      suggestions = language === 'hi' 
        ? ['डैशबोर्ड देखें', 'आवेदन ट्रैक करें', 'समयसीमा जांचें']
        : ['View dashboard', 'Track applications', 'Check deadlines'];
    } else if (lowerMessage.includes('document') || lowerMessage.includes('दस्तावेज')) {
      response = responses[language].documents;
      suggestions = language === 'hi' 
        ? ['दस्तावेज अपलोड करें', 'आवश्यकताएं जांचें', 'सत्यापन स्थिति']
        : ['Upload documents', 'Check requirements', 'Verification status'];
    }

    const aiResponse = {
      response,
      suggestions,
      metadata: {
        confidence: 85,
        processingTime: Math.random() * 1000 + 500,
        intent: 'information_request'
      }
    };

    return c.json(aiResponse);
  } catch (error) {
    console.log('AI chat error:', error);
    return c.json({ error: 'Failed to process chat message' }, 500);
  }
});

// Update user profile
app.put('/make-server-45c5d27d/profile', async (c) => {
  const user = await checkAuthorization(c.req.header('Authorization'));
  if (!user) {
    return c.json({ error: 'Unauthorized' }, 401);
  }

  try {
    const updates = await c.req.json();
    
    const { data, error } = await supabase.auth.admin.updateUserById(user.id, {
      user_metadata: {
        ...user.user_metadata,
        ...updates
      }
    });

    if (error) {
      console.log('Profile update error:', error);
      return c.json({ error: error.message }, 400);
    }

    return c.json({ user: data.user });
  } catch (error) {
    console.log('Profile update processing error:', error);
    return c.json({ error: 'Failed to update profile' }, 500);
  }
});

// Error handler
app.onError((err, c) => {
  console.error('Server error:', err);
  return c.json({ error: 'Internal server error' }, 500);
});

serve(app.fetch);