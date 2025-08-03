import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Globe, Shield } from "lucide-react";

interface SearchInterfaceProps {
  onSearch: (question: string) => void;
  isLoading: boolean;
  detectedLanguage?: string;
}

export function SearchInterface({ onSearch, isLoading, detectedLanguage }: SearchInterfaceProps) {
  const [question, setQuestion] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (question.trim() && !isLoading) {
      onSearch(question.trim());
    }
  };

  return (
    <div className="mb-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ask any question in any language</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Get the most reliable and coherent answer based on credible sources from across the web. 
            Our AI analyzes search results and provides you with the single best answer.
          </p>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input 
                type="text" 
                placeholder="Ask your question in any language... (e.g., هل القهوة ترفع ضغط الدم؟)"
                className="w-full pl-12 pr-4 py-4 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                disabled={isLoading}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <Globe className="h-4 w-4 text-primary" />
                  <span>Language: {detectedLanguage || "Auto-detected"}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield className="h-4 w-4 text-green-600" />
                  <span>Credibility Analysis</span>
                </div>
              </div>
              
              <Button 
                type="submit" 
                disabled={!question.trim() || isLoading}
                className="bg-primary text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                <span>{isLoading ? "Searching..." : "Search & Analyze"}</span>
                {!isLoading && <Search className="h-4 w-4" />}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
