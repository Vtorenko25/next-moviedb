'use client';

import React, { FC, useEffect } from 'react';
import { fetchPopularMovies, searchMovies } from '@/components/helpers/helpers';
import { Imovies } from '@/app/models/Imovies';

interface SearchComponentProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    setMovies: (movies: Imovies[]) => void; // Передаємо функцію для оновлення списку фільмів
    page: number; // Для завантаження популярних фільмів
}

const SearchComponent: FC<SearchComponentProps> = ({ searchQuery, setSearchQuery, setMovies, page }) => {
    // Оновлення фільмів на основі пошуку
    useEffect(() => {
        const fetchMovies = async () => {
            if (searchQuery) {
                const results = await searchMovies(searchQuery);
                setMovies(results); // Оновлюємо список фільмів результатами пошуку
            } else {
                setMovies([]); // Очищуємо список, якщо пошуковий запит порожній
            }
        };
        fetchMovies();
    }, [searchQuery, setMovies]);

    // Оновлення популярних фільмів
    useEffect(() => {
        const fetchMovies = async () => {
            if (!searchQuery) {
                const results = await fetchPopularMovies(page);
                setMovies(results); // Оновлюємо список популярними фільмами
            }
        };
        fetchMovies();
    }, [page, searchQuery, setMovies]);

    return (
        <div>
            <input
                type="text"
                placeholder="Пошук фільмів..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)} // Оновлюємо пошуковий запит
            />
        </div>
    );
};

export default SearchComponent;
