
import React from 'react';
import { Download, BookOpen, FileText, Trash } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Progress } from '@/components/ui/progress';

export interface DownloadItem {
  id: string;
  title: string;
  coverUrl: string;
  progress: number;
  status: 'downloading' | 'completed' | 'error';
  chaptersTotal: number;
  chaptersDownloaded: number;
}

interface DownloadsListProps {
  downloads: DownloadItem[];
  onOpenFile?: (id: string) => void;
  onDelete?: (id: string) => void;
}

const DownloadsList = ({ downloads, onOpenFile, onDelete }: DownloadsListProps) => {
  if (downloads.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="bg-muted/50 w-16 h-16 rounded-full flex items-center justify-center mb-4">
          <Download className="h-8 w-8 text-muted-foreground/70" />
        </div>
        <h3 className="text-lg font-medium mb-1">Nenhum download</h3>
        <p className="text-sm text-muted-foreground max-w-md">
          Seus downloads de novelas aparecerão aqui quando você iniciar um.
        </p>
      </div>
    );
  }

  return (
    <ScrollArea className="h-full pr-4">
      <div className="space-y-4">
        {downloads.map((item) => (
          <div 
            key={item.id} 
            className="bg-card rounded-xl overflow-hidden border shadow-sm"
          >
            <div className="flex items-center p-3">
              <div className="w-12 h-16 bg-muted rounded-md overflow-hidden flex-shrink-0">
                {item.coverUrl ? (
                  <img 
                    src={item.coverUrl} 
                    alt={item.title} 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = 'https://placehold.co/120x160/gray/white?text=Cover';
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <BookOpen className="h-6 w-6 text-muted-foreground/50" />
                  </div>
                )}
              </div>
              
              <div className="ml-3 flex-1 min-w-0">
                <h4 className="font-medium text-sm truncate">{item.title}</h4>
                
                <div className="flex items-center mt-1 text-xs text-muted-foreground space-x-1">
                  <span>
                    {item.status === 'downloading' 
                      ? `${item.chaptersDownloaded}/${item.chaptersTotal} capítulos` 
                      : item.status === 'completed'
                      ? 'Download completo'
                      : 'Erro no download'}
                  </span>
                </div>
                
                {item.status === 'downloading' && (
                  <div className="mt-2">
                    <Progress value={item.progress} className="h-1" />
                  </div>
                )}
              </div>
              
              <div className="ml-2 flex-shrink-0">
                {item.status === 'completed' ? (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-full"
                    onClick={() => onOpenFile?.(item.id)}
                  >
                    <FileText className="h-4 w-4" />
                  </Button>
                ) : (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-full text-destructive"
                    onClick={() => onDelete?.(item.id)}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};

export default DownloadsList;
