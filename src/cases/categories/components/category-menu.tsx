import { Button } from "@/components/ui/button";
import { useCategories, useCategory } from "../hooks/use-category";
import type { CategoryDTO } from "../dtos/category.dto";
import { useEffect, useState } from "react";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { cn } from "@/lib/utils";

export function CategoryMenu() {

    const { data: categories } = useCategories();

    const [visibleItems, setVisibleItems] = useState<CategoryDTO[]>([]);
    const [hiddenItems, setHiddenItems] = useState<CategoryDTO[]>([]);

    const [searchParams, setSearchParams] = useSearchParams();
    const categoryId = searchParams.get('categoryId') ?? undefined;

    const {data: activeCategory} = useCategory (categoryId!);

    useEffect(() => {
        if (categories) {
            setVisibleItems(categories.slice(0, 5));
            setHiddenItems(categories.slice(5));
        }
    }, [categories]);

    function handleSelect(categoryId?: string) {
        const newParams = new URLSearchParams(searchParams)

        if (categoryId) {
            newParams.set('categoryId', categoryId)
        } else {
            newParams.delete('categoryId');
        }
        setSearchParams(newParams)
    }

    return (
        <nav className="w-full py-4 flex items-center justify-between">

            <div className="flex flex-col">
                <h5 className="font-medium text-2xl text-gray-900">Nossos Produtos</h5>
                <p className="text-sm text-gray-500">Novos produtos todos os dias</p>
            </div>
            <div className="flex items-center justify-end gap-2">
                <Button variant="ghost">

                    Todos
                </Button>
                {visibleItems.map((category) => (
                    <Button key={category.id} 
                    variant={category.id == activeCategory?.id ? 'default' : 'ghost'}
                    onClick={() => handleSelect(category.id)} 
                    className={cn('text-sm cursor-pointer', category.id == activeCategory?.id && 'bg-green-600 hover:bggreen-700 text-white')}>

                        {category.name}
                    </Button>
                ))}


                {hiddenItems.length > 0 && (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost">

                                Mais
                                <ChevronDown />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            {hiddenItems.map((category: CategoryDTO) => (
                                <DropdownMenuItem key={category.id}>
                                    {category.name}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                )}
            </div>
        </nav>
    );
}