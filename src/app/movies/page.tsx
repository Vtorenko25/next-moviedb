'use client';

import React, { useState, useEffect } from 'react';
import MoviesComponent from "@/components/movies/MoviesComponent";
import { movieService } from "@/components/services/api.service";
import { Igenre } from "@/components/models/Imovies";

const MoviesPage = () => {
    const [page, setPage] = useState(1);
    const [movies, setMovies] = useState([]);
    const [genres, setGenres] = useState([]);
    const [searchQuery, setSearchQuery] = useState(""); // Для тексту пошуку

    // Завантаження фільмів
    useEffect(() => {
        if (searchQuery) return; // Якщо є пошуковий запит, не завантажуємо популярні фільми

        const fetchMovies = async () => {
            try {
                const allMovies = await movieService.getMovies(page);
                setMovies(allMovies.results); // Витягуємо лише `results`
            } catch (error) {
                console.error("Помилка при завантаженні фільмів:", error);
            }
        };

        fetchMovies();
    }, [page, searchQuery]); // Викликається при зміні сторінки або коли пошук порожній

    // Завантаження жанрів
    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const allGenres = await movieService.getGenres();
                setGenres(allGenres.genres); // Витягуємо масив жанрів з об'єкта
            } catch (error) {
                console.error("Помилка при завантаженні жанрів:", error);
            }
        };

        fetchGenres();
    }, []);

    // Пошук фільмів
    const handleSearch = async () => {
        if (!searchQuery) return; // Не виконуємо пошук, якщо поле порожнє
        try {
            const searchResults = await movieService.searchMovies(searchQuery);
            setMovies(searchResults.results); // Оновлюємо стан фільмів
        } catch (error) {
            console.error("Помилка при пошуку фільмів:", error);
        }
    };

    // Функція для отримання назв жанрів по ID
    const getGenreNames = (genreIds: number[]) => {
        return genreIds
            .map((id) => {
                const genre = genres.find((genre) => genre.id === id);
                return genre ? genre.name : "Невідомий жанр";
            })
            .join(", "); // Перетворюємо масив жанрів в рядок
    };

    return (
        <div>
            <div>
                <input
                    type="text"
                    placeholder="Пошук фільмів..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button onClick={handleSearch}>Пошук</button>
            </div>
            <MoviesComponent movies={movies} getGenreNames={getGenreNames} genres={genres} />
            {!searchQuery && ( // Показуємо пагінацію лише при відсутності пошукового запиту
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