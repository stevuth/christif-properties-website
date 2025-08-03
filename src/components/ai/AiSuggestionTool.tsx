"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import { Sparkles, Loader2 } from 'lucide-react';
import { suggestSearchParameters } from '@/ai/flows/suggest-search-parameters';

type AiSuggestionToolProps = {
  currentSearchCriteria: string;
  browsingHistory: string;
};

export default function AiSuggestionTool({ currentSearchCriteria, browsingHistory }: AiSuggestionToolProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [suggestion, setSuggestion] = useState<{ suggestions: string; reasoning: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGetSuggestion = async () => {
    setIsLoading(true);
    setError(null);
    setSuggestion(null);
    try {
      const result = await suggestSearchParameters({
        currentSearchCriteria,
        browsingHistory,
      });
      setSuggestion(result);
    } catch (e) {
      setError('Sorry, we couldn\'t generate suggestions at this time.');
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full h-12">
          <Sparkles className="mr-2 h-4 w-4" />
          AI Suggestions
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>AI-Powered Suggestions</DialogTitle>
          <DialogDescription>
            Let our AI help you discover new possibilities based on your activity.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          {isLoading && (
            <div className="flex flex-col items-center justify-center gap-4">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="text-muted-foreground">Generating ideas...</p>
            </div>
          )}
          {error && <p className="text-destructive">{error}</p>}
          {suggestion && (
            <div className="space-y-4 text-sm">
                <div>
                    <h4 className="font-semibold">Suggested Searches:</h4>
                    <p className="text-muted-foreground whitespace-pre-wrap">{suggestion.suggestions}</p>
                </div>
                 <div>
                    <h4 className="font-semibold">Reasoning:</h4>
                    <p className="text-muted-foreground whitespace-pre-wrap">{suggestion.reasoning}</p>
                </div>
            </div>
          )}
        </div>
        <DialogFooter>
          <Button onClick={handleGetSuggestion} disabled={isLoading}>
            {isLoading ? "Generating..." : "Generate New Suggestions"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
