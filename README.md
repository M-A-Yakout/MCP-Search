# MCP-Search
![Funny GIF](https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExNm5rcmg2NTRldm9nd2RsYWQyZG9xYmNsa3VuNms0ZGQ3cnA2d2s5ayZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Ixkav29frk3QLfsb6s/giphy.gif)

An AI-powered search result analysis tool that finds the most reliable answer from web searches using advanced reasoning and source credibility assessment.

## Features

- **Intelligent Search Analysis**: Uses AI to analyze and rank search results for reliability
- **Multilingual Support**: Handles questions and responses in multiple languages (Arabic, English, etc.)
- **Source Credibility Assessment**: Evaluates the trustworthiness of information sources
- **Real-time Processing**: Streaming search and analysis with loading states
- **Robust Fallback System**: Alternative search when APIs are unavailable
- **Travel Booking Intelligence**: Specialized support for travel and booking queries

## Technology Stack

### Frontend
- React with TypeScript
- shadcn/ui components built on Radix UI
- Tailwind CSS for styling
- TanStack React Query for state management
- Wouter for routing

### Backend
- Express.js with TypeScript
- OpenAI GPT-4o for AI analysis
- Google Custom Search API for web results
- PostgreSQL with Drizzle ORM
- Zod for validation

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables (see `.env.example`)
4. Start the development server: `npm run dev`

## Environment Variables

- `OPENAI_API_KEY`: Your OpenAI API key
- `GOOGLE_SEARCH_API_KEY`: Google Custom Search API key
- `GOOGLE_SEARCH_ENGINE_ID`: Custom Search Engine ID
- `DATABASE_URL`: PostgreSQL connection string (optional)

## How It Works

1. User submits a question in any language
2. System performs web search using Google Custom Search API
3. AI analyzes results for credibility, relevance, and accuracy
4. Returns the most coherent and probable answer
5. Provides source reasoning and confidence levels

## API Endpoints

- `POST /api/search` - Submit a search query
- `GET /api/recent-searches` - Get search history

## License

MIT License
