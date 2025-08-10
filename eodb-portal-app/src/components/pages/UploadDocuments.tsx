import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import {
  Upload,
  FileText,
  Image,
  File,
  X,
  Check,
  AlertCircle,
  Download,
  Eye,
  Trash2,
  Plus,
  Cloud,
  Shield,
  Clock
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';

interface Document {
  id: string;
  name: string;
  type: string;
  size: number;
  uploadDate: Date;
  status: 'uploading' | 'completed' | 'error' | 'processing';
  progress: number;
  category: string;
  applicationId?: string;
  verified?: boolean;
}

export function UploadDocuments() {
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: '1',
      name: 'business_registration.pdf',
      type: 'pdf',
      size: 2048000,
      uploadDate: new Date('2024-01-15'),
      status: 'completed',
      progress: 100,
      category: 'business-registration',
      verified: true
    },
    {
      id: '2',
      name: 'identity_proof.jpg',
      type: 'image',
      size: 1024000,
      uploadDate: new Date('2024-01-16'),
      status: 'completed',
      progress: 100,
      category: 'identity-proof',
      verified: true
    }
  ]);

  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedApplication, setSelectedApplication] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [description, setDescription] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const documentCategories = [
    { value: 'identity-proof', label: 'Identity Proof', required: true },
    { value: 'address-proof', label: 'Address Proof', required: true },
    { value: 'business-registration', label: 'Business Registration', required: true },
    { value: 'financial-documents', label: 'Financial Documents', required: false },
    { value: 'tax-documents', label: 'Tax Documents', required: false },
    { value: 'noc-certificates', label: 'NOC Certificates', required: false },
    { value: 'technical-drawings', label: 'Technical Drawings', required: false },
    { value: 'other', label: 'Other Documents', required: false }
  ];

  const applications = [
    { value: 'APP001', label: 'Trade License Application' },
    { value: 'APP002', label: 'GST Registration' },
    { value: 'APP003', label: 'Environmental Clearance' },
    { value: 'NEW', label: 'New Application' }
  ];

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (type: string) => {
    if (type.includes('image')) return <Image className="w-8 h-8 text-blue-600" />;
    if (type.includes('pdf')) return <FileText className="w-8 h-8 text-red-600" />;
    return <File className="w-8 h-8 text-gray-600" />;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'uploading':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'error':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <Check className="w-4 h-4" />;
      case 'uploading':
        return <Cloud className="w-4 h-4" />;
      case 'processing':
        return <Clock className="w-4 h-4" />;
      case 'error':
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <File className="w-4 h-4" />;
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(Array.from(e.target.files));
    }
  };

  const handleFiles = async (files: File[]) => {
    if (!selectedCategory) {
      alert('Please select a document category first');
      return;
    }

    for (const file of files) {
      const newDocument: Document = {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        name: file.name,
        type: file.type,
        size: file.size,
        uploadDate: new Date(),
        status: 'uploading',
        progress: 0,
        category: selectedCategory,
        applicationId: selectedApplication || undefined
      };

      setDocuments(prev => [...prev, newDocument]);

      // Simulate upload progress
      for (let progress = 0; progress <= 100; progress += 10) {
        await new Promise(resolve => setTimeout(resolve, 200));
        setDocuments(prev => prev.map(doc => 
          doc.id === newDocument.id ? { ...doc, progress } : doc
        ));
      }

      // Mark as completed
      setDocuments(prev => prev.map(doc => 
        doc.id === newDocument.id ? { ...doc, status: 'completed' } : doc
      ));

      // Simulate verification process
      setTimeout(() => {
        setDocuments(prev => prev.map(doc => 
          doc.id === newDocument.id ? { ...doc, verified: true } : doc
        ));
      }, 2000);
    }
  };

  const handleDelete = (documentId: string) => {
    setDocuments(prev => prev.filter(doc => doc.id !== documentId));
  };

  const uploadStats = {
    total: documents.length,
    completed: documents.filter(doc => doc.status === 'completed').length,
    verified: documents.filter(doc => doc.verified).length,
    pending: documents.filter(doc => doc.status === 'uploading' || doc.status === 'processing').length
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
            <h1 className="text-3xl font-bold text-foreground">Upload Documents</h1>
            <p className="text-muted-foreground">Upload and manage your application documents securely</p>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
              <Shield className="w-3 h-3 mr-1" />
              Secure Upload
            </Badge>
          </div>
        </div>

        {/* Upload Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="bg-card/50 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Documents</p>
                  <p className="text-2xl font-bold">{uploadStats.total}</p>
                </div>
                <File className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card/50 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Completed</p>
                  <p className="text-2xl font-bold text-green-600">{uploadStats.completed}</p>
                </div>
                <Check className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card/50 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Verified</p>
                  <p className="text-2xl font-bold text-purple-600">{uploadStats.verified}</p>
                </div>
                <Shield className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card/50 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pending</p>
                  <p className="text-2xl font-bold text-yellow-600">{uploadStats.pending}</p>
                </div>
                <Clock className="w-8 h-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Upload Area */}
          <div className="lg:col-span-2">
            <Card className="bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Upload New Documents</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Document Category and Application Selection */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="category">Document Category *</Label>
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {documentCategories.map((category) => (
                          <SelectItem key={category.value} value={category.value}>
                            {category.label}
                            {category.required && <span className="text-red-500 ml-1">*</span>}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="application">Link to Application</Label>
                    <Select value={selectedApplication} onValueChange={setSelectedApplication}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select application (optional)" />
                      </SelectTrigger>
                      <SelectContent>
                        {applications.map((app) => (
                          <SelectItem key={app.value} value={app.value}>
                            {app.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <Label htmlFor="description">Description (Optional)</Label>
                  <Textarea
                    id="description"
                    placeholder="Add any additional notes about these documents..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="mt-1"
                  />
                </div>

                {/* Upload Area */}
                <div
                  className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300 ${
                    dragActive
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-border hover:border-blue-400'
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-semibold mb-2">Drop files here or click to upload</h3>
                  <p className="text-muted-foreground mb-4">
                    Supports PDF, JPG, PNG, DOC files up to 10MB each
                  </p>
                  <Button
                    onClick={() => fileInputRef.current?.click()}
                    className="mb-2"
                    disabled={!selectedCategory}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Choose Files
                  </Button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    className="hidden"
                    onChange={handleFileInput}
                    accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                  />
                  {!selectedCategory && (
                    <p className="text-sm text-red-500 mt-2">Please select a document category first</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Document Requirements */}
          <div>
            <Card className="bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Document Requirements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {documentCategories.filter(cat => cat.required).map((category) => {
                    const uploaded = documents.some(doc => doc.category === category.value && doc.status === 'completed');
                    const verified = documents.some(doc => doc.category === category.value && doc.verified);
                    
                    return (
                      <div key={category.value} className="flex items-center justify-between p-3 rounded-lg bg-accent/20">
                        <div className="flex items-center space-x-3">
                          <div className={`w-4 h-4 rounded-full border-2 ${
                            verified 
                              ? 'bg-green-500 border-green-500' 
                              : uploaded 
                                ? 'bg-yellow-500 border-yellow-500'
                                : 'border-gray-300'
                          }`}>
                            {verified && <Check className="w-3 h-3 text-white" />}
                          </div>
                          <span className="text-sm font-medium">{category.label}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          {verified && (
                            <Badge className="bg-green-100 text-green-800 text-xs">
                              Verified
                            </Badge>
                          )}
                          {uploaded && !verified && (
                            <Badge className="bg-yellow-100 text-yellow-800 text-xs">
                              Uploaded
                            </Badge>
                          )}
                          {!uploaded && (
                            <Badge variant="outline" className="text-xs">
                              Required
                            </Badge>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Upload Guidelines */}
            <Card className="bg-card/50 backdrop-blur-sm mt-6">
              <CardHeader>
                <CardTitle>Upload Guidelines</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start space-x-2">
                    <Check className="w-4 h-4 text-green-600 mt-0.5" />
                    <span>Files should be clear and readable</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Check className="w-4 h-4 text-green-600 mt-0.5" />
                    <span>Maximum file size: 10MB</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Check className="w-4 h-4 text-green-600 mt-0.5" />
                    <span>Supported formats: PDF, JPG, PNG, DOC</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Check className="w-4 h-4 text-green-600 mt-0.5" />
                    <span>All documents are encrypted and secure</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Uploaded Documents List */}
        <Card className="bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Uploaded Documents ({documents.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {documents.map((document, index) => (
                <motion.div
                  key={document.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex items-center justify-between p-4 rounded-lg border border-border/50 bg-accent/10"
                >
                  <div className="flex items-center space-x-4">
                    {getFileIcon(document.type)}
                    <div>
                      <h4 className="font-semibold">{document.name}</h4>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <span>{formatFileSize(document.size)}</span>
                        <span>•</span>
                        <span>{document.uploadDate.toLocaleDateString()}</span>
                        <span>•</span>
                        <span>{documentCategories.find(cat => cat.value === document.category)?.label}</span>
                      </div>
                      {document.status === 'uploading' && (
                        <div className="mt-2">
                          <Progress value={document.progress} className="w-32 h-2" />
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={getStatusColor(document.status)}>
                      {getStatusIcon(document.status)}
                      <span className="ml-1 capitalize">{document.status}</span>
                    </Badge>
                    {document.verified && (
                      <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                        <Check className="w-3 h-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                    <div className="flex items-center space-x-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Download className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 text-red-600"
                        onClick={() => handleDelete(document.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
              
              {documents.length === 0 && (
                <div className="text-center py-8">
                  <File className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">No documents uploaded yet</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}