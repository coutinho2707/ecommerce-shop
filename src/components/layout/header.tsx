import { useCart } from "@/cases/cart/hooks/use-cart";
import { useCategories, useCategory } from "@/cases/categories/hooks/use-category";
import { useAuth } from "@/cases/auth/hooks/use-auth";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from "@/lib/utils";
import { ChevronDown, Home, ShoppingCart, Store, LogOut, User, Package } from "lucide-react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";

export function Header() {
    const { totalItems } = useCart();
    const { data: categories } = useCategories();
    const { user, isAuthenticated, signOut } = useAuth();
    const navigate = useNavigate();

    const visibleItems = categories?.slice(0, 5) || [];
    const hiddenItems = categories?.slice(5) || [];

    const [searchParams, setSearchParams] = useSearchParams();
    const categoryId = searchParams.get('categoryId') ?? undefined;
    const { data: activeCategory } = useCategory(categoryId!);

    const handleSignOut = async () => {
        try {
            await signOut();
            navigate('/');
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    function handleSelect(catId?: string) {
        const newParams = new URLSearchParams(searchParams);

        if (catId) {
            newParams.set('categoryId', catId);
        } else {
            newParams.delete('categoryId');
        }
        setSearchParams(newParams);
    }

    return (
        <header className="bg-white border-b sticky top-0 z-50 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row h-auto md:h-20 items-center justify-between py-4 md:py-0 gap-4">
                    {/* Logo */}
                    <Link to="/" onClick={() => handleSelect(undefined)} className="flex items-center gap-2 group">
                        <div className="bg-primary/10 p-2 rounded-lg group-hover:bg-primary/20 transition-colors">
                            <Store className="size-6 text-primary" />
                        </div>
                        <div className="flex flex-col">
                            <h1 className="font-bold text-2xl tracking-tight text-foreground">CoutoShop</h1>
                            <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">DESDE 2004 COM OS MELHORES PRODUTOS E PREÇOS</span>
                        </div>
                    </Link>

                    {/* Navigation / Categories */}
                    <nav className="flex items-center gap-1 overflow-x-auto max-w-full pb-2 md:pb-0 no-scrollbar">
                         <Button
                            variant={!categoryId ? 'default' : 'ghost'}
                            size="sm"
                            onClick={() => handleSelect()}
                            className={cn('gap-2 rounded-full', !categoryId && 'bg-primary hover:bg-primary/90')}
                        >
                            <Home className="w-4 h-4" />
                            <span className="whitespace-nowrap">Todos</span>
                        </Button>

                        {visibleItems.map((category) => (
                            <Button
                                key={category.id}
                                variant={category.id === activeCategory?.id ? 'default' : 'ghost'}
                                size="sm"
                                onClick={() => handleSelect(category.id)}
                                className={cn(
                                    'rounded-full transition-all',
                                    category.id === activeCategory?.id && 'bg-primary hover:bg-primary/90'
                                )}
                            >
                                {category.name}
                            </Button>
                        ))}

                        {hiddenItems.length > 0 && (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="sm" className="gap-1 rounded-full">
                                        Mais <ChevronDown className="w-3 h-3" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    {hiddenItems.map((category) => (
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
                    </nav>

                    {/* Actions */}
                    <div className="flex items-center gap-4">
                        <Link to="/cart">
                            <Button variant="outline" size="icon" className="relative rounded-full border-border/60 hover:bg-accent hover:text-accent-foreground transition-colors">
                                <ShoppingCart className="size-5" />
                                {totalItems > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-[10px] font-bold h-5 w-5 rounded-full flex items-center justify-center ring-2 ring-white">
                                        {totalItems}
                                    </span>
                                )}
                            </Button>
                        </Link>

                        {isAuthenticated && user ? (
                            <>
                                <Link to="/orders">
                                    <Button variant="outline" size="icon" className="rounded-full">
                                        <Package className="size-5" />
                                    </Button>
                                </Link>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="outline" size="icon" className="rounded-full">
                                            <User className="size-5" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem disabled className="text-xs">
                                            {user.email}
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer gap-2">
                                            <LogOut className="size-4" />
                                            Sair
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </>
                        ) : (
                            <>
                                <Link to="/signin">
                                    <Button variant="outline" size="sm">
                                        Entrar
                                    </Button>
                                </Link>
                                <Link to="/signup">
                                    <Button size="sm">
                                        Registrar
                                    </Button>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}
