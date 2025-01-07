export interface Media {
  id?: string;
  type: 'book' | 'video' | 'music' | 'image' | 'file';
  title: string;
  category: string;
  url?: string;
}
