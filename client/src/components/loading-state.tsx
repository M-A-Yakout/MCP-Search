import { Loader2 } from "lucide-react";

interface LoadingStateProps {
  step?: string;
}

export function LoadingState({ step = "Searching & Analyzing..." }: LoadingStateProps) {
  return (
    <div className="max-w-4xl mx-auto mb-8">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <div className="flex items-center justify-center space-x-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <div className="text-center">
            <p className="text-lg font-medium text-gray-900 mb-2">Searching & Analyzing...</p>
            <div className="space-y-1 text-sm text-gray-600">
              <p>{step}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
