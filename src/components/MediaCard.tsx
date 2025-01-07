import React from 'react';
import { Pencil, Trash2, BookOpen, Video, Music, Image, File } from 'lucide-react';
import { Button } from './ui/Button';
import { searchImage } from '../services/imageSearch';

interface MediaCardProps {
  type: 'book' | 'video' | 'music' | 'image' | 'file';
  title: string;
  category: string;
  onEdit: () => void;
  onDelete: () => void;
}

const iconMap = {
  book: BookOpen,
  video: Video,
  music: Music,
  image: Image,
  file: File,
};

const backgroundColors = {
  book: 'from-emerald-500 to-teal-600',
  video: 'from-rose-500 to-pink-600',
  music: 'from-violet-500 to-purple-600',
  image: 'from-amber-500 to-orange-600',
  file: 'from-blue-500 to-indigo-600',
};

export const MediaCard: React.FC<MediaCardProps> = ({
  type,
  title,
  category,
  onEdit,
  onDelete,
}) => {
  const Icon = iconMap[type];
  const bgGradient = backgroundColors[type];
  const imageUrl = searchImage(title, type);

  return (
    <div className="group bg-white rounded-xl shadow-lg overflow-hidden transform hover:-translate-y-1 transition-all duration-300">
      <div className={`h-48 relative bg-gradient-to-br ${bgGradient}`}>
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <Icon className="absolute top-4 left-4 w-8 h-8 text-white" />
      </div>
      
      <div className="p-5">
        <h3 className="font-bold text-xl text-gray-900 mb-2">{title}</h3>
        <p className="text-sm text-gray-600 mb-4">{category}</p>
        
        <div className="flex justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <Button
            variant="outline"
            size="sm"
            onClick={onEdit}
            className="p-2"
          >
            <Pencil className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onDelete}
            className="p-2 text-red-600 hover:bg-red-50"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
