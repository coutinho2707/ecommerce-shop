import { Button } from '@/components/ui/button';
import { useCategories, useCategory } from '../hooks/use-category';
import type { CategoryDTO } from '../dtos/category.dto';
import { useEffect, useState } from 'react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown, Grid3x3, Home } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { cn } from '@/lib/utils';

export function CategoryMenu() {
  const { data: categories } = useCategories();

  const [visibleItems, setVisibleItems] = useState<CategoryDTO[]>([]);
  const [hiddenItems, setHiddenItems] = useState<CategoryDTO[]>([]);

  const [searchParams, setSearchParams] = useSearchParams();
  const categoryId = searchParams.get('categoryId') ?? undefined;

  const { data: activeCategory } = useCategory(categoryId!);

  useEffect(() => {
    if (categories) {
      setVisibleItems(categories.slice(0, 5));
      setHiddenItems(categories.slice(5));
    }
  }, [categories]);

  function handleSelect(categoryId?: string) {
    const newParams = new URLSearchParams(searchParams);

    if (categoryId) {
      newParams.set('categoryId', categoryId);
    } else {
      newParams.delete('categoryId');
    }
    setSearchParams(newParams);
  }

  return (
    <nav className="sticky top-0 z-50 w-full bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo / Título */}
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <Grid3x3 className="w-8 h-8 text-blue-600" />
              <h1 className="font-bold text-2xl text-gray-900">ShopHub</h1>
            </div>
            <p className="text-xs text-gray-500 ml-10">Novos produtos todos os dias</p>
          </div>

          {/* Categorias */}
          <div className="flex items-center gap-2">
            <Button
              variant={!categoryId ? 'default' : 'ghost'}
              onClick={() => handleSelect()}
              className={cn('gap-2', !categoryId && 'bg-blue-600 hover:bg-blue-700')}
            >
              <Home className="w-4 h-4" />
              <span className="hidden sm:inline">Todos</span>
            </Button>

            {visibleItems.map((category) => (
              <Button
                key={category.id}
                variant={category.id === activeCategory?.id ? 'default' : 'ghost'}
                onClick={() => handleSelect(category.id)}
                className={cn(
                  'hidden md:inline-flex transition-all',
                  category.id === activeCategory?.id &&
                    'bg-blue-600 hover:bg-blue-700 text-white',
                )}
              >
                {category.name}
              </Button>
            ))}

            {hiddenItems.length > 0 && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="gap-2">
                    <span className="hidden sm:inline">Mais</span>
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {hiddenItems.map((category: CategoryDTO) => (
                    <DropdownMenuItem
                      key={category.id}
                      onClick={() => handleSelect(category.id)}
                      className="cursor-pointer"
                    >
                      {category.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
