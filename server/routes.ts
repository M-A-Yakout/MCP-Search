import type { Express } from "express";
import { createServer, type Server } from "http";
import { z } from "zod";
import { storage } from "./storage";
import { performGoogleSearch } from "./services/search";
import { analyzeMCPResults, detectLanguage } from "./services/openai";
import type { MCPAnalysisRequest } from "@shared/schema";

const searchRequestSchema = z.object({
  question: z.string().min(1, "Question is required"),
});

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Search and analyze endpoint
  app.post('/api/search', async (req, res) => {
    try {
      const { question } = searchRequestSchema.parse(req.body);

      // Perform Google search
      const searchResults = await performGoogleSearch(question);
      
      if (searchResults.length === 0) {
        return res.status(404).json({ 
          error: "No search results found for the given question" 
        });
      }

      // Analyze results with OpenAI
      const analysisRequest: MCPAnalysisRequest = {
        question,
        searchResults,
      };

      const aiResponse = await analyzeMCPResults(analysisRequest);
      
      // Detect language if not provided by AI
      let language = aiResponse.language;
      if (!language || language === "unknown") {
        language = await detectLanguage(question);
      }

      // Store the search query
      const savedQuery = await storage.createSearchQuery({
        question,
        language,
        searchResults,
        aiResponse: aiResponse.bestAnswer,
        sourceReasoning: aiResponse.sourceReasoning,
        confidenceLevel: aiResponse.confidenceLevel,
        processingTime: aiResponse.processingTime,
      });

      res.json({
        id: savedQuery.id,
        question,
        language,
        searchResults,
        aiResponse: {
          bestAnswer: aiResponse.bestAnswer,
          sourceReasoning: aiResponse.sourceReasoning,
          confidenceLevel: aiResponse.confidenceLevel,
          processingTime: aiResponse.processingTime,
        },
        createdAt: savedQuery.createdAt,
      });

    } catch (error) {
      console.error("Search error:", error);
      
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          error: "Invalid request", 
          details: error.errors 
        });
      }

      const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
      res.status(500).json({ 
        error: "Failed to process search request",
        details: errorMessage
      });
    }
  });

  // Get recent searches
  app.get('/api/recent-searches', async (req, res) => {
    try {
      const limit = parseInt(req.query.limit as string) || 10;
      const recentSearches = await storage.getRecentSearches(limit);
      
      res.json(recentSearches);
    } catch (error) {
      console.error("Failed to get recent searches:", error);
      res.status(500).json({ 
        error: "Failed to retrieve recent searches" 
      });
    }
  });

  // Get specific search query
  app.get('/api/search/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const searchQuery = await storage.getSearchQuery(id);
      
      if (!searchQuery) {
        return res.status(404).json({ 
          error: "Search query not found" 
        });
      }

      res.json(searchQuery);
    } catch (error) {
      console.error("Failed to get search query:", error);
      res.status(500).json({ 
        error: "Failed to retrieve search query" 
      });
    }
  });

  // Language detection endpoint
  app.post('/api/detect-language', async (req, res) => {
    try {
      const { text } = z.object({
        text: z.string().min(1, "Text is required"),
      }).parse(req.body);

      const language = await detectLanguage(text);
      res.json({ language });
    } catch (error) {
      console.error("Language detection error:", error);
      
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          error: "Invalid request", 
          details: error.errors 
        });
      }

      res.status(500).json({ 
        error: "Failed to detect language" 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
