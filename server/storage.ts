import { type SearchQuery, type InsertSearchQuery } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  createSearchQuery(query: InsertSearchQuery): Promise<SearchQuery>;
  getRecentSearches(limit?: number): Promise<SearchQuery[]>;
  getSearchQuery(id: string): Promise<SearchQuery | undefined>;
}

export class MemStorage implements IStorage {
  private searchQueries: Map<string, SearchQuery>;

  constructor() {
    this.searchQueries = new Map();
  }

  async createSearchQuery(insertQuery: InsertSearchQuery): Promise<SearchQuery> {
    const id = randomUUID();
    const query: SearchQuery = { 
      id,
      question: insertQuery.question,
      language: insertQuery.language,
      searchResults: insertQuery.searchResults,
      aiResponse: insertQuery.aiResponse,
      sourceReasoning: insertQuery.sourceReasoning,
      confidenceLevel: insertQuery.confidenceLevel,
      processingTime: insertQuery.processingTime,
      createdAt: new Date()
    };
    this.searchQueries.set(id, query);
    return query;
  }

  async getRecentSearches(limit: number = 10): Promise<SearchQuery[]> {
    const queries = Array.from(this.searchQueries.values())
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, limit);
    return queries;
  }

  async getSearchQuery(id: string): Promise<SearchQuery | undefined> {
    return this.searchQueries.get(id);
  }
}

export const storage = new MemStorage();
