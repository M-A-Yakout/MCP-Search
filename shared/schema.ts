import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, jsonb, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const searchQueries = pgTable("search_queries", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  question: text("question").notNull(),
  language: varchar("language", { length: 10 }).notNull(),
  searchResults: jsonb("search_results").$type<SearchResult[]>().notNull(),
  aiResponse: text("ai_response").notNull(),
  sourceReasoning: text("source_reasoning").notNull(),
  confidenceLevel: integer("confidence_level").notNull(),
  processingTime: integer("processing_time").notNull(), // in milliseconds
  createdAt: timestamp("created_at").default(sql`now()`).notNull(),
});

export const insertSearchQuerySchema = createInsertSchema(searchQueries).omit({
  id: true,
  createdAt: true,
});

export type InsertSearchQuery = z.infer<typeof insertSearchQuerySchema>;
export type SearchQuery = typeof searchQueries.$inferSelect;

// Additional types for the application
export interface SearchResult {
  title: string;
  snippet: string;
  link: string;
  source: string;
  credibilityScore: "high" | "medium" | "low";
  publishedDate?: string;
}

export interface MCPAnalysisRequest {
  question: string;
  searchResults: SearchResult[];
}

export interface MCPAnalysisResponse {
  bestAnswer: string;
  sourceReasoning: string;
  confidenceLevel: number;
  language: string;
  processingTime: number;
}
