import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(req) {
  try {
    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
    
    if (!apiKey) {
      console.error('Missing API Key:', !!process.env.GOOGLE_GENERATIVE_AI_API_KEY);
      return new Response(
        JSON.stringify({ error: 'AI service not configured. Please contact the site administrator.' }), 
        { 
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    const { message, history = [] } = await req.json();

    if (!message) {
      return new Response(
        JSON.stringify({ error: 'Message is required' }), 
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Initialize Google Generative AI
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    // Build conversation history for context
    const chatHistory = history.map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }]
    }));

    // Add current message
    chatHistory.push({
      role: 'user',
      parts: [{ text: message }]
    });

    // Start chat with history
    const chat = model.startChat({
      history: chatHistory,
      generationConfig: {
        maxOutputTokens: 1024,
        temperature: 0.7,
      },
    });

    // Send message and get response
    const result = await chat.sendMessage(message);
    const response = await result.response;
    const text = response.text();

    return new Response(
      JSON.stringify({ 
        success: true,
        response: text 
      }), 
      { 
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('Chat API Error:', error.message, error.stack);
    return new Response(
      JSON.stringify({ 
        error: 'AI service error. Please try again.',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      }), 
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}
