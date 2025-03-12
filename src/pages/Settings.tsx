
import React from 'react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { BookText, HardDrive, Wifi, FolderOpen, Info, ExternalLink, Github } from 'lucide-react';
import { toast } from 'sonner';

const Settings = () => {
  const handleClearCache = () => {
    toast.success("Cache limpo com sucesso");
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-shrink-0 px-4 py-6">
        <h1 className="text-2xl font-bold mb-2">Configurações</h1>
        <p className="text-sm text-muted-foreground">Personalize sua experiência</p>
      </div>
      
      <div className="flex-1 px-4 pb-4 overflow-y-auto">
        <div className="space-y-6">
          <div>
            <h2 className="text-sm font-medium text-muted-foreground mb-3 flex items-center">
              <BookText className="w-4 h-4 mr-2" />
              DOWNLOAD
            </h2>
            <div className="space-y-4 bg-card rounded-xl p-4 border shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Download automático</p>
                  <p className="text-xs text-muted-foreground">Baixa novos capítulos quando disponíveis</p>
                </div>
                <Switch id="auto-download" />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Apenas no Wi-Fi</p>
                  <p className="text-xs text-muted-foreground">Baixa novos capítulos apenas no Wi-Fi</p>
                </div>
                <Switch id="wifi-only" />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Qualidade das imagens</p>
                  <p className="text-xs text-muted-foreground">Baixa imagens em alta qualidade</p>
                </div>
                <Switch id="high-quality" />
              </div>
            </div>
          </div>
          
          <div>
            <h2 className="text-sm font-medium text-muted-foreground mb-3 flex items-center">
              <HardDrive className="w-4 h-4 mr-2" />
              ARMAZENAMENTO
            </h2>
            <div className="space-y-4 bg-card rounded-xl p-4 border shadow-sm">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium">Espaço utilizado</p>
                  <Badge variant="outline" className="font-normal">128 MB</Badge>
                </div>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <div className="bg-primary h-full" style={{ width: '28%' }} />
                </div>
              </div>
              
              <div className="pt-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full rounded-lg h-9"
                  onClick={handleClearCache}
                >
                  Limpar cache
                </Button>
              </div>
            </div>
          </div>
          
          <div>
            <h2 className="text-sm font-medium text-muted-foreground mb-3 flex items-center">
              <FolderOpen className="w-4 h-4 mr-2" />
              DIRETÓRIO
            </h2>
            <div className="space-y-4 bg-card rounded-xl p-4 border shadow-sm">
              <div>
                <p className="text-sm font-medium mb-1">Local de download</p>
                <div className="flex items-center text-xs text-muted-foreground bg-muted/50 p-2 rounded">
                  <code className="flex-1 overflow-x-auto whitespace-nowrap">/storage/emulated/0/Novels</code>
                </div>
              </div>
              
              <div className="pt-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full rounded-lg h-9"
                >
                  Alterar diretório
                </Button>
              </div>
            </div>
          </div>
          
          <div>
            <h2 className="text-sm font-medium text-muted-foreground mb-3 flex items-center">
              <Info className="w-4 h-4 mr-2" />
              SOBRE
            </h2>
            <div className="space-y-4 bg-card rounded-xl p-4 border shadow-sm">
              <div className="mb-2">
                <h3 className="text-base font-medium">Novel Fetcher</h3>
                <p className="text-xs text-muted-foreground">Versão 1.0.0</p>
              </div>
              
              <Separator />
              
              <div className="space-y-3 pt-1">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="w-full justify-start h-9 px-2"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  <span>Visitar site</span>
                </Button>
                
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="w-full justify-start h-9 px-2"
                >
                  <Github className="w-4 h-4 mr-2" />
                  <span>Código fonte</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
