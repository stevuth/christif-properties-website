"use client";

import { useState, useEffect, useCallback } from 'react';

const FAVORITES_KEY = 'terraAbodeFavorites';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<number[]>([]);

  useEffect(() => {
    try {
      const item = window.localStorage.getItem(FAVORITES_KEY);
      if (item) {
        setFavorites(JSON.parse(item));
      }
    } catch (error) {
      console.error("Failed to parse favorites from localStorage", error);
      setFavorites([]);
    }
  }, []);

  const updateLocalStorage = (newFavorites: number[]) => {
    try {
      window.localStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
    } catch (error) {
      console.error("Failed to save favorites to localStorage", error);
    }
  };

  const addFavorite = useCallback((id: number) => {
    setFavorites(prevFavorites => {
      if (prevFavorites.includes(id)) {
        return prevFavorites;
      }
      const newFavorites = [...prevFavorites, id];
      updateLocalStorage(newFavorites);
      return newFavorites;
    });
  }, []);

  const removeFavorite = useCallback((id: number) => {
    setFavorites(prevFavorites => {
      if (!prevFavorites.includes(id)) {
        return prevFavorites;
      }
      const newFavorites = prevFavorites.filter((favId) => favId !== id);
      updateLocalStorage(newFavorites);
      return newFavorites;
    });
  }, []);

  const isFavorite = useCallback((id: number) => {
    return favorites.includes(id);
  }, [favorites]);

  const toggleFavorite = useCallback((id: number) => {
    if (isFavorite(id)) {
      removeFavorite(id);
    } else {
      addFavorite(id);
    }
  }, [isFavorite, addFavorite, removeFavorite]);

  return { favorites, toggleFavorite, isFavorite, addFavorite, removeFavorite };
};
