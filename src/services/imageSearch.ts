const keywordImages = {
    // Books
    'harry potter': 'https://images.unsplash.com/photo-1500697017927-f8a3d0b0a1f6?w=400',
    'seigneur des anneaux': 'https://images.unsplash.com/photo-1506466010722-395aa2bef877?w=400',
    'livre': 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=400',
    
    // Music
    'musique': 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400',
    'jazz': 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=400',
    'classique': 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=400',
    
    // Video
    'film': 'https://images.unsplash.com/photo-1578022761797-b8636ac1773c?w=400',
    'cinéma': 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400',
    'série': 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=400',
  };
  
  const defaultImages = {
    book: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=400',
    video: 'https://images.unsplash.com/photo-1578022761797-b8636ac1773c?w=400',
    music: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400',
    image: 'https://images.unsplash.com/photo-1500051638674-ff996a0ec29e?w=400',
    file: 'https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=400'
  };
  
  export function searchImage(title: string, type: string): string {
    const normalizedTitle = title.toLowerCase();
    
    // Recherche par mots-clés
    for (const [keyword, url] of Object.entries(keywordImages)) {
      if (normalizedTitle.includes(keyword)) {
        return url;
      }
    }
    
    // Fallback sur l'image par défaut du type
    return defaultImages[type] || defaultImages.file;
  }
