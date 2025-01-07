import React, { useState } from 'react';
import { Library, Search, Plus, Sparkles } from 'lucide-react';
import { MediaCard } from './components/MediaCard';
import { AddMediaForm } from './components/AddMediaForm';
import { MediaSuggestions } from './components/MediaSuggestions';
import { Button } from './components/ui/Button';
import { getSuggestions } from './services/openai';

interface Media {
  id: string;
  type: 'book' | 'video' | 'music' | 'image' | 'file';
  title: string;
  category: string;
  url?: string;
}

export default function App() {
  const [mediaItems, setMediaItems] = useState<Media[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);

  const handleAddMedia = (data: Omit<Media, 'id'>) => {
    const newMedia = {
      ...data,
      id: Date.now().toString(),
    } as Media;
    setMediaItems([...mediaItems, newMedia]);
    setShowAddForm(false);
  };

  const handleDeleteMedia = (id: string) => {
    setMediaItems(mediaItems.filter(item => item.id !== id));
  };

  const loadSuggestions = async () => {
    if (mediaItems.length === 0) return;
    
    setIsLoadingSuggestions(true);
    try {
      const newSuggestions = await getSuggestions(mediaItems);
      setSuggestions(newSuggestions);
    } catch (error) {
      console.error('Error loading suggestions:', error);
    } finally {
      setIsLoadingSuggestions(false);
    }
  };

  const filteredMedia = mediaItems.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
      <header className="bg-white/80 backdrop-blur-sm shadow-lg sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-br from-indigo-500 to-purple-500 p-3 rounded-lg">
                <Library className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Bibliothèque Intelligente
              </h1>
            </div>
            <div className="flex space-x-4">
              <Button
                onClick={loadSuggestions}
                className="flex items-center space-x-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 text-white shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
                disabled={mediaItems.length === 0}
              >
                <Sparkles className="w-5 h-5" />
                <span>Suggestions IA</span>
              </Button>
              <Button
                onClick={() => setShowAddForm(!showAddForm)}
                className="flex items-center space-x-2 bg-white border-2 border-indigo-500 text-indigo-500 hover:bg-indigo-50 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
              >
                <Plus className="w-5 h-5" />
                <span>Ajouter un média</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Rechercher par titre ou catégorie..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 shadow-sm transition-all duration-200"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {showAddForm && (
              <div className="mb-8 bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-lg border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Ajouter un nouveau média</h2>
                <AddMediaForm onSubmit={handleAddMedia} />
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredMedia.map((item) => (
                <MediaCard
                  key={item.id}
                  type={item.type}
                  title={item.title}
                  category={item.category}
                  onEdit={() => {}}
                  onDelete={() => handleDeleteMedia(item.id)}
                />
              ))}
            </div>

            {filteredMedia.length === 0 && (
              <div className="text-center py-16 bg-white/80 backdrop-blur-sm rounded-xl shadow-md">
                <Library className="w-16 h-16 text-indigo-200 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">
                  {searchQuery
                    ? "Aucun média ne correspond à votre recherche"
                    : "Ajoutez votre premier média en cliquant sur le bouton 'Ajouter un média'"}
                </p>
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-indigo-500" />
                <span>Suggestions personnalisées</span>
              </h2>
              <MediaSuggestions
                suggestions={suggestions}
                onAddSuggestion={handleAddMedia}
                isLoading={isLoadingSuggestions}
              />
              {!isLoadingSuggestions && suggestions.length === 0 && (
                <div className="text-center py-8">
                  <Sparkles className="w-12 h-12 text-indigo-200 mx-auto mb-3" />
                  <p className="text-gray-500">
                    {mediaItems.length === 0
                      ? "Ajoutez des médias pour obtenir des suggestions personnalisées"
                      : "Cliquez sur 'Suggestions IA' pour obtenir des recommandations"}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
