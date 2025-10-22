# 🧙‍♂️ The Wizard Search

A magical search engine powered by Google Custom Search with a wizard-themed interface. Built with modern web technologies and a mystical design aesthetic.

## ✨ Features

- **Wizard Theme**: Magical floating wizard emoji, animated sparkles, and mystical effects
- **Google Custom Search Integration**: Real-time search powered by Google's API
- **Wizard's Knowledge Card**: Smart info panel for business/organization results with contact info
- **Image Thumbnails**: Search results display with magical sparkle animations
- **Glassmorphism Design**: Modern glass effects with purple gradient theme
- **Responsive Layout**: Works perfectly on desktop, tablet, and mobile devices
- **Smart Data Detection**: Automatically shows business info when available

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js, Axios
- **API**: Google Custom Search API
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Styling**: Modern CSS with CSS Grid, Flexbox, Glassmorphism
- **Icons**: Material Icons
- **Typography**: Inter font family
- **Templates**: EJS (Embedded JavaScript Templates)
- **Environment**: dotenv for API key management

## 🎨 Wizard Design Features

- **Floating Wizard Emoji**: Animated wizard at the top with magical float effect
- **Sparkle Animations**: Glowing sparkles on images with rotation and pulse
- **Crystal Ball**: Floating crystal ball emoji on knowledge card images
- **Glassmorphism**: Modern glass-like effects with backdrop blur
- **Purple Gradient Theme**: Mystical purple-to-blue gradients throughout
- **Rotating Wand Icon**: Continuously rotating magic wand in knowledge card
- **Search Box Glow**: Glowing border effect when focused
- **Smooth Animations**: Fade-in, slide-in, and stagger animations for results

## 📁 Project Structure

```
/
├── server.js              # Express server with Google Search API endpoint
├── package.json           # Dependencies (express, axios, dotenv, ejs)
├── .env                   # Google API credentials (API_KEY, CX)
├── views/
│   └── index.ejs         # Wizard search interface
└── public/
    ├── css/
    │   └── style.css     # Wizard theme styling with animations
    ├── js/
    │   └── app.js        # Search logic and knowledge card builder
    └── favicon.svg       # App icon
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)
- Google Custom Search API Key and Search Engine ID (CX)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/wileyadvanced/onestack_demo.git
   cd onestack_demo
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure API Keys** (Already included in .env)
   The `.env` file contains:
   ```
   GOOGLE_API_KEY=your_api_key_here
   GOOGLE_CX=your_search_engine_id_here
   ```

4. **Start the server**
   ```bash
   npm start
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000` to cast your first search spell!

## 🎯 Available Scripts

- `npm start` - Start the production server
- `npm run dev` - Start the development server (same as start)

## 🌟 Key Components

### Wizard Search Interface
- **Floating Wizard**: 8rem animated wizard emoji with glow effect
- **Search Bar**: Glassmorphic search box with magic wand button
- **Search Icon**: Material Icons search and auto_awesome
- **Background**: Floating purple gradient orbs

### Search Results
- **Left Panel**: Google search results with image thumbnails
- **Sparkle Effects**: Animated sparkles on result images
- **Stagger Animation**: Results fade in sequentially
- **URL Display**: With sparkle emoji prefix

### Wizard's Knowledge Card (Right Panel)
- **Smart Detection**: Only shows for business/organization results
- **Rotating Wand**: Animated magic wand icon in header
- **Crystal Ball**: Floating crystal ball on images
- **Contact Info**: Phone, address, and ratings when available
- **Visit Button**: Gradient purple button with hover lift
- **Sticky Position**: Follows scroll on desktop

### About Section
- **Wizard Stats**: Infinity spells cast, wizards count
- **Code Window**: Themed code snippet with wizard magic
- **Responsive Grid**: Adapts to screen size

## 🎨 Wizard Color Scheme

- **Primary Gradient**: Mystical purple (`#667eea` to `#764ba2`)
- **Accent Gradient**: Magical cyan (`#4facfe` to `#00f2fe`)
- **Background**: Dark mystical gradient (`#0c0c0c` to `#16213e`)
- **Link Blue**: `#8ab4f8` (Google-style blue)
- **Text Colors**: White with varying opacity for hierarchy
- **Borders**: Purple glow `rgba(102, 126, 234, 0.3)`
- **Glass Effects**: Semi-transparent with 20px backdrop blur

## 📱 Responsive Design

The wizard search is fully responsive:
- **Desktop (>768px)**: Two-column layout with Knowledge Card on right
- **Tablet**: Single column with Knowledge Card on top
- **Mobile (<480px)**: Optimized wizard size, search box, and results
- **Auto-Centering**: Results center when no Knowledge Card present

## 🔧 How It Works

### Search Flow
1. User enters query and clicks magic wand button
2. Frontend calls `/api/search?q=query` endpoint
3. Server makes request to Google Custom Search API
4. Results are parsed and displayed with animations
5. First result analyzed for business data
6. If business data found, Wizard's Knowledge Card appears

### API Endpoints
- `GET /` - Main wizard search interface
- `GET /api/search?q=query` - Proxy to Google Custom Search
- `GET /favicon.ico` - Redirects to SVG favicon

### Knowledge Card Logic
The card only appears when:
- First result has a high-quality image AND
- Contains business data (organization, local business, or place schema)
- Shows: name, description, phone, address, rating

### Customization

**Change Wizard Emoji**: Edit line 50 in `views/index.ejs`
```html
<span class="wizard-emoji">🧙‍♂️</span>
```

**Adjust Colors**: Modify CSS variables in `public/css/style.css`
```css
:root {
    --primary: linear-gradient(135deg, #667eea, #764ba2);
    --accent: linear-gradient(135deg, #4facfe, #00f2fe);
}
```

## 🎯 Search Features

- **Real-time Results**: Powered by Google Custom Search Engine
- **Image Thumbnails**: Displays page images when available
- **Sparkle Effects**: Magical animations on hover
- **Loading States**: "Casting search spell..." with spinner
- **Error Handling**: "The spell fizzled!" on failures
- **Empty States**: Friendly "No magical results" message
- **Fast Performance**: Lazy image loading and optimized animations

## 🧙‍♂️ Wizard Easter Eggs

- Wizard emoji floats continuously
- Search button wand rotates on hover
- Sparkles pulse and rotate on images
- Crystal ball floats over Knowledge Card image
- Results header: "The wizard conjured X results in Y seconds"
- Auto-center layout when no business data

## 📄 License

This project is licensed under the MIT License.

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🚀 Deployment

This app is ready for deployment with `.env` file included:

```bash
# On your server
git clone https://github.com/wileyadvanced/onestack_demo.git
cd onestack_demo
npm install
npm start
```

The server runs on port 3000 by default (configurable via `PORT` environment variable).

## 📞 Support

For questions or support, create an issue in the repository.

---

**🧙‍♂️ Built with magical code and wizard spells**
*Generated with [Claude Code](https://claude.com/claude-code)*
