import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function CartEmpty() {
    return (
        <div className="flex flex-col items-center justify-center py-16 gap-4">
            <div className="text-center space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight">Seu carrinho está vazio</h2>
                <p className="text-muted-foreground">
                    Você ainda não adicionou nenhum produto ao seu carrinho.
                </p>
            </div>
            <Link to="/">
                <Button>
                    Começar a comprar
                </Button>
            </Link>
        </div>
    );
}
