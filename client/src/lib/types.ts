export interface SearchResult {
  title: string;
  snippet: string;
  link: string;
  source: string;
  credibilityScore: "high" | "medium" | "low";
  publishedDate?: string;
}

export interface AIResponse {
  bestAnswer: string;
  sourceReasoning: string;
  confidenceLevel: number;
  processingTime: number;
}

export interface SearchResponse {
  id: string;
  question: string;
  language: string;
  searchResults: SearchResult[];
  aiResponse: AIResponse;
  createdAt: string;
}

export interface RecentSearch {
  id: string;
  question: string;
  language: string;
  aiResponse: string;
  confidenceLevel: number;
  createdAt: string;
}
