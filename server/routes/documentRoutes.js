const express = require('express');
const router = express.Router();
const documentService = require('../services/documentService');

// Get all documents
router.get('/', (req, res) => {
  // In a real implementation, this would fetch from a database
  // For demo purposes, we'll return mock data
  const documents = [
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
  ];
  
  res.json(documents);
});

// Process a document
router.post('/process', async (req, res) => {
  try {
    const { document } = req.body;
    const processedDocument = await documentService.processDocument(document);
    res.json(processedDocument);
  } catch (error) {
    console.error("Error processing document:", error);
    res.status(500).json({ error: "Failed to process document" });
  }
});

module.exports = router;