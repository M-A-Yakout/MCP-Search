import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { History, Globe, CheckCircle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import type { RecentSearch } from "@/lib/types";

interface RecentSearchesProps {
  onSearchSelect?: (search: RecentSearch) => void;
}

export function RecentSearches({ onSearchSelect }: RecentSearchesProps) {
  const { data: recentSearches = [], isLoading } = useQuery<RecentSearch[]>({
    queryKey: ["/api/recent-searches"],
  });

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffHours < 1) return "Just now";
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  const getLanguageDisplayName = (code: string) => {
    const languageNames: Record<string, string> = {
      'en': 'English',
      'ar': 'Arabic',
      'es': 'Spanish',
      'fr': 'French',
      'de': 'German',
      'zh': 'Chinese',
      'ja': 'Japanese',
      'ko': 'Korean',
      'pt': 'Portuguese',
      'ru': 'Russian',
      'hi': 'Hindi',
      'it': 'Italian',
    };
    return languageNames[code] || code;
  };

  if (isLoading) {
    return (
      <div className="mt-12">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse space-y-4">
            <div className="h-6 bg-gray-200 rounded w-48"></div>
            <div className="grid md:grid-cols-2 gap-4">
              {[1, 2].map((i) => (
                <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (recentSearches.length === 0) {
    return (
      <div className="mt-12">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center space-x-2">
            <History className="h-5 w-5 text-primary" />
            <span>Recent Searches</span>
          </h3>
          <Card>
            <CardContent className="p-8 text-center">
              <History className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No search history yet. Try asking a question!</p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-12">
      <div className="max-w-4xl mx-auto">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center space-x-2">
          <History className="h-5 w-5 text-primary" />
          <span>Recent Searches</span>
        </h3>
        
        <div className="grid md:grid-cols-2 gap-4">
          {recentSearches.slice(0, 4).map((search) => (
            <Card 
              key={search.id} 
              className="hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => onSearchSelect?.(search)}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium text-gray-900 line-clamp-2 flex-1">
                    {search.question}
                  </h4>
                  <div className="text-xs text-gray-500 ml-2 flex-shrink-0">
                    {formatTimeAgo(search.createdAt)}
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {search.aiResponse.startsWith("✅") ? search.aiResponse : `✅ ${search.aiResponse}`}
                </p>
                
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Globe className="h-3 w-3" />
                    <span>{getLanguageDisplayName(search.language)}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <CheckCircle className="h-3 w-3 text-green-600" />
                    <span>{search.confidenceLevel}% confidence</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {recentSearches.length > 4 && (
          <div className="text-center mt-6">
            <Button variant="ghost" className="text-primary hover:text-blue-700">
              View all search history →
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
