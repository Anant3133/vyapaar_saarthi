import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import {
  Upload,
  FileText,
  Image,
  File,
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
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';
import { DocumentsAPI, BusinessesAPI } from '@/api';

// This interface defines the structure for a document object used in the component's state.
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
  url?: string; // Added URL for view/download functionality
}

export function UploadDocuments() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedApplication, setSelectedApplication] = useState('');
  const [dragActive, setDragActive] = useState(false);
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

  const [applications, setApplications] = useState<{ value: string; label: string }[]>([]);

  // Fetches initial data (documents and applications) when the component mounts.
  useEffect(() => {
    let mounted = true;
    const fetchData = async () => {
        try {
            // Uses the new getMyDocuments endpoint (GET /documents/me)
            const [docs, myApps] = await Promise.all([
                DocumentsAPI.getMyDocuments(),
                BusinessesAPI.getMyLicenseApplications()
            ]);

            if (!mounted) return;

            setDocuments(
                (docs || []).map((d: any) => ({
                    id: d.id,
                    name: d.url?.split('/')?.pop() || d.document_type || 'document',
                    type: d.url?.toLowerCase().endsWith('.pdf') ? 'application/pdf' : 'image/jpeg',
                    size: d.metadata?.size || 0,
                    uploadDate: new Date(d.uploaded_at || Date.now()),
                    status: 'completed',
                    progress: 100,
                    category: d.document_type || 'other',
                    verified: d.is_verified || false,
                    url: d.url
                }))
            );

            setApplications(
                (myApps || []).map((a: any) => ({ value: a.id, label: `${a.license_type} - #${a.id.substring(0, 8)}` }))
            );
        } catch (e) {
            console.error("Failed to fetch initial data:", e);
        }
    };

    fetchData();
    return () => { mounted = false; };
  }, []);

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
      case 'completed': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'uploading': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'processing': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'error': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <Check className="w-4 h-4" />;
      case 'uploading': return <Cloud className="w-4 h-4 animate-pulse" />;
      case 'processing': return <Clock className="w-4 h-4" />;
      case 'error': return <AlertCircle className="w-4 h-4" />;
      default: return <File className="w-4 h-4" />;
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') setDragActive(true);
    else if (e.type === 'dragleave') setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files?.[0]) handleFiles(Array.from(e.dataTransfer.files));
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) handleFiles(Array.from(e.target.files));
  };

  // Handles the file upload process.
  const handleFiles = (files: File[]) => {
    if (!selectedCategory) {
      alert('Please select a document category first');
      return;
    }

    const tempDocs = files.map(file => ({
        id: `${Date.now()}-${file.name}`,
        name: file.name,
        type: file.type,
        size: file.size,
        uploadDate: new Date(),
        status: 'uploading' as const,
        progress: 0,
        category: selectedCategory,
        applicationId: selectedApplication || undefined
    }));

    setDocuments(prev => [...prev, ...tempDocs]);

    tempDocs.forEach(tempDoc => {
        const file = files.find(f => f.name === tempDoc.name && f.size === tempDoc.size);
        if (!file) return;

        const extra: Record<string, string> = { document_type: selectedCategory };
        if (selectedApplication) extra['license_application_id'] = selectedApplication;
        if (description) extra['description'] = description;

        // Uses the uploadDocument API call
        DocumentsAPI.uploadDocument(file, extra, (event: any) => {
            const progress = Math.round((event.loaded * 100) / event.total);
            setDocuments(prev => prev.map(doc => doc.id === tempDoc.id ? { ...doc, progress } : doc));
        })
        .then(uploadedDoc => {
            setDocuments(prev => prev.map(doc => doc.id === tempDoc.id ? {
                ...doc,
                id: uploadedDoc.id,
                status: 'completed',
                progress: 100,
                url: uploadedDoc.url,
                verified: uploadedDoc.is_verified,
                uploadDate: new Date(uploadedDoc.uploaded_at)
            } : doc));
        })
        .catch(e => {
            console.error("Upload failed for:", tempDoc.name, e);
            setDocuments(prev => prev.map(doc => doc.id === tempDoc.id ? { ...doc, status: 'error', progress: 0 } : doc));
        });
    });
  };

  // Handles deleting a document.
  const handleDelete = async (documentId: string) => {
    const originalDocuments = [...documents];
    setDocuments(prev => prev.filter(doc => doc.id !== documentId));

    try {
      // Uses the deleteDocument API call
      await DocumentsAPI.deleteDocument(documentId);
    } catch (e) {
      console.error("Failed to delete document:", e);
      setDocuments(originalDocuments);
      alert("Failed to delete the document. Please try again.");
    }
  };

  const uploadStats = {
    total: documents.length,
    completed: documents.filter(doc => doc.status === 'completed').length,
    verified: documents.filter(doc => doc.verified).length,
    pending: documents.filter(doc => ['uploading', 'processing'].includes(doc.status)).length
  };

  return (
    <div className="p-6 space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Upload Documents</h1>
            <p className="text-muted-foreground">Upload and manage your application documents securely</p>
          </div>
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200"><Shield className="w-3 h-3 mr-1" />Secure Upload</Badge>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card><CardContent className="p-4 flex items-center justify-between"><div><p className="text-sm text-muted-foreground">Total Documents</p><p className="text-2xl font-bold">{uploadStats.total}</p></div><File className="w-8 h-8 text-blue-600" /></CardContent></Card>
          <Card><CardContent className="p-4 flex items-center justify-between"><div><p className="text-sm text-muted-foreground">Completed</p><p className="text-2xl font-bold text-green-600">{uploadStats.completed}</p></div><Check className="w-8 h-8 text-green-600" /></CardContent></Card>
          <Card><CardContent className="p-4 flex items-center justify-between"><div><p className="text-sm text-muted-foreground">Verified</p><p className="text-2xl font-bold text-purple-600">{uploadStats.verified}</p></div><Shield className="w-8 h-8 text-purple-600" /></CardContent></Card>
          <Card><CardContent className="p-4 flex items-center justify-between"><div><p className="text-sm text-muted-foreground">Pending</p><p className="text-2xl font-bold text-yellow-600">{uploadStats.pending}</p></div><Clock className="w-8 h-8 text-yellow-600" /></CardContent></Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card><CardHeader><CardTitle>Upload New Documents</CardTitle></CardHeader><CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div><Label htmlFor="category">Document Category *</Label><Select value={selectedCategory} onValueChange={setSelectedCategory}><SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger><SelectContent>{documentCategories.map(c => <SelectItem key={c.value} value={c.value}>{c.label}{c.required && <span className="text-red-500 ml-1">*</span>}</SelectItem>)}</SelectContent></Select></div>
                <div><Label htmlFor="application">Link to Application</Label><Select value={selectedApplication} onValueChange={setSelectedApplication}><SelectTrigger><SelectValue placeholder="Select application (optional)" /></SelectTrigger><SelectContent>{applications.map(a => <SelectItem key={a.value} value={a.value}>{a.label}</SelectItem>)}</SelectContent></Select></div>
              </div>
              <div><Label htmlFor="description">Description (Optional)</Label><Textarea id="description" placeholder="Add any additional notes..." value={description} onChange={e => setDescription(e.target.value)} className="mt-1" /></div>
              <div className={`border-2 border-dashed rounded-lg p-8 text-center transition-all ${dragActive ? 'border-blue-500 bg-blue-50' : 'border-border hover:border-blue-400'}`} onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}>
                <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" /><h3 className="text-lg font-semibold mb-2">Drop files here or click to upload</h3><p className="text-muted-foreground mb-4">Supports PDF, JPG, PNG, DOC files up to 10MB</p>
                <Button onClick={() => fileInputRef.current?.click()} disabled={!selectedCategory}><Plus className="w-4 h-4 mr-2" />Choose Files</Button>
                <input ref={fileInputRef} type="file" multiple className="hidden" onChange={handleFileInput} accept=".pdf,.jpg,.jpeg,.png,.doc,.docx" />
                {!selectedCategory && <p className="text-sm text-red-500 mt-2">Please select a document category first</p>}
              </div>
            </CardContent></Card>
          </div>
          <div>
            <Card><CardHeader><CardTitle>Document Requirements</CardTitle></CardHeader><CardContent><div className="space-y-4">{documentCategories.filter(c=>c.required).map(c=>{const u=documents.some(d=>d.category===c.value&&d.status==='completed');const v=documents.some(d=>d.category===c.value&&d.verified);return(<div key={c.value} className="flex items-center justify-between p-3 rounded-lg bg-accent/20"><div className="flex items-center space-x-3"><div className={`w-4 h-4 rounded-full border-2 ${v?'bg-green-500 border-green-500':u?'bg-yellow-500 border-yellow-500':'border-gray-300'}`}>{v&&<Check className="w-3 h-3 text-white"/>}</div><span className="text-sm font-medium">{c.label}</span></div><div>{v?<Badge className="bg-green-100 text-green-800 text-xs">Verified</Badge>:u?<Badge className="bg-yellow-100 text-yellow-800 text-xs">Uploaded</Badge>:<Badge variant="outline" className="text-xs">Required</Badge>}</div></div>)})}</div></CardContent></Card>
            <Card className="mt-6"><CardHeader><CardTitle>Upload Guidelines</CardTitle></CardHeader><CardContent><div className="space-y-3 text-sm"><div className="flex items-start space-x-2"><Check className="w-4 h-4 text-green-600 mt-0.5"/><span>Files should be clear and readable</span></div><div className="flex items-start space-x-2"><Check className="w-4 h-4 text-green-600 mt-0.5"/><span>Maximum file size: 10MB</span></div><div className="flex items-start space-x-2"><Check className="w-4 h-4 text-green-600 mt-0.5"/><span>Supported formats: PDF, JPG, PNG, DOC</span></div><div className="flex items-start space-x-2"><Check className="w-4 h-4 text-green-600 mt-0.5"/><span>All documents are encrypted and secure</span></div></div></CardContent></Card>
          </div>
        </div>

        <Card className="mt-6"><CardHeader><CardTitle>Uploaded Documents ({documents.length})</CardTitle></CardHeader><CardContent><div className="space-y-4">
          {documents.map((doc, i) => (
            <motion.div key={doc.id} initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.3,delay:i*0.05}} className="flex flex-wrap items-center justify-between p-4 rounded-lg border">
              <div className="flex items-center space-x-4 flex-1 min-w-0"><div className="flex-shrink-0">{getFileIcon(doc.type)}</div><div className="flex-1 min-w-0"><h4 className="font-semibold truncate">{doc.name}</h4><div className="flex items-center flex-wrap gap-x-2 text-sm text-muted-foreground"><span>{formatFileSize(doc.size)}</span><span>•</span><span>{doc.uploadDate.toLocaleDateString()}</span><span>•</span><span className="truncate">{documentCategories.find(c=>c.value===doc.category)?.label}</span></div>{doc.status==='uploading'&&<div className="mt-2 w-full max-w-xs"><Progress value={doc.progress} className="h-2"/></div>}</div></div>
              <div className="flex items-center space-x-2 mt-2 sm:mt-0"><Badge className={getStatusColor(doc.status)}>{getStatusIcon(doc.status)}<span className="ml-1 capitalize">{doc.status}</span></Badge>{doc.verified&&<Badge className="bg-green-100 text-green-800"><Check className="w-3 h-3 mr-1"/>Verified</Badge>}<div className="flex items-center"><Button variant="ghost" size="icon" className="h-8 w-8" onClick={()=>window.open(doc.url,'_blank')} disabled={!doc.url}><Eye className="w-4 h-4"/></Button><Button variant="ghost" size="icon" className="h-8 w-8" onClick={()=>window.open(doc.url,'_self')} disabled={!doc.url}><Download className="w-4 h-4"/></Button><Button variant="ghost" size="icon" className="h-8 w-8 text-red-600 hover:bg-red-100" onClick={()=>handleDelete(doc.id)}><Trash2 className="w-4 h-4"/></Button></div></div>
            </motion.div>
          ))}
          {documents.length===0&&<div className="text-center py-8"><File className="w-12 h-12 mx-auto mb-4 text-muted-foreground"/><p className="text-muted-foreground">No documents uploaded yet</p></div>}
        </div></CardContent></Card>
      </motion.div>
    </div>
  );
}
