'use client';

import React, { FC, useEffect } from 'react';
import { fetchPopularMovies, searchMovies } from '@/components/helpers/helpers';
import { Imovies } from '@/app/models/Imovies';

interface SearchComponentProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    setMovies: (movies: Imovies[]) => void;
    page: number;
}

const SearchComponent: FC<SearchComponentProps> = ({ searchQuery, setSearchQuery, setMovies, page }) => {
    useEffect(() => {
        const fetchMovies = async () => {
            if (searchQuery) {
                console.log("Пошук фільмів для запиту:", searchQuery);
                const results = await searchMovies(searchQuery);
                console.log("Результати пошуку:", results);
                setMovies(results);
            } else {
                setMovies([]);
            }
        };
        fetchMovies();
    }, [searchQuery, setMovies]);


    useEffect(() => {
        const fetchMovies = async () => {
            if (!searchQuery) {
                console.log("Завантаження популярних фільмів для сторінки:", page);
                const results = await fetchPopularMovies(page);
                console.log("Популярні фільми:", results);
                setMovies(results);
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
