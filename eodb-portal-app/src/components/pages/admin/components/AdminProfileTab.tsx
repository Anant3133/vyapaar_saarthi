import { useState } from 'react';
import { Crown, Edit, Save, Lock, Eye, EyeOff } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../ui/card';
import { Button } from '../../../ui/button';
import { Input } from '../../../ui/input';
import { Label } from '../../../ui/label';
import { Badge } from '../../../ui/badge';
import { Textarea } from '../../../ui/textarea';

interface AdminProfileTabProps {
  currentUser: any;
  language: 'en' | 'hi';
  translations: any;
}

export function AdminProfileTab({ currentUser, language, translations }: AdminProfileTabProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    phone: currentUser?.phoneNumber || '',
    position: currentUser?.position || '',
    department: 'System Administration',
    bio: 'System Administrator with full portal access and management privileges.',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const t = translations;

  const handleSaveProfile = () => {
    setIsEditing(false);
    alert(language === 'hi' ? 'प्रोफ़ाइल अपडेट हो गया' : 'Profile updated successfully');
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Crown className="w-5 h-5" />
              <span>{t.personalInfo}</span>
            </div>
            <Button 
              variant="outline" 
              onClick={() => setIsEditing(!isEditing)}
            >
              <Edit className="w-4 h-4 mr-2" />
              {isEditing ? t.cancel : t.edit}
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center space-x-6 mb-6">
            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center">
              <Crown className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">{currentUser?.name}</h3>
              <p className="text-muted-foreground">{currentUser?.position}</p>
              <Badge className="mt-1 bg-purple-100 text-purple-800">
                {currentUser?.adminLevel?.toUpperCase()}
              </Badge>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">{t.name}</Label>
              <Input
                id="name"
                value={profileData.name}
                onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                disabled={!isEditing}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">{t.email}</Label>
              <Input
                id="email"
                type="email"
                value={profileData.email}
                onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                disabled={!isEditing}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">{t.phone}</Label>
              <Input
                id="phone"
                value={profileData.phone}
                onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                disabled={!isEditing}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="position">{t.position}</Label>
              <Input
                id="position"
                value={profileData.position}
                onChange={(e) => setProfileData({...profileData, position: e.target.value})}
                disabled={!isEditing}
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="bio">{t.bio}</Label>
              <Textarea
                id="bio"
                value={profileData.bio}
                onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                disabled={!isEditing}
                rows={3}
              />
            </div>
          </div>

          {isEditing && (
            <div className="flex justify-end space-x-3">
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                {t.cancel}
              </Button>
              <Button onClick={handleSaveProfile}>
                <Save className="w-4 h-4 mr-2" />
                {t.saveProfile}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Change Password */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Lock className="w-5 h-5" />
            <span>{t.changePassword}</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">{t.currentPassword}</Label>
              <div className="relative">
                <Input
                  id="currentPassword"
                  type={showPassword ? 'text' : 'password'}
                  value={profileData.currentPassword}
                  onChange={(e) => setProfileData({...profileData, currentPassword: e.target.value})}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="newPassword">{t.newPassword}</Label>
              <Input
                id="newPassword"
                type={showPassword ? 'text' : 'password'}
                value={profileData.newPassword}
                onChange={(e) => setProfileData({...profileData, newPassword: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">{t.confirmPassword}</Label>
              <Input
                id="confirmPassword"
                type={showPassword ? 'text' : 'password'}
                value={profileData.confirmPassword}
                onChange={(e) => setProfileData({...profileData, confirmPassword: e.target.value})}
              />
            </div>
          </div>
          <Button>
            <Save className="w-4 h-4 mr-2" />
            {t.changePassword}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}