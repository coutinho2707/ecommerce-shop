import { FavoritesList } from '../cases/interactions/components/favorites-list';
import { useAuth } from '../cases/auth/hooks/use-auth';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export function FavoritesPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/signin');
    }
  }, [user, navigate]);

  if (!user) {
    return <div className="p-4">Redirecionando para login...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Meus Favoritos</h1>
        <p className="text-gray-600 mt-2">Produtos que você salvou</p>
      </div>
      <FavoritesList />
    </div>
  );
}
