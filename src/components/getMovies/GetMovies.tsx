'use client';

import React, { useState } from 'react';
import MoviesComponent from "@/components/movies/MoviesComponent";
import GetGenres from "@/components/getGeners/GetGenres";
import SearchComponent from '@/components/search/SearchMovies';
import { Genre, Imovies } from "@/app/models/Imovies";
import { getGenreNames } from '@/components/helpers/helpers';

const GetMovies = () => {
    const [page, setPage] = useState(1); // Сторінка для популярних фільмів
    const [movies, setMovies] = useState<Imovies[]>([]); // Список фільмів
    const [genres, setGenres] = useState<Genre[]>([]); // Жанри
    const [searchQuery, setSearchQuery] = useState(""); // Пошуковий запит

    return (
        <div>
            {/* Компонент для завантаження жанрів */}
            <GetGenres setGenres={setGenres} />

            {/* Компонент для пошуку */}
            <SearchComponent
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                setMovies={setMovies}
                page={page}
            />

            {/* Компонент для відображення фільмів */}
            <MoviesComponent
                movies={movies}
                getGenreNames={(ids) => getGenreNames(ids, genres)}
                genres={genres}
            />

            {/* Пагінація (лише без пошуку) */}
            {!searchQuery && (
                <div>
                    <button
                        onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                        disabled={page === 1}
                    >
                        Попередня сторінка
                    </button>
                    <button onClick={() => setPage((prev) => prev + 1)}>Наступна сторінка</button>
                </div>
            )}
        </div>
    );
};

export default GetMovies;

