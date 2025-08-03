import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Brain, CheckCircle, Lightbulb, Share, Bookmark } from "lucide-react";
import type { AIResponse } from "@/lib/types";

interface AIAnalysisProps {
  response: AIResponse;
  language: string;
  resultCount: number;
  onShare?: () => void;
  onSave?: () => void;
}

export function AIAnalysis({ 
  response, 
  language, 
  resultCount, 
  onShare, 
  onSave 
}: AIAnalysisProps) {
  const formatProcessingTime = (ms: number) => {
    return (ms / 1000).toFixed(1) + "s";
  };

  return (
    <Card className="sticky top-24">
      <CardHeader className="border-b border-gray-200">
        <CardTitle className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
          <Brain className="h-5 w-5 text-primary" />
          <span>AI Analysis</span>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-6">
        {/* Best Answer */}
        <div className="mb-6">
          <div className="flex items-center space-x-2 mb-3">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <span className="font-semibold text-green-600">Best Answer</span>
          </div>
          
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
            <p className="text-gray-900 leading-relaxed">
              {response.bestAnswer}
            </p>
          </div>
          
          {/* Source Reasoning */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start space-x-2 mb-2">
              <Lightbulb className="h-4 w-4 text-primary mt-1" />
              <span className="font-semibold text-primary">Source Reasoning</span>
            </div>
            <p className="text-sm text-gray-700">
              {response.sourceReasoning}
            </p>
          </div>
        </div>
        
        {/* Analysis Metrics */}
        <div className="space-y-4 mb-6">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Confidence Level</span>
            <div className="flex items-center space-x-2">
              <Progress value={response.confidenceLevel} className="w-16 h-2" />
              <Badge 
                variant="secondary" 
                className={`${
                  response.confidenceLevel >= 80 
                    ? 'bg-green-100 text-green-800' 
                    : response.confidenceLevel >= 60 
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                }`}
              >
                {response.confidenceLevel}%
              </Badge>
            </div>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Sources Analyzed</span>
            <span className="font-medium">{resultCount} results</span>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Language Detected</span>
            <span className="font-medium">{language}</span>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Processing Time</span>
            <span className="font-medium">{formatProcessingTime(response.processingTime)}</span>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="space-y-2">
          <Button 
            onClick={onShare}
            className="w-full bg-primary text-white hover:bg-blue-700 transition-colors"
          >
            <Share className="h-4 w-4 mr-2" />
            Share Result
          </Button>
          <Button 
            onClick={onSave}
            variant="outline" 
            className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <Bookmark className="h-4 w-4 mr-2" />
            Save to History
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
