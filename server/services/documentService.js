const { ChromaClient } = require('chromadb');
const { OpenAI } = require('openai');
const fs = require('fs');
const path = require('path');

// Initialize OpenAI client with OpenRouter configuration
const client = new OpenAI({
  base_url: "https://openrouter.ai/api/v1",
  api_key: process.env.OPENROUTER_API_KEY,
});

// Initialize ChromaDB client
const chromaClient = new ChromaClient();
let collection;

// Initialize collection
async function initializeCollection() {
  try {
    collection = await chromaClient.getOrCreateCollection({
      name: "building_documents",
      metadata: { "hnsw:space": "cosine" }
    });
    console.log("ChromaDB collection initialized");
  } catch (error) {
    console.error("Error initializing ChromaDB collection:", error);
  }
}

// Process document and add to vector database
async function processDocument(document) {
  try {
    // In a real implementation, this would parse the document content
    // For demo purposes, we'll use mock content
    const mockContent = `This is mock content for ${document.name}. 
    It contains information about building systems, maintenance procedures, 
    and technical specifications.`;
    
    // Split content into chunks (simplified)
    const chunks = mockContent.split('\n').filter(chunk => chunk.trim() !== '');
    
    // Generate embeddings for each chunk
    const embeddings = [];
    const ids = [];
    const metadatas = [];
    const documents = [];
    
    for (let i = 0; i < chunks.length; i++) {
      const response = await client.embeddings.create({
        extra_headers: {
          "HTTP-Referer": "https://smart-insight-nexus.com", // Replace with your actual site URL
          "X-Title": "Smart Insight Nexus", // Replace with your actual site name
        },
        model: "text-embedding-ada-002", // You may need to check if OpenRouter supports this model
        input: chunks[i],
      });
      
      embeddings.push(response.data[0].embedding);
      ids.push(`${document.id}-chunk-${i}`);
      metadatas.push({
        documentId: document.id,
        documentName: document.name,
        documentType: document.type,
        chunkIndex: i
      });
      documents.push(chunks[i]);
    }
    
    // Add to ChromaDB
    await collection.add({
      ids: ids,
      embeddings: embeddings,
      metadatas: metadatas,
      documents: documents
    });
    
    return {
      ...document,
      status: 'processed',
      chunks: chunks.length,
      embeddings: chunks.length
    };
  } catch (error) {
    console.error("Error processing document:", error);
    return {
      ...document,
      status: 'error',
      chunks: 0,
      embeddings: 0
    };
  }
}

// Query documents based on user input
async function queryDocuments(query, limit = 5) {
  try {
    // Generate embedding for query
    const response = await client.embeddings.create({
      extra_headers: {
        "HTTP-Referer": "https://smart-insight-nexus.com", // Replace with your actual site URL
        "X-Title": "Smart Insight Nexus", // Replace with your actual site name
      },
      model: "text-embedding-ada-002", // You may need to check if OpenRouter supports this model
      input: query,
    });
    
    const queryEmbedding = response.data[0].embedding;
    
    // Query ChromaDB
    const results = await collection.query({
      queryEmbeddings: [queryEmbedding],
      nResults: limit
    });
    
    return results;
  } catch (error) {
    console.error("Error querying documents:", error);
    return [];
  }
}

// Initialize on module load
initializeCollection();

module.exports = {
  processDocument,
  queryDocuments
};