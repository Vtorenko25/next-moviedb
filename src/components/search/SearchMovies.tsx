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
                console.log("Пошук фільмів для запиту:", searchQuery);
                const results = await searchMovies(searchQuery);
                console.log("Результати пошуку:", results);
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
                console.log("Завантаження популярних фільмів для сторінки:", page);
                const results = await fetchPopularMovies(page);
                console.log("Популярні фільми:", results);
                setMovies(results); // Оновлюємо список популярними фільмами
            }
        };
        fetchMovies();
    }, [page, searchQuery, setMovies]);

    return (
        <div>

        </div>
    );
};

export default SearchComponent;
