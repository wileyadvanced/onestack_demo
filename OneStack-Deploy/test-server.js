const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Simple test route
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head><title>Test Server</title></head>
    <body>
      <h1>Server is working!</h1>
      <p>Static files should be available at: <a href="/css/style.css">CSS</a></p>
      <p>Main app should be at: <a href="/app">App</a></p>
    </body>
    </html>
  `);
});

// Test route for the main app
app.get('/app', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.ejs'));
});

app.listen(PORT, () => {
  console.log(`🚀 Test server running on http://localhost:${PORT}`);
  console.log(`📁 Serving static files from: ${path.join(__dirname, 'public')}`);
  console.log(`📄 Views directory: ${path.join(__dirname, 'views')}`);
});
