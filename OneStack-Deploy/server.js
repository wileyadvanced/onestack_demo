require('dotenv').config();
const express = require('express');
const path = require('path');
const axios = require('axios');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const app = express();
const PORT = process.env.PORT || 3000;

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

// Analytics Storage (in-memory - resets on server restart)
let analytics = {
  totalSearches: 0,
  searchHistory: [],
  responseTimes: [],
  startTime: Date.now()
};

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Set up EJS as the template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.get('/', (req, res) => {
  res.render('index', {
    title: 'The Wizard Search - Magical Code Discovery',
    year: new Date().getFullYear()
  });
});


// Redirect default favicon.ico requests to our SVG favicon
app.get('/favicon.ico', (req, res) => {
  res.redirect(301, '/favicon.svg');
});

// Search API endpoint
app.get('/api/search', async (req, res) => {
  const startTime = Date.now();

  try {
    const query = req.query.q;
    if (!query) {
      return res.status(400).json({ error: 'Search query is required' });
    }

    const apiKey = process.env.GOOGLE_API_KEY;
    const cx = process.env.GOOGLE_CX;

    const response = await axios.get('https://www.googleapis.com/customsearch/v1', {
      params: {
        key: apiKey,
        cx: cx,
        q: query
      }
    });

    // Track analytics
    const responseTime = Date.now() - startTime;
    analytics.totalSearches++;
    analytics.searchHistory.push({
      query: query,
      timestamp: Date.now(),
      responseTime: responseTime
    });
    analytics.responseTimes.push(responseTime);

    // Keep only last 100 searches
    if (analytics.searchHistory.length > 100) {
      analytics.searchHistory.shift();
    }
    if (analytics.responseTimes.length > 100) {
      analytics.responseTimes.shift();
    }

    res.json(response.data);
  } catch (error) {
    console.error('Search API error:', error.message);
    res.status(500).json({ error: 'Search failed', details: error.message });
  }
});

// Analytics API endpoint
app.get('/api/analytics', (req, res) => {
  const avgResponseTime = analytics.responseTimes.length > 0
    ? Math.round(analytics.responseTimes.reduce((a, b) => a + b, 0) / analytics.responseTimes.length)
    : 0;

  // Get most popular search
  const searchCounts = {};
  analytics.searchHistory.forEach(search => {
    searchCounts[search.query] = (searchCounts[search.query] || 0) + 1;
  });

  const mostPopular = Object.keys(searchCounts).length > 0
    ? Object.entries(searchCounts).sort((a, b) => b[1] - a[1])[0][0]
    : 'No searches yet';

  res.json({
    totalSearches: analytics.totalSearches,
    mostPopular: mostPopular,
    avgResponseTime: avgResponseTime,
    uptime: Math.floor((Date.now() - analytics.startTime) / 1000),
    recentSearches: analytics.searchHistory.slice(-5).reverse()
  });
});

// AI Agent Search endpoint
app.post('/api/agent-search', async (req, res) => {
  try {
    const { query } = req.body;
    if (!query) {
      return res.status(400).json({ error: 'Search query is required' });
    }

    // Step 1: Analyze query with Gemini
    const analysisPrompt = `You are a search query optimization wizard. Analyze this search query and suggest 2-3 progressively refined search queries that would get better results.

Original query: "${query}"

Respond in JSON format:
{
  "analysis": "Brief analysis of the query (1 sentence)",
  "refinedQueries": ["query1", "query2", "query3"],
  "reasoning": "Why these refinements are better (1 sentence)"
}`;

    const result = await model.generateContent(analysisPrompt);
    const response = await result.response;
    const text = response.text();

    // Parse the JSON response (remove markdown code blocks if present)
    const jsonText = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    const aiResponse = JSON.parse(jsonText);

    // Step 2: Execute searches for each refined query
    const searches = [];
    for (const refinedQuery of aiResponse.refinedQueries) {
      try {
        const searchUrl = `https://www.googleapis.com/customsearch/v1?key=${process.env.GOOGLE_API_KEY}&cx=${process.env.GOOGLE_CX}&q=${encodeURIComponent(refinedQuery)}&num=3`;
        const searchResult = await axios.get(searchUrl);
        searches.push({
          query: refinedQuery,
          results: searchResult.data.items || []
        });
      } catch (error) {
        console.error(`Search error for "${refinedQuery}":`, error.message);
        searches.push({
          query: refinedQuery,
          results: [],
          error: 'Search failed'
        });
      }
    }

    // Step 3: Get final synthesis from Gemini
    const synthesisPrompt = `You are a wizard helping users find the best search results. Based on these search results, provide a brief, magical summary (2-3 sentences) explaining what you found and why these results are the most relevant.

Original query: "${query}"
Refined queries executed: ${aiResponse.refinedQueries.join(', ')}

Provide your response in a friendly, wizard-themed tone.`;

    const synthesisResult = await model.generateContent(synthesisPrompt);
    const synthesisResponse = await synthesisResult.response;
    const summary = synthesisResponse.text();

    res.json({
      originalQuery: query,
      analysis: aiResponse.analysis,
      reasoning: aiResponse.reasoning,
      searches: searches,
      summary: summary
    });

  } catch (error) {
    console.error('AI Agent error:', error);
    res.status(500).json({
      error: 'The wizard encountered a problem',
      details: error.message
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`✨ Modern 2025-style web application ready!`);
});
