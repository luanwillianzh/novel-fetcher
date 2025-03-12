
import React, { useState } from 'react';
import SearchBar from '@/components/SearchBar';
import NovelCard from '@/components/NovelCard';
import NovelSkeleton from '@/components/NovelSkeleton';
import NovelDetailsSheet from '@/components/NovelDetailsSheet';
import { toast } from 'sonner';

// Mock API for demonstration
const mockSearchAPI = async (query: string) => {
  console.log(`Searching for: ${query}`);
  
  // Simulate network request
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Mock results
  return Array(Math.floor(Math.random() * 5) + 3).fill(null).map((_, i) => ({
    id: `novel-${i}-${Date.now()}`,
    title: `${query} - Novel ${i + 1}`,
    description: "Uma história incrível que vai te prender do início ao fim. Com personagens cativantes e um enredo cheio de reviravoltas, esta novel oferece uma experiência de leitura inesquecível.",
    coverUrl: `https://picsum.photos/id/${Math.floor(Math.random() * 100)}/300/450`,
    chaptersCount: Math.floor(Math.random() * 100) + 10
  }));
};

const Search = () => {
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedNovel, setSelectedNovel] = useState<any>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [searchPerformed, setSearchPerformed] = useState(false);

  const handleSearch = async (query: string) => {
    setLoading(true);
    setSearchResults([]);
    setSearchPerformed(true);
    
    try {
      const results = await mockSearchAPI(query);
      setSearchResults(results);
    } catch (error) {
      console.error('Search error:', error);
      toast.error('Erro ao buscar. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleNovelClick = (novel: any) => {
    setSelectedNovel(novel);
    setShowDetails(true);
  };

  const handleCloseDetails = () => {
    setShowDetails(false);
  };

  const handleDownload = (novelId: string) => {
    console.log(`Starting download for novel: ${novelId}`);
    setShowDetails(false);
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="flex-shrink-0 px-4 py-6">
        <h1 className="text-2xl font-bold mb-6">Novel Fetcher</h1>
        <SearchBar onSearch={handleSearch} />
      </div>
      
      <div className="flex-1 px-4 pb-4 overflow-y-auto">
        {!searchPerformed ? (
          <div className="flex flex-col items-center justify-center h-full text-center py-8">
            <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="text-primary"
              >
                <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
              </svg>
            </div>
            <h3 className="text-lg font-medium mb-2">Busque por novelas</h3>
            <p className="text-sm text-muted-foreground max-w-xs">
              Digite um título ou autor na barra de pesquisa acima para encontrar novelas.
            </p>
          </div>
        ) : loading ? (
          <div className="grid grid-cols-2 gap-4 animate-fade-in">
            {Array(6).fill(null).map((_, i) => (
              <NovelSkeleton key={i} />
            ))}
          </div>
        ) : searchResults.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 animate-fade-in">
            {searchResults.map((novel) => (
              <NovelCard
                key={novel.id}
                title={novel.title}
                coverUrl={novel.coverUrl}
                chaptersCount={novel.chaptersCount}
                onClick={() => handleNovelClick(novel)}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center py-8 animate-fade-in">
            <div className="bg-muted/50 w-16 h-16 rounded-full flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-muted-foreground"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
                <path d="M8 11h6" />
              </svg>
            </div>
            <h3 className="text-lg font-medium mb-2">Nenhum resultado</h3>
            <p className="text-sm text-muted-foreground max-w-xs">
              Não encontramos novelas para esta busca. Tente termos diferentes.
            </p>
          </div>
        )}
      </div>
      
      <NovelDetailsSheet
        novel={selectedNovel}
        isOpen={showDetails}
        onClose={handleCloseDetails}
        onDownload={handleDownload}
      />
    </div>
  );
};

export default Search;
