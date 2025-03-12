
import { useState } from 'react';
import { BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NovelCardProps {
  title: string;
  coverUrl: string;
  chaptersCount: number;
  onClick: () => void;
}

const NovelCard = ({ title, coverUrl, chaptersCount, onClick }: NovelCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <div 
      className="group relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
      onClick={onClick}
    >
      <div className="aspect-[2/3] w-full overflow-hidden bg-muted">
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 bg-gradient-to-r from-muted to-muted-foreground/10 animate-shimmer" />
        )}
        
        {imageError ? (
          <div className="absolute inset-0 flex items-center justify-center bg-muted">
            <BookOpen className="w-12 h-12 text-muted-foreground/50" />
          </div>
        ) : (
          <img
            src={coverUrl}
            alt={title}
            className={cn(
              "w-full h-full object-cover transition-all duration-700",
              !imageLoaded && "opacity-0 scale-105",
              imageLoaded && "opacity-100 scale-100"
            )}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
          />
        )}
      </div>
      
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-4 transition-all duration-300">
        <h3 className="text-white font-medium text-sm line-clamp-2 mb-1">{title}</h3>
        <div className="flex items-center text-xs text-white/70">
          <BookOpen className="w-3 h-3 mr-1" />
          <span>{chaptersCount} capítulos</span>
        </div>
      </div>
    </div>
  );
};

export default NovelCard;
