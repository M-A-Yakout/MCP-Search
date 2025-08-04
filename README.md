# MCP-Search

🎥 [Watch the video](https://c.top4top.io/m_3503lr2tx1.mp4)

![Funny GIF](https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExNm5rcmg2NTRldm9nd2RsYWQyZG9xYmNsa3VuNms0ZGQ3cnA2d2s5ayZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Ixkav29frk3QLfsb6s/giphy.gif)

An AI-powered search result analysis tool that finds the most reliable answer from web searches using advanced reasoning and source credibility assessment.

## ✨ Features

- **🧠 Intelligent Search Analysis**: Uses AI to analyze and rank search results for reliability
- **🌍 Multilingual Support**: Handles questions and responses in multiple languages (Arabic, English, etc.)
- **🔍 Source Credibility Assessment**: Evaluates the trustworthiness of information sources
- **⚡ Real-time Processing**: Streaming search and analysis with loading states
- **🛡️ Robust Fallback System**: Alternative search when APIs are unavailable
- **✈️ Travel Booking Intelligence**: Specialized support for travel and booking queries

## 🚀 Technology Stack

### Frontend
- **React** with TypeScript
- **shadcn/ui** components built on Radix UI
- **Tailwind CSS** for styling
- **TanStack React Query** for state management
- **Wouter** for routing

### Backend
- **Express.js** with TypeScript
- **OpenAI GPT-4o** for AI analysis
- **Google Custom Search API** for web results
- **PostgreSQL** with Drizzle ORM
- **Zod** for validation

## 🏁 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/mcp-search.git
   cd mcp-search
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your API keys
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

## 🔐 Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
OPENAI_API_KEY=your_openai_api_key_here
GOOGLE_SEARCH_API_KEY=your_google_search_api_key
GOOGLE_SEARCH_ENGINE_ID=your_custom_search_engine_id
DATABASE_URL=postgresql://username:password@localhost:5432/mcp_search
```

## 🔄 How It Works

1. **User Input** → User submits a question in any language
2. **Web Search** → System performs web search using Google Custom Search API
3. **AI Analysis** → AI analyzes results for credibility, relevance, and accuracy
4. **Smart Response** → Returns the most coherent and probable answer
5. **Source Validation** → Provides source reasoning and confidence levels

## 📚 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/search` | Submit a search query |
| `GET` | `/api/recent-searches` | Get search history |

### Example Usage

```javascript
// Search request
const response = await fetch('/api/search', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    query: 'What is the latest AI technology trends?',
    language: 'en'
  })
});

const result = await response.json();
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- OpenAI for providing the GPT-4o API
- Google for the Custom Search API
- The amazing open-source community

---
