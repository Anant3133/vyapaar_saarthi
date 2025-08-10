import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Download,
  FileText,
  Award,
  Calendar,
  CheckCircle,
  Clock,
  Search,
  Filter,
  Eye,
  Share2,
  QrCode,
  Shield,
  AlertCircle,
  RefreshCw,
  Star
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Separator } from '../ui/separator';
import { Progress } from '../ui/progress';

interface License {
  id: string;
  title: string;
  type: string;
  applicationId: string;
  issueDate: Date;
  expiryDate: Date;
  status: 'active' | 'expired' | 'expiring-soon' | 'suspended';
  authority: string;
  licenseNumber: string;
  downloadCount: number;
  category: string;
  validityPeriod: number;
  fees: number;
  description: string;
  conditions?: string[];
  qrCode?: string;
  verified: boolean;
}

export function DownloadLicense() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  const licenses: License[] = [
    {
      id: 'LIC001',
      title: 'Trade License',
      type: 'Business License',
      applicationId: 'APP001',
      issueDate: new Date('2024-01-20'),
      expiryDate: new Date('2025-01-19'),
      status: 'active',
      authority: 'Municipal Corporation',
      licenseNumber: 'TL/2024/001234',
      downloadCount: 5,
      category: 'trade',
      validityPeriod: 365,
      fees: 2500,
      description: 'Permits retail trading activities within municipal limits',
      conditions: [
        'Valid for retail trading only',
        'Must be renewed annually',
        'Subject to periodic inspections',
        'Display license prominently at business premises'
      ],
      qrCode: 'https://verify.gov.in/TL-2024-001234',
      verified: true
    },
    {
      id: 'LIC002',
      title: 'GST Registration Certificate',
      type: 'Tax Certificate',
      applicationId: 'APP002',
      issueDate: new Date('2024-01-25'),
      expiryDate: new Date('2025-12-31'),
      status: 'active',
      authority: 'Goods and Services Tax Department',
      licenseNumber: 'GST/2024/567890',
      downloadCount: 12,
      category: 'tax',
      validityPeriod: 365,
      fees: 0,
      description: 'Authorizes collection and payment of GST',
      conditions: [
        'File monthly/quarterly returns',
        'Maintain proper records',
        'Issue valid tax invoices',
        'Comply with GST regulations'
      ],
      qrCode: 'https://verify.gst.gov.in/567890',
      verified: true
    },
    {
      id: 'LIC003',
      title: 'Environmental Clearance',
      type: 'Environmental License',
      applicationId: 'APP003',
      issueDate: new Date('2023-06-15'),
      expiryDate: new Date('2024-06-14'),
      status: 'expiring-soon',
      authority: 'State Pollution Control Board',
      licenseNumber: 'EC/2023/789012',
      downloadCount: 3,
      category: 'environmental',
      validityPeriod: 365,
      fees: 15000,
      description: 'Permission for industrial activities with environmental impact',
      conditions: [
        'Comply with emission standards',
        'Submit quarterly compliance reports',
        'Install pollution control equipment',
        'Allow periodic inspections'
      ],
      qrCode: 'https://verify.env.gov.in/789012',
      verified: true
    },
    {
      id: 'LIC004',
      title: 'Fire Safety Certificate',
      type: 'Safety License',
      applicationId: 'APP004',
      issueDate: new Date('2022-03-10'),
      expiryDate: new Date('2024-03-09'),
      status: 'expired',
      authority: 'Fire Department',
      licenseNumber: 'FSC/2022/345678',
      downloadCount: 8,
      category: 'safety',
      validityPeriod: 730,
      fees: 5000,
      description: 'Confirms compliance with fire safety regulations',
      verified: false
    }
  ];

  const filteredLicenses = licenses.filter(license => {
    const matchesSearch = license.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         license.licenseNumber.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || license.status === statusFilter;
    const matchesType = typeFilter === 'all' || license.category === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'expiring-soon':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'expired':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'suspended':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="w-4 h-4" />;
      case 'expiring-soon':
        return <Clock className="w-4 h-4" />;
      case 'expired':
        return <AlertCircle className="w-4 h-4" />;
      case 'suspended':
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getDaysUntilExpiry = (expiryDate: Date) => {
    const today = new Date();
    const diffTime = expiryDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const handleDownload = (license: License) => {
    // Simulate PDF generation and download
    const element = document.createElement('a');
    element.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(`
GOVERNMENT LICENSE CERTIFICATE

License Title: ${license.title}
License Number: ${license.licenseNumber}
Issue Date: ${license.issueDate.toLocaleDateString()}
Expiry Date: ${license.expiryDate.toLocaleDateString()}
Issuing Authority: ${license.authority}
Status: ${license.status.toUpperCase()}

This is a digitally generated certificate. 
Verify authenticity at: ${license.qrCode || 'https://verify.gov.in'}

Generated on: ${new Date().toLocaleDateString()}
    `);
    element.download = `${license.licenseNumber.replace(/\//g, '_')}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const licenseStats = {
    total: licenses.length,
    active: licenses.filter(l => l.status === 'active').length,
    expiring: licenses.filter(l => l.status === 'expiring-soon').length,
    expired: licenses.filter(l => l.status === 'expired').length
  };

  return (
    <div className="p-6 space-y-6 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Download Licenses</h1>
            <p className="text-muted-foreground">Access and download your approved licenses and certificates</p>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
              <Shield className="w-3 h-3 mr-1" />
              Verified Downloads
            </Badge>
          </div>
        </div>

        {/* License Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="bg-card/50 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Licenses</p>
                  <p className="text-2xl font-bold">{licenseStats.total}</p>
                </div>
                <Award className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card/50 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active</p>
                  <p className="text-2xl font-bold text-green-600">{licenseStats.active}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card/50 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Expiring Soon</p>
                  <p className="text-2xl font-bold text-yellow-600">{licenseStats.expiring}</p>
                </div>
                <Clock className="w-8 h-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card/50 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Expired</p>
                  <p className="text-2xl font-bold text-red-600">{licenseStats.expired}</p>
                </div>
                <AlertCircle className="w-8 h-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="bg-card/50 backdrop-blur-sm mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search licenses by name or number..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="expiring-soon">Expiring Soon</SelectItem>
                    <SelectItem value="expired">Expired</SelectItem>
                    <SelectItem value="suspended">Suspended</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger>
                    <Award className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="trade">Trade License</SelectItem>
                    <SelectItem value="tax">Tax Certificate</SelectItem>
                    <SelectItem value="environmental">Environmental</SelectItem>
                    <SelectItem value="safety">Safety</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Licenses List */}
        <div className="space-y-4">
          {filteredLicenses.map((license, index) => {
            const daysUntilExpiry = getDaysUntilExpiry(license.expiryDate);
            
            return (
              <motion.div
                key={license.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className="bg-card/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="grid lg:grid-cols-4 gap-6">
                      {/* License Info */}
                      <div className="lg:col-span-2">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/20">
                              <Award className="w-6 h-6 text-blue-600" />
                            </div>
                            <div>
                              <h3 className="text-lg font-semibold">{license.title}</h3>
                              <p className="text-sm text-muted-foreground">{license.type}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge className={getStatusColor(license.status)}>
                              {getStatusIcon(license.status)}
                              <span className="ml-1 capitalize">{license.status.replace('-', ' ')}</span>
                            </Badge>
                            {license.verified && (
                              <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                                <Shield className="w-3 h-3 mr-1" />
                                Verified
                              </Badge>
                            )}
                          </div>
                        </div>

                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">License Number:</span>
                            <span className="font-medium">{license.licenseNumber}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Issuing Authority:</span>
                            <span>{license.authority}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Issue Date:</span>
                            <span>{license.issueDate.toLocaleDateString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Expiry Date:</span>
                            <span className={daysUntilExpiry < 30 ? 'text-red-600 font-medium' : ''}>
                              {license.expiryDate.toLocaleDateString()}
                            </span>
                          </div>
                          {daysUntilExpiry > 0 && daysUntilExpiry < 30 && (
                            <div className="flex items-center space-x-2 text-yellow-600">
                              <AlertCircle className="w-4 h-4" />
                              <span className="text-sm">Expires in {daysUntilExpiry} days</span>
                            </div>
                          )}
                        </div>

                        <Separator className="my-4" />
                        
                        <p className="text-sm text-muted-foreground">{license.description}</p>
                      </div>

                      {/* Validity Progress & Actions */}
                      <div className="lg:col-span-2">
                        {/* Validity Progress */}
                        <div className="mb-6">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium">License Validity</span>
                            <span className="text-sm text-muted-foreground">
                              {Math.max(0, daysUntilExpiry)} days remaining
                            </span>
                          </div>
                          <Progress 
                            value={Math.max(0, Math.min(100, (daysUntilExpiry / license.validityPeriod) * 100))} 
                            className="h-2"
                          />
                        </div>

                        {/* Download Stats */}
                        <div className="grid grid-cols-2 gap-4 mb-6">
                          <div className="text-center p-3 bg-accent/20 rounded-lg">
                            <div className="text-lg font-semibold">{license.downloadCount}</div>
                            <div className="text-xs text-muted-foreground">Downloads</div>
                          </div>
                          <div className="text-center p-3 bg-accent/20 rounded-lg">
                            <div className="text-lg font-semibold">₹{license.fees.toLocaleString()}</div>
                            <div className="text-xs text-muted-foreground">Fees Paid</div>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="space-y-2">
                          <Button 
                            onClick={() => handleDownload(license)}
                            className="w-full"
                            disabled={license.status === 'suspended'}
                          >
                            <Download className="w-4 h-4 mr-2" />
                            Download Certificate
                          </Button>
                          
                          <div className="grid grid-cols-3 gap-2">
                            <Button variant="outline" size="sm">
                              <Eye className="w-4 h-4 mr-1" />
                              Preview
                            </Button>
                            <Button variant="outline" size="sm">
                              <Share2 className="w-4 h-4 mr-1" />
                              Share
                            </Button>
                            <Button variant="outline" size="sm">
                              <QrCode className="w-4 h-4 mr-1" />
                              QR Code
                            </Button>
                          </div>

                          {license.status === 'expiring-soon' && (
                            <Button variant="outline" className="w-full text-yellow-600 border-yellow-600">
                              <RefreshCw className="w-4 h-4 mr-2" />
                              Renew License
                            </Button>
                          )}

                          {license.status === 'expired' && (
                            <Button variant="outline" className="w-full text-red-600 border-red-600">
                              <RefreshCw className="w-4 h-4 mr-2" />
                              Apply for Renewal
                            </Button>
                          )}
                        </div>

                        {/* Verification */}
                        {license.qrCode && (
                          <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                            <div className="flex items-center space-x-2 text-sm">
                              <QrCode className="w-4 h-4 text-blue-600" />
                              <span className="text-blue-800 dark:text-blue-200">
                                Verify at: {license.qrCode}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* License Conditions */}
                    {license.conditions && (
                      <div className="mt-6 pt-4 border-t border-border">
                        <h4 className="font-semibold mb-2">License Conditions:</h4>
                        <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                          {license.conditions.map((condition, idx) => (
                            <li key={idx}>{condition}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}

          {filteredLicenses.length === 0 && (
            <Card className="bg-card/50 backdrop-blur-sm">
              <CardContent className="p-12 text-center">
                <Award className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">No Licenses Found</h3>
                <p className="text-muted-foreground">
                  {searchQuery || statusFilter !== 'all' || typeFilter !== 'all'
                    ? 'Try adjusting your search criteria'
                    : 'You don\'t have any licenses yet. Start by applying for a new license.'}
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </motion.div>
    </div>
  );
}