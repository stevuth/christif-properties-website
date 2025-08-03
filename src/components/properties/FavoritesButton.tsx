"use client";

import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useFavorites } from '@/hooks/useFavorites';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

type FavoritesButtonProps = {
  propertyId: number;
};

export default function FavoritesButton({ propertyId }: FavoritesButtonProps) {
  const { toggleFavorite, isFavorite } = useFavorites();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  
  const handleFavoriteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(propertyId);
  };

  if (!isClient) {
     return (
       <Button variant="ghost" size="icon" className="absolute top-2 right-2 bg-black/30 text-white hover:bg-black/50 hover:text-primary">
        <Heart className="h-6 w-6" />
      </Button>
     );
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleFavoriteClick}
      className="absolute top-2 right-2 bg-black/30 text-white hover:bg-black/50 hover:text-primary"
      aria-label={isFavorite(propertyId) ? 'Remove from favorites' : 'Add to favorites'}
    >
      <Heart className={cn("h-6 w-6", isFavorite(propertyId) ? "fill-primary text-primary" : "text-white")} />
    </Button>
  );
}
