import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Upload, 
  FileText, 
  File, 
  Search,
  Download,
  Trash2,
  Eye,
  Calendar,
  Database
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Document {
  id: string;
  name: string;
  type: 'manual' | 'specification' | 'report' | 'policy';
  size: string;
  uploadedAt: Date;
  lastAccessed: Date;
  status: 'processed' | 'processing' | 'error';
  chunks: number;
  embeddings: number;
}

export default function Documents() {
  const [documents] = useState<Document[]>([
    {
      id: 'DOC-001',
      name: 'HVAC Maintenance Manual 2024.pdf',
      type: 'manual',
      size: '2.4 MB',
      uploadedAt: new Date('2024-01-15'),
      lastAccessed: new Date(),
      status: 'processed',
      chunks: 127,
      embeddings: 127
    },
    {
      id: 'DOC-002',
      name: 'Building Electrical Specifications.docx',
      type: 'specification',
      size: '1.8 MB',
      uploadedAt: new Date('2024-01-10'),
      lastAccessed: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      status: 'processed',
      chunks: 89,
      embeddings: 89
    },
    {
      id: 'DOC-003',
      name: 'Energy Efficiency Report Q4.pdf',
      type: 'report',
      size: '3.1 MB',
      uploadedAt: new Date('2024-01-05'),
      lastAccessed: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      status: 'processed',
      chunks: 156,
      embeddings: 156
    },
    {
      id: 'DOC-004',
      name: 'Safety Protocols 2024.pdf',
      type: 'policy',
      size: '892 KB',
      uploadedAt: new Date('2024-01-08'),
      lastAccessed: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      status: 'processing',
      chunks: 0,
      embeddings: 0
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [isDragOver, setIsDragOver] = useState(false);

  const filteredDocuments = documents.filter(doc => 
    doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getDocumentIcon = (type: string) => {
    switch (type) {
      case 'manual':
        return <FileText className="w-5 h-5 text-iot-blue" />;
      case 'specification':
        return <File className="w-5 h-5 text-iot-cyan" />;
      case 'report':
        return <FileText className="w-5 h-5 text-iot-green" />;
      case 'policy':
        return <File className="w-5 h-5 text-iot-purple" />;
      default:
        return <File className="w-5 h-5 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'processed':
        return <Badge className="bg-success text-success-foreground">Processed</Badge>;
      case 'processing':
        return <Badge variant="secondary" className="animate-pulse">Processing</Badge>;
      case 'error':
        return <Badge variant="destructive">Error</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getTypeBadge = (type: string) => {
    const colors = {
      manual: 'bg-iot-blue/10 text-iot-blue border-iot-blue/20',
      specification: 'bg-iot-cyan/10 text-iot-cyan border-iot-cyan/20',
      report: 'bg-iot-green/10 text-iot-green border-iot-green/20',
      policy: 'bg-iot-purple/10 text-iot-purple border-iot-purple/20'
    };

    return (
      <Badge variant="outline" className={colors[type as keyof typeof colors]}>
        {type.charAt(0).toUpperCase() + type.slice(1)}
      </Badge>
    );
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    console.log('Files dropped:', files);
    // Handle file upload logic here
  };

  const totalDocuments = documents.length;
  const processedDocuments = documents.filter(d => d.status === 'processed').length;
  const totalChunks = documents.reduce((sum, doc) => sum + doc.chunks, 0);
  const totalEmbeddings = documents.reduce((sum, doc) => sum + doc.embeddings, 0);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center space-x-3 mb-4 lg:mb-0">
          <div className="p-3 bg-gradient-primary rounded-xl">
            <Upload className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold iot-gradient-text">
              Document Management
            </h1>
            <p className="text-muted-foreground">
              Upload and manage building documentation for RAG processing
            </p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="iot-card p-6">
          <div className="flex items-center space-x-3">
            <Database className="w-8 h-8 text-primary" />
            <div>
              <div className="text-2xl font-bold text-foreground">{totalDocuments}</div>
              <div className="text-sm text-muted-foreground">Total Documents</div>
            </div>
          </div>
        </Card>
        
        <Card className="iot-card p-6">
          <div className="flex items-center space-x-3">
            <FileText className="w-8 h-8 text-success" />
            <div>
              <div className="text-2xl font-bold text-foreground">{processedDocuments}</div>
              <div className="text-sm text-muted-foreground">Processed</div>
            </div>
          </div>
        </Card>
        
        <Card className="iot-card p-6">
          <div className="flex items-center space-x-3">
            <File className="w-8 h-8 text-iot-cyan" />
            <div>
              <div className="text-2xl font-bold text-foreground">{totalChunks}</div>
              <div className="text-sm text-muted-foreground">Text Chunks</div>
            </div>
          </div>
        </Card>
        
        <Card className="iot-card p-6">
          <div className="flex items-center space-x-3">
            <Search className="w-8 h-8 text-iot-purple" />
            <div>
              <div className="text-2xl font-bold text-foreground">{totalEmbeddings}</div>
              <div className="text-sm text-muted-foreground">Embeddings</div>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upload Area */}
        <div className="lg:col-span-1">
          <Card className="iot-card h-fit">
            <div className="p-6">
              <h3 className="font-semibold mb-4">Upload Documents</h3>
              
              {/* Drag & Drop Area */}
              <div
                className={cn(
                  'border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300',
                  isDragOver 
                    ? 'border-primary bg-primary/5 shadow-glow' 
                    : 'border-border hover:border-primary/50'
                )}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-sm text-muted-foreground mb-4">
                  Drag & drop files here, or click to select
                </p>
                <Button variant="outline" className="mb-4">
                  Choose Files
                </Button>
                <p className="text-xs text-muted-foreground">
                  Supports PDF, DOCX, TXT files up to 10MB
                </p>
              </div>
              
              {/* Supported Types */}
              <div className="mt-6">
                <h4 className="font-medium mb-3">Supported Document Types</h4>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <FileText className="w-4 h-4 text-iot-blue" />
                    <span className="text-sm">Maintenance Manuals</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <File className="w-4 h-4 text-iot-cyan" />
                    <span className="text-sm">Technical Specifications</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FileText className="w-4 h-4 text-iot-green" />
                    <span className="text-sm">Performance Reports</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <File className="w-4 h-4 text-iot-purple" />
                    <span className="text-sm">Safety Policies</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Documents List */}
        <div className="lg:col-span-2">
          <Card className="iot-card">
            <div className="p-6 border-b border-border/50">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                <h3 className="font-semibold">Document Library</h3>
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Search documents..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 w-64"
                    />
                  </div>
                </div>
              </div>
            </div>

            <ScrollArea className="h-[600px]">
              <div className="p-6 space-y-4">
                {filteredDocuments.map((document) => (
                  <Card key={document.id} className="p-4 hover:shadow-sm transition-shadow">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        {getDocumentIcon(document.type)}
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-foreground truncate">
                            {document.name}
                          </h4>
                          <div className="flex flex-wrap items-center gap-2 mt-2">
                            {getTypeBadge(document.type)}
                            {getStatusBadge(document.status)}
                          </div>
                          <div className="flex items-center space-x-4 mt-3 text-sm text-muted-foreground">
                            <span>Size: {document.size}</span>
                            <span>Chunks: {document.chunks}</span>
                            <span>Embeddings: {document.embeddings}</span>
                          </div>
                          <div className="flex items-center space-x-4 mt-2 text-xs text-muted-foreground">
                            <div className="flex items-center space-x-1">
                              <Calendar className="w-3 h-3" />
                              <span>Uploaded: {document.uploadedAt.toLocaleDateString()}</span>
                            </div>
                            <span>Last accessed: {document.lastAccessed.toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2 ml-4">
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Download className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
                
                {filteredDocuments.length === 0 && (
                  <div className="text-center py-8">
                    <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">
                      {searchQuery ? 'No documents match your search' : 'No documents uploaded yet'}
                    </p>
                  </div>
                )}
              </div>
            </ScrollArea>
          </Card>
        </div>
      </div>
    </div>
  );
}