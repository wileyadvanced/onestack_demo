# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

The Wizard Search is a modern web application featuring a wizard-themed Google Custom Search interface with AI-enhanced search capabilities and image generation. Built with Node.js/Express backend and vanilla JavaScript frontend with Material Design aesthetics.

## Commands

### Development
```bash
npm install           # Install dependencies
npm start             # Start production server on port 3000
npm run dev           # Start development server (same as start)
```

### Server
- The server runs on port 3000 by default (configurable via `PORT` environment variable)
- Hot-reload is not configured - restart the server after backend changes

## Architecture

### Backend Structure (`server.js`)

The Express server provides several key endpoints:

1. **Search System**:
   - `/api/search` - Proxy to Google Custom Search API with analytics tracking
   - `/api/agent-search` - AI-enhanced search using Gemini 2.0 Flash to analyze queries, generate refined searches, and synthesize results

2. **Image Generation**:
   - `/api/generate-image` - Uses Google Imagen 4.0 to generate 4 images from text prompts

3. **Analytics**:
   - `/api/analytics` - Real-time search statistics (in-memory, resets on restart)
   - Tracks: total searches, search history (last 100), response times, most popular query

4. **AI Integration**:
   - Uses `@google/generative-ai` for Gemini text model (`gemini-2.0-flash-exp`)
   - Uses `@google/genai` for Imagen image generation (`imagen-4.0-generate-001`)

### Frontend Architecture

The frontend is organized as a single-page application with modular JavaScript:

1. **Main App (`public/js/app.js`)**:
   - `NexusApp` class manages all interactive features
   - Handles standard Google search, AI agent search mode, and analytics
   - Search flow: User query → `/api/search` → Display results with knowledge cards
   - Agent search flow: Toggle AI mode → `/api/agent-search` → Display analysis + refined searches + synthesis
   - Easter eggs: Searching for "wizard", "magic", or "abracadabra" triggers special animation

2. **Image Wizard (`public/js/image-wizard.js`)**:
   - Modal-based image generation interface
   - Sends prompts to `/api/generate-image`
   - Displays 4 generated images with download functionality

3. **Styling**:
   - `public/css/style.css` - Main wizard theme with glassmorphism effects
   - `public/css/image-wizard.css` - Image generation modal styles
   - Purple gradient theme (`#667eea` to `#764ba2`)
   - Heavy use of Material Design icons

4. **Templates (`views/index.ejs`)**:
   - Single template rendering the entire UI
   - Includes analytics card, search interface, AI toggle, image modal, and results area

### Key Features

1. **Knowledge Card System** (`buildInfoCard` in app.js):
   - Parses structured data from search results (OpenGraph, Schema.org)
   - Only displays when first result has business data (organization, local business, place)
   - Shows: image, name, description, phone, address, rating

2. **AI Agent Search**:
   - Step 1: Gemini analyzes query and generates 2-3 refined queries
   - Step 2: Execute all refined queries in parallel
   - Step 3: Gemini synthesizes results with wizard-themed summary
   - Displays all steps with progressive disclosure

3. **Analytics System**:
   - In-memory tracking (not persistent)
   - Auto-updates every 5 seconds via polling
   - Animated counter transitions for stat changes

## Environment Variables

Required in `.env` file:
- `GOOGLE_API_KEY` - Google Custom Search API key (also used for Gemini/Imagen)
- `GEMINI_API_KEY` - Google AI API key for Gemini and Imagen
- `GOOGLE_CX` - Google Custom Search Engine ID
- `PORT` - Server port (optional, defaults to 3000)

## Code Patterns

### Adding New API Endpoints

Follow the existing pattern in `server.js`:
```javascript
app.post('/api/your-endpoint', async (req, res) => {
  try {
    const { param } = req.body;
    // Validate input
    if (!param) {
      return res.status(400).json({ error: 'Error message' });
    }
    // Process and return
    res.json({ result: data });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'User-friendly message', details: error.message });
  }
});
```

### Frontend Search Implementation

To add new search modes:
1. Add UI toggle/button in `views/index.ejs`
2. Check toggle state in `performSearch()` method
3. Create new method like `performAgentSearch()`
4. Create display method like `displayAgentResults()`

### Styling Convention

- Use CSS custom properties from `:root` in `style.css`
- Material Design icons via `<span class="material-icons">icon_name</span>`
- Glassmorphism: `backdrop-filter: blur(20px)` + semi-transparent backgrounds
- Animations: Use CSS animations with delays for staggered effects

## Important Notes

- Analytics data is stored in-memory and will reset on server restart
- Image generation returns base64-encoded images (4 per request)
- The agent search mode uses Gemini and may take 3-5 seconds for complete processing
- Knowledge cards only appear for business/organization results with structured data
- All external links open in new tabs with `rel="noopener noreferrer"`

## Testing

Currently no automated tests. Manual testing workflow:
1. Start server: `npm start`
2. Visit `http://localhost:3000`
3. Test standard search with various queries
4. Toggle AI Agent mode and test complex queries
5. Click image button and test image generation
6. Check analytics panel for stat updates
