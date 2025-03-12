
import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface SearchBarProps {
  onSearch: (query: string) => void;
  className?: string;
}

const SearchBar = ({ onSearch, className }: SearchBarProps) => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  const clearSearch = () => {
    setQuery('');
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className={cn(
        'relative w-full transition-all duration-300 ease-in-out',
        isFocused ? 'scale-[1.02]' : 'scale-100',
        className
      )}
    >
      <div className="relative flex items-center">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className="w-5 h-5 text-muted-foreground" />
        </div>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={cn(
            "w-full py-3 pl-10 pr-12 text-sm bg-accent/50 border-none rounded-2xl shadow-sm",
            "focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-background transition-all",
            "placeholder:text-muted-foreground/70"
          )}
          placeholder="Buscar novelas..."
          required
        />
        {query && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute inset-y-0 right-0 flex items-center pr-3"
            onClick={clearSearch}
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </Button>
        )}
      </div>
    </form>
  );
};

export default SearchBar;
