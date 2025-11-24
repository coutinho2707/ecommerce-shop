import { Button } from "@/components/ui/button";
import { useCategories } from "../hooks/use-category";
import type { CategoryDTO } from "../dtos/category.dto";
import { useEffect, useState } from "react";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown } from "lucide-react";

export function CategoryMenu() {

    const { data: categories } = useCategories();

    const [visibleItems, setVisibleItems] = useState<CategoryDTO[]>([]);
    const [hiddenItems, setHiddenItems] = useState<CategoryDTO[]>([]);

    useEffect(() => {
        if (categories) {
            setVisibleItems(categories.slice(0, 5));
            setHiddenItems(categories.slice(5));
        }
    }, [categories]);

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
                {visibleItems.map((category: CategoryDTO) => (
                    <Button key={category.id} variant="ghost">

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