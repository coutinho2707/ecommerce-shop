import { useState, useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { useProductSearch } from '@/cases/products/hooks/use-product';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';

export function SearchBar() {
    const [query, setQuery] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const { data: results } = useProductSearch(query);
    const searchRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleClear = () => {
        setQuery('');
        setIsOpen(false);
    };

    return (
        <div ref={searchRef} className="relative w-full max-w-md">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
                <input
                    type="text"
                    placeholder="Buscar produtos..."
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value);
                        setIsOpen(true);
                    }}
                    onFocus={() => setIsOpen(true)}
                    className="w-full pl-10 pr-10 py-2 rounded-lg border border-input bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
                {query && (
                    <button
                        onClick={handleClear}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <X className="w-4 h-4" />
                    </button>
                )}
            </div>

            {isOpen && query.length >= 2 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-background border border-input rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto">
                    {results && results.length > 0 ? (
                        <div className="divide-y">
                            {results.slice(0, 8).map((product) => (
                                <Link
                                    key={product.id}
                                    to={`/products/${product.id}`}
                                    onClick={() => {
                                        setQuery('');
                                        setIsOpen(false);
                                    }}
                                    className="px-4 py-3 hover:bg-accent transition-colors flex items-start justify-between gap-3 group"
                                >
                                    <div className="flex-1">
                                        <p className="text-sm font-medium group-hover:text-primary transition-colors truncate">
                                            {product.name}
                                        </p>
                                        {product.description && (
                                            <p className="text-xs text-muted-foreground truncate mt-1">
                                                {product.description}
                                            </p>
                                        )}
                                    </div>
                                    <p className="text-sm font-semibold text-primary whitespace-nowrap">
                                        R$ {parseFloat(product.price.toString()).toFixed(2)}
                                    </p>
                                </Link>
                            ))}
                            {results.length > 8 && (
                                <div className="px-4 py-3 text-center text-xs text-muted-foreground">
                                    {results.length - 8} mais resultados
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="px-4 py-8 text-center text-sm text-muted-foreground">
                            Nenhum produto encontrado
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
