
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { Search, Download, Settings } from 'lucide-react';

interface AppBarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  className?: string;
}

const AppBar = ({ activeTab, onTabChange, className }: AppBarProps) => {
  return (
    <div className={cn("w-full sticky bottom-0 z-50 bg-background/80 backdrop-blur border-t py-2 px-4", className)}>
      <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
        <TabsList className="w-full bg-transparent">
          <TabsTrigger 
            value="search" 
            className="flex-1 data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
          >
            <div className="flex flex-col items-center py-1">
              <Search className="h-5 w-5" />
              <span className="text-xs mt-1">Buscar</span>
            </div>
          </TabsTrigger>
          
          <TabsTrigger 
            value="downloads" 
            className="flex-1 data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
          >
            <div className="flex flex-col items-center py-1">
              <Download className="h-5 w-5" />
              <span className="text-xs mt-1">Downloads</span>
            </div>
          </TabsTrigger>
          
          <TabsTrigger 
            value="settings" 
            className="flex-1 data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
          >
            <div className="flex flex-col items-center py-1">
              <Settings className="h-5 w-5" />
              <span className="text-xs mt-1">Configurações</span>
            </div>
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};

export default AppBar;
