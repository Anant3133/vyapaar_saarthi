import { useState } from 'react';
import { motion } from 'motion/react';
import { Settings, Bell, Server, Save, Home } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Switch } from '../../ui/switch';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import { AdminProfileTab } from './components/AdminProfileTab';
import { AdminUsersTab } from './components/AdminUsersTab';
import { adminSettingsTranslations, defaultSettings } from './constants/AdminSettingsConstants';

interface AdminSettingsPageProps {
  currentUser: any;
  onUserUpdate: (user: any) => void;
  language: 'en' | 'hi';
  onNavigate?: (page: string) => void;
}

export function AdminSettingsPage({ currentUser, onUserUpdate, language, onNavigate }: AdminSettingsPageProps) {
  const [settings, setSettings] = useState(defaultSettings);
  const t = adminSettingsTranslations[language];

  const handleSaveSettings = () => {
    alert(language === 'hi' ? 'सेटिंग्स सहेज दी गईं' : 'Settings saved successfully');
  };

  return (
    <div className="p-6 space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div className="space-y-1">
          <motion.h1 
            className="text-3xl font-bold flex items-center space-x-3"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center">
              <Settings className="w-5 h-5 text-white" />
            </div>
            <span>{t.title}</span>
          </motion.h1>
          <p className="text-muted-foreground">{t.subtitle}</p>
        </div>
        
        <Button
          variant="outline"
          onClick={() => onNavigate?.('welcome')}
          className="bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 border-blue-200 self-start lg:self-auto"
        >
          <Home className="w-4 h-4 mr-2" />
          {language === 'hi' ? 'स्वागत पृष्ठ पर वापस' : 'Back to Welcome'}
        </Button>
      </div>

      {/* Main Settings Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile">{t.profile}</TabsTrigger>
            <TabsTrigger value="notifications">{t.notifications}</TabsTrigger>
            <TabsTrigger value="system">{t.system}</TabsTrigger>
            <TabsTrigger value="users">{t.users}</TabsTrigger>
          </TabsList>

          {/* Profile Settings */}
          <TabsContent value="profile">
            <AdminProfileTab 
              currentUser={currentUser} 
              language={language} 
              translations={t} 
            />
          </TabsContent>

          {/* Notification Settings */}
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Bell className="w-5 h-5" />
                  <span>{t.notifications}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  {Object.entries(settings.notifications).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">{t[key as keyof typeof t]}</h4>
                        <p className="text-sm text-muted-foreground">
                          {language === 'hi' ? 'महत्वपूर्ण अपडेट के लिए अधिसूचनाएं' : 'Notifications for important updates'}
                        </p>
                      </div>
                      <Switch
                        checked={value}
                        onCheckedChange={(checked) => 
                          setSettings({
                            ...settings,
                            notifications: {...settings.notifications, [key]: checked}
                          })
                        }
                      />
                    </div>
                  ))}
                </div>
                <Button onClick={handleSaveSettings}>
                  <Save className="w-4 h-4 mr-2" />
                  {t.save}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* System Configuration */}
          <TabsContent value="system">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Server className="w-5 h-5" />
                  <span>{t.system}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  {Object.entries(settings.system).map(([key, value]) => (
                    <div key={key}>
                      {typeof value === 'boolean' ? (
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">{t[key as keyof typeof t]}</h4>
                            <p className="text-sm text-muted-foreground">
                              {language === 'hi' ? 'सिस्टम कॉन्फ़िगरेशन सेटिंग' : 'System configuration setting'}
                            </p>
                          </div>
                          <Switch
                            checked={value}
                            onCheckedChange={(checked) => 
                              setSettings({
                                ...settings,
                                system: {...settings.system, [key]: checked}
                              })
                            }
                          />
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <Label htmlFor={key}>{t[key as keyof typeof t]}</Label>
                          <Input
                            id={key}
                            value={value}
                            onChange={(e) => 
                              setSettings({
                                ...settings,
                                system: {...settings.system, [key]: e.target.value}
                              })
                            }
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <Button onClick={handleSaveSettings}>
                  <Save className="w-4 h-4 mr-2" />
                  {t.save}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* User Management */}
          <TabsContent value="users">
            <AdminUsersTab language={language} translations={t} />
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
}