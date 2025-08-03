import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, CheckCircle, AlertTriangle, XCircle, ExternalLink } from "lucide-react";
import type { SearchResult } from "@/lib/types";

interface SearchResultsProps {
  results: SearchResult[];
  resultCount: number;
}

export function SearchResults({ results, resultCount }: SearchResultsProps) {
  const getCredibilityIcon = (score: "high" | "medium" | "low") => {
    switch (score) {
      case "high":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "medium":
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      case "low":
        return <XCircle className="h-4 w-4 text-red-600" />;
    }
  };

  const getCredibilityColor = (score: "high" | "medium" | "low") => {
    switch (score) {
      case "high":
        return "bg-green-100 text-green-800 border-green-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "low":
        return "bg-red-100 text-red-800 border-red-200";
    }
  };

  const getCredibilityText = (score: "high" | "medium" | "low") => {
    switch (score) {
      case "high":
        return "High Credibility";
      case "medium":
        return "Medium Credibility";
      case "low":
        return "Low Credibility";
    }
  };

  return (
    <Card>
      <CardHeader className="border-b border-gray-200">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
            <Search className="h-5 w-5 text-primary" />
            <span>Search Results</span>
          </CardTitle>
          <div className="text-sm text-gray-500">
            Found {resultCount} results
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-6 space-y-4">
        {results.map((result, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-2">
                {getCredibilityIcon(result.credibilityScore)}
                <Badge className={`${getCredibilityColor(result.credibilityScore)} border`}>
                  {getCredibilityText(result.credibilityScore)}
                </Badge>
              </div>
              <div className="text-sm text-gray-500">{result.source}</div>
            </div>
            
            <h4 className="font-semibold text-gray-900 mb-2 hover:text-primary cursor-pointer">
              <a 
                href={result.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-1 hover:underline"
              >
                <span>{result.title}</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </h4>
            
            <p className="text-gray-600 text-sm mb-3">
              {result.snippet}
            </p>
            
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span className="truncate max-w-md">{result.link}</span>
              {result.publishedDate && <span>{result.publishedDate}</span>}
            </div>
          </div>
        ))}
        
        {results.length > 3 && (
          <div className="text-center py-4">
            <Button variant="ghost" className="text-primary hover:text-blue-700">
              View all results →
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
