const { OpenAI } = require('openai');
const documentService = require('../services/documentService');

// Initialize OpenAI client with OpenRouter configuration
const client = new OpenAI({
  base_url: "https://openrouter.ai/api/v1",
  api_key: process.env.OPENROUTER_API_KEY,
});

// Generate response with context from retrieved documents
async function generateResponse(req, res) {
  try {
    const { message } = req.body;
    
    // Query relevant documents
    const relevantDocs = await documentService.queryDocuments(message);
    
    // Format context from retrieved documents
    let context = "";
    if (relevantDocs && relevantDocs.documents && relevantDocs.documents[0]) {
      context = "Context from building documents:\n" + 
               relevantDocs.documents[0].join("\n\n") + "\n\n";
    }
    
    // Generate response using OpenRouter
    const completion = await client.chat.completions.create({
      extra_headers: {
        "HTTP-Referer": "https://smart-insight-nexus.com", // Replace with your actual site URL
        "X-Title": "Smart Insight Nexus", // Replace with your actual site name
      },
      extra_body: {},
      model: "deepseek/deepseek-r1-0528:free",
      messages: [
        {
          role: "system",
          content: `You are an AI assistant for a smart building management system. 
          Use the provided context from building documents and sensor data to answer questions 
          about maintenance, operations, and building systems. If you don't know the answer, 
          say so rather than making up information.`
        },
        {
          role: "user",
          content: context + "User question: " + message
        }
      ],
      temperature: 0.7,
      max_tokens: 500
    });
    
    // Format sources for frontend
    const sources = [];
    if (relevantDocs && relevantDocs.metadatas && relevantDocs.metadatas[0]) {
      relevantDocs.metadatas[0].forEach(metadata => {
        if (metadata && metadata.documentName) {
          sources.push(metadata.documentName);
        }
      });
    }
    
    // Return response
    res.json({
      id: Date.now().toString(),
      type: 'assistant',
      content: completion.choices[0].message.content,
      timestamp: new Date(),
      sources: [...new Set(sources)], // Remove duplicates
      confidence: 0.9 // Mock confidence score
    });
  } catch (error) {
    console.error("Error generating response:", error);
    res.status(500).json({ error: "Failed to generate response" });
  }
}

module.exports = {
  generateResponse
};