
import React from 'react';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Download, X, BookOpen, Info } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface NovelDetailsSheetProps {
  novel: {
    id: string;
    title: string;
    description: string;
    coverUrl: string;
    chaptersCount: number;
  } | null;
  isOpen: boolean;
  onClose: () => void;
  onDownload: (novelId: string) => void;
}

const NovelDetailsSheet = ({ novel, isOpen, onClose, onDownload }: NovelDetailsSheetProps) => {
  const { toast } = useToast();
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = () => {
    if (!novel) return;
    
    setIsDownloading(true);
    
    // Simulate download process
    setTimeout(() => {
      onDownload(novel.id);
      toast({
        title: "Download iniciado",
        description: `${novel.title} será baixado em breve.`,
      });
      setIsDownloading(false);
    }, 1500);
  };

  if (!novel) return null;

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent side="bottom" className="h-[85vh] rounded-t-3xl p-0 overflow-hidden">
        <div className="relative h-full flex flex-col">
          <div className="absolute top-4 right-4 z-20">
            <Button variant="ghost" size="icon" onClick={onClose} className="bg-black/20 text-white hover:bg-black/40 h-9 w-9 rounded-full">
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          <div className="relative h-64 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/10 z-10" />
            <img 
              src={novel.coverUrl} 
              alt={novel.title} 
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = 'https://placehold.co/600x800/gray/white?text=No+Cover';
              }}
            />
          </div>
          
          <div className="relative -mt-20 z-10 px-6">
            <div className="animate-slide-up">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/90 text-white text-xs font-medium mb-2">
                <BookOpen className="h-3 w-3 mr-1" />
                <span>{novel.chaptersCount} capítulos</span>
              </div>
              <h2 className="text-2xl font-bold text-balance mb-2">{novel.title}</h2>
            </div>
          </div>
          
          <div className="flex-1 px-6 overflow-y-auto py-4 animate-slide-up delay-100">
            <div className="flex items-start gap-2 mb-4">
              <Info className="h-5 w-5 text-muted-foreground mt-1 flex-shrink-0" />
              <p className="text-sm text-muted-foreground leading-relaxed">
                {novel.description || "Nenhuma descrição disponível."}
              </p>
            </div>
            
            <Separator className="my-6" />
            
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-muted-foreground">Opções de Download</h3>
              
              <div className="space-y-2">
                <Button 
                  onClick={handleDownload} 
                  className="w-full h-12 rounded-xl gap-2 font-medium"
                  disabled={isDownloading}
                >
                  <Download className={cn("h-5 w-5", isDownloading && "animate-bounce")} />
                  {isDownloading ? "Baixando..." : "Baixar EPUB"}
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full h-12 rounded-xl border-dashed" 
                  disabled={true}
                >
                  <span className="text-muted-foreground">Mais opções em breve</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default NovelDetailsSheet;
