
import React from 'react';

const NovelSkeleton = () => {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-muted/50">
      <div className="aspect-[2/3] w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-muted to-muted-foreground/10 animate-shimmer" />
      </div>
      
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-4">
        <div className="h-4 w-2/3 bg-white/20 rounded mb-2" />
        <div className="h-3 w-1/3 bg-white/10 rounded" />
      </div>
    </div>
  );
};

export default NovelSkeleton;
