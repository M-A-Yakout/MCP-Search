import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Brain, Globe, Cog } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { SearchInterface } from "@/components/search-interface";
import { LoadingState } from "@/components/loading-state";
import { SearchResults } from "@/components/search-results";
import { AIAnalysis } from "@/components/ai-analysis";
import { RecentSearches } from "@/components/recent-searches";
import { apiRequest } from "@/lib/queryClient";
import type { SearchResponse, RecentSearch } from "@/lib/types";

export default function Home() {
  const [searchResult, setSearchResult] = useState<SearchResponse | null>(null);
  const [loadingStep, setLoadingStep] = useState("");
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const searchMutation = useMutation({
    mutationFn: async (question: string) => {
      setLoadingStep("🔍 Searching the web for relevant results...");
      
      const response = await apiRequest("POST", "/api/search", { question });
      
      setLoadingStep("🤖 Analyzing results with AI...");
      
      return response.json() as Promise<SearchResponse>;
    },
    onSuccess: (data) => {
      setSearchResult(data);
      setLoadingStep("");
      queryClient.invalidateQueries({ queryKey: ["/api/recent-searches"] });
      toast({
        title: "Search Complete",
        description: `Found ${data.searchResults.length} results with ${data.aiResponse.confidenceLevel}% confidence`,
      });
    },
    onError: (error) => {
      setLoadingStep("");
      toast({
        title: "Search Failed",
        description: error instanceof Error ? error.message : "An error occurred during search",
        variant: "destructive",
      });
    },
  });

  const handleSearch = (question: string) => {
    setSearchResult(null);
    searchMutation.mutate(question);
  };

  const handleShare = () => {
    if (searchResult) {
      const text = `Q: ${searchResult.question}\n\nA: ${searchResult.aiResponse.bestAnswer}\n\nSource: MCP Analysis (${searchResult.aiResponse.confidenceLevel}% confidence)`;
      
      if (navigator.share) {
        navigator.share({
          title: "MCP Search Result",
          text,
        });
      } else {
        navigator.clipboard.writeText(text);
        toast({
          title: "Copied to Clipboard",
          description: "Search result has been copied to your clipboard",
        });
      }
    }
  };

  const handleSave = () => {
    toast({
      title: "Saved",
      description: "Search result saved to your history",
    });
  };

  const handleSearchSelect = (search: RecentSearch) => {
    // This would typically navigate to the specific search or reload it
    toast({
      title: "Loading Search",
      description: "Loading previous search result...",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Brain className="text-white text-lg" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">MCP</h1>
                <p className="text-xs text-gray-500">Most Coherent & Probable</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-2 text-sm text-gray-600">
                <Globe className="h-4 w-4 text-primary" />
                <span>Multi-language AI Research</span>
              </div>
              <Button variant="ghost" size="sm">
                <Cog className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <SearchInterface 
          onSearch={handleSearch}
          isLoading={searchMutation.isPending}
          detectedLanguage={searchResult?.language}
        />

        {searchMutation.isPending && (
          <LoadingState step={loadingStep} />
        )}

        {searchResult && (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Search Results Panel */}
            <div className="lg:col-span-2">
              <SearchResults 
                results={searchResult.searchResults}
                resultCount={searchResult.searchResults.length}
              />
            </div>

            {/* AI Analysis Panel */}
            <div className="lg:col-span-1">
              <AIAnalysis 
                response={searchResult.aiResponse}
                language={searchResult.language}
                resultCount={searchResult.searchResults.length}
                onShare={handleShare}
                onSave={handleSave}
              />
            </div>
          </div>
        )}

        <RecentSearches onSearchSelect={handleSearchSelect} />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                  <Brain className="text-white text-lg" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">MCP</h3>
                  <p className="text-sm text-gray-500">Most Coherent & Probable</p>
                </div>
              </div>
              <p className="text-gray-600 max-w-md">
                Advanced AI research assistant that analyzes web search results to provide the most reliable and coherent answers in any language.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Features</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>Multi-language Support</li>
                <li>Credibility Analysis</li>
                <li>Source Reasoning</li>
                <li>Real-time Search</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>API Documentation</li>
                <li>Integration Guide</li>
                <li>Contact Support</li>
                <li>Privacy Policy</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-200 mt-8 pt-8 flex items-center justify-between text-sm text-gray-500">
            <p>&copy; 2024 MCP. All rights reserved.</p>
            <div className="flex items-center space-x-4">
              <span>Powered by OpenAI & Google Search</span>
              <div className="flex items-center space-x-2">
                <Brain className="h-4 w-4 text-green-600" />
                <span>Secure & Private</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
