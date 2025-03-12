
import React, { useState, useEffect } from 'react';
import DownloadsList, { DownloadItem } from '@/components/DownloadsList';
import { toast } from 'sonner';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';

const Downloads = () => {
  const [downloads, setDownloads] = useState<DownloadItem[]>([]);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  
  // Simulate download progress updates
  useEffect(() => {
    const mockDownloads: DownloadItem[] = [
      {
        id: 'dl-1',
        title: 'O Caminho do Cultivador',
        coverUrl: 'https://picsum.photos/id/24/300/450',
        progress: 65,
        status: 'downloading',
        chaptersTotal: 120,
        chaptersDownloaded: 78,
      },
      {
        id: 'dl-2',
        title: 'Reencarnação do Espadachim Supremo',
        coverUrl: 'https://picsum.photos/id/26/300/450',
        progress: 100,
        status: 'completed',
        chaptersTotal: 45,
        chaptersDownloaded: 45,
      },
      {
        id: 'dl-3',
        title: 'A Torre de Babel',
        coverUrl: 'https://picsum.photos/id/29/300/450',
        progress: 32,
        status: 'error',
        chaptersTotal: 250,
        chaptersDownloaded: 80,
      }
    ];
    
    setDownloads(mockDownloads);
    
    // Simulate progress updates for downloading items
    const interval = setInterval(() => {
      setDownloads(prev => 
        prev.map(item => {
          if (item.status === 'downloading' && item.progress < 100) {
            const newProgress = Math.min(item.progress + 5, 100);
            const newChaptersDownloaded = Math.floor((newProgress / 100) * item.chaptersTotal);
            
            if (newProgress === 100) {
              toast.success(`Download completo: ${item.title}`);
              return { ...item, progress: newProgress, chaptersDownloaded: item.chaptersTotal, status: 'completed' };
            }
            
            return { ...item, progress: newProgress, chaptersDownloaded: newChaptersDownloaded };
          }
          return item;
        })
      );
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  const handleOpenFile = (id: string) => {
    const download = downloads.find(d => d.id === id);
    if (download) {
      toast.success(`Abrindo: ${download.title}`);
    }
  };

  const handleConfirmDelete = () => {
    if (deleteId) {
      setDownloads(prev => prev.filter(d => d.id !== deleteId));
      toast.info("Download removido");
      setDeleteId(null);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-shrink-0 px-4 py-6">
        <h1 className="text-2xl font-bold mb-2">Downloads</h1>
        <p className="text-sm text-muted-foreground">Gerencie seus downloads de novelas</p>
      </div>
      
      <div className="flex-1 px-4 pb-4 overflow-hidden">
        <DownloadsList 
          downloads={downloads} 
          onOpenFile={handleOpenFile}
          onDelete={setDeleteId}
        />
      </div>
      
      <AlertDialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent className="rounded-xl">
          <AlertDialogHeader>
            <AlertDialogTitle>Cancelar download?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação irá remover o download e não poderá ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-lg">Não, manter</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmDelete} className="rounded-lg bg-destructive">
              Sim, remover
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Downloads;
