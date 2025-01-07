import React from 'react';
import { BookOpen, Video, Music, Image, File } from 'lucide-react';
import { Button } from './ui/Button';

const iconMap = {
  book: BookOpen,
  video: Video,
  music: Music,
  image: Image,
  file: File,
};

interface Suggestion {
  type: keyof typeof iconMap;
  title: string;
  category: string;
  explanation: string;
}

interface MediaSuggestionsProps {
  suggestions: Suggestion[];
  onAddSuggestion: (suggestion: Omit<Suggestion, 'explanation'>) => void;
  isLoading: boolean;
}

export const MediaSuggestions: React.FC<MediaSuggestionsProps> = ({
  suggestions,
  onAddSuggestion,
  isLoading,
}) => {
  if (isLoading) {
    return (
      <div className="animate-pulse space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-gray-100 h-32 rounded-lg"></div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {suggestions.map((suggestion, index) => {
        const Icon = iconMap[suggestion.type];
        return (
          <div
            key={index}
            className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3">
                  <Icon className="w-6 h-6 text-blue-600" />
                  <div>
                    <h3 className="font-medium text-gray-900">{suggestion.title}</h3>
                    <p className="text-sm text-gray-500">{suggestion.category}</p>
                  </div>
                </div>
                <p className="mt-2 text-sm text-gray-600">{suggestion.explanation}</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onAddSuggestion({
                  type: suggestion.type,
                  title: suggestion.title,
                  category: suggestion.category,
                })}
                className="ml-4"
              >
                Ajouter
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
