import { Plus, Edit, Trash2, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../ui/card';
import { Button } from '../../../ui/button';
import { Badge } from '../../../ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../ui/table';
import { demoAdminUsers } from '../constants/AdminSettingsConstants';

interface AdminUsersTabProps {
  language: 'en' | 'hi';
  translations: any;
}

export function AdminUsersTab({ language, translations }: AdminUsersTabProps) {
  const t = translations;

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'Super Admin': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Department Admin': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Regional Admin': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    return status === 'Active' ? 
      'bg-green-100 text-green-800 border-green-200' : 
      'bg-red-100 text-red-800 border-red-200';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{t.adminUsers}</span>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            {t.addUser}
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t.userName}</TableHead>
                <TableHead>{t.userEmail}</TableHead>
                <TableHead>{t.role}</TableHead>
                <TableHead>{t.status}</TableHead>
                <TableHead>{t.lastLogin}</TableHead>
                <TableHead>{t.created}</TableHead>
                <TableHead>{t.actions}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {demoAdminUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <img 
                        src={user.avatar} 
                        alt={user.name[language]}
                        className="w-8 h-8 rounded-full"
                      />
                      <span className="font-medium">{user.name[language]}</span>
                    </div>
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Badge className={getRoleColor(user.role)}>
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(user.status)}>
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-mono text-sm">{user.lastLogin}</TableCell>
                  <TableCell>{user.created}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button size="sm" variant="outline">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline" className="text-red-600">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}