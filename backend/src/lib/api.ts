const API_URL = 'http://localhost:5000/api';

export interface Document {
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

export interface Message {
  id: string;
  type: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  sources?: string[];
  confidence?: number;
}

// Fetch all documents
export async function fetchDocuments(): Promise<Document[]> {
  const response = await fetch(`${API_URL}/documents`);
  const data = await response.json();
  
  // Convert string dates to Date objects
  return data.map((doc: any) => ({
    ...doc,
    uploadedAt: new Date(doc.uploadedAt),
    lastAccessed: new Date(doc.lastAccessed)
  }));
}

// Process a document
export async function processDocument(document: Document): Promise<Document> {
  const response = await fetch(`${API_URL}/documents/process`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ document })
  });
  
  const data = await response.json();
  
  // Convert string dates to Date objects
  return {
    ...data,
    uploadedAt: new Date(data.uploadedAt),
    lastAccessed: new Date(data.lastAccessed)
  };
}

// Send a chat message and get response
export async function sendChatMessage(message: string): Promise<Message> {
  const response = await fetch(`${API_URL}/chat/message`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ message })
  });
  
  const data = await response.json();
  
  // Convert string date to Date object
  return {
    ...data,
    timestamp: new Date(data.timestamp)
  };
}