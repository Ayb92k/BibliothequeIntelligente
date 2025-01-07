import React, { useState } from 'react';
import { Button } from './ui/Button';
import { BookOpen, Video, Music, Image, File } from 'lucide-react';

interface AddMediaFormProps {
  onSubmit: (data: {
    type: string;
    title: string;
    category: string;
    url?: string;
  }) => void;
}

export const AddMediaForm: React.FC<AddMediaFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    type: 'book',
    title: '',
    category: '',
    url: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ type: 'book', title: '', category: '', url: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Type</label>
        <div className="mt-1 flex flex-wrap gap-4">
          {[
            { value: 'book', icon: BookOpen },
            { value: 'video', icon: Video },
            { value: 'music', icon: Music },
            { value: 'image', icon: Image },
            { value: 'file', icon: File },
          ].map(({ value, icon: Icon }) => (
            <button
              key={value}
              type="button"
              onClick={() => setFormData({ ...formData, type: value })}
              className={`p-3 rounded-lg flex flex-col items-center min-w-[80px] ${
                formData.type === value
                  ? 'bg-blue-100 text-blue-600 ring-2 ring-blue-500'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Icon className="w-6 h-6" />
              <span className="text-sm mt-1 capitalize">{value}</span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Titre
        </label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Catégorie
        </label>
        <input
          type="text"
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          URL (optionnel)
        </label>
        <input
          type="url"
          value={formData.url}
          onChange={(e) => setFormData({ ...formData, url: e.target.value })}
          className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <Button type="submit" className="w-full">
        Ajouter
      </Button>
    </form>
  );
};
