'use client';

import React, { useState, useEffect } from 'react';
import MoviesComponent from "@/components/movies/MoviesComponent";
import { movieService } from "@/components/services/api.service";
import SearchComponent from '@/components/search/SearchComponents';


const MoviesPage = () => {
    const [page, setPage] = useState(1);
    const [movies, setMovies] = useState([]);
    const [genres, setGenres] = useState([]);
    const [searchQuery, setSearchQuery] = useState(""); // Для збереження пошукового запиту

    // Завантаження жанрів
    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const allGenres = await movieService.getGenres();
                setGenres(allGenres.genres);
            } catch (error) {
                console.error("Помилка при завантаженні жанрів:", error);
            }
        };
        fetchGenres();
    }, []);

    // Функція для пошуку фільмів під час введення тексту
    const searchMovies = async (query: string) => {
        if (!query) {
            setMovies([]); // Очищаємо список фільмів, якщо поле порожнє
            return;
        }

        try {
            const searchResults = await movieService.searchMovies(query);
            setMovies(searchResults.results); // Оновлюємо стан фільмів з результатами пошуку
        } catch (error) {
            console.error("Помилка при пошуку фільмів:", error);
        }
    };

    // Викликаємо searchMovies при кожній зміні searchQuery
    useEffect(() => {
        if (searchQuery) {
            searchMovies(searchQuery); // Пошук по введеному тексту
        } else {
            setMovies([]); // Якщо поле порожнє, очищуємо результати
        }
    }, [searchQuery]);

    // Завантаження фільмів для популярних (якщо немає пошукового запиту)
    useEffect(() => {
        if (searchQuery) return; // Якщо є пошуковий запит, не завантажуємо популярні фільми

        const fetchMovies = async () => {
            try {
                const allMovies = await movieService.getMovies(page);
                setMovies(allMovies.results); // Завантажуємо популярні фільми
            } catch (error) {
                console.error("Помилка при завантаженні фільмів:", error);
            }
        };
        fetchMovies();
    }, [page, searchQuery]);

    // Функція для отримання назв жанрів по ID
    const getGenreNames = (genreIds: number[]) => {
        return genreIds
            .map((id) => {
                const genre = genres.find((genre) => genre.id === id);
                return genre ? genre.name : "Невідомий жанр";
            })
            .join(", ");
    };

    return (
        <div>
            <SearchComponent searchQuery={searchQuery} setSearchQuery={setSearchQuery} /> {/* Викликаємо SearchComponent */}
            <MoviesComponent movies={movies} getGenreNames={getGenreNames} genres={genres} />
            {!searchQuery && ( // Пагінація з'являється лише без пошукового запиту
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

export default MoviesPage;