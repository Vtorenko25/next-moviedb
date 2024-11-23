'use client';

import React, { useState, useEffect } from 'react';
import MoviesComponent from "@/components/movies/MoviesComponent";
import { movieService } from "@/components/services/api.service";
import {Igenre} from "@/components/models/Imovies";

const MoviesPage = () => {
    const [page, setPage] = useState(1);
    const [movies, setMovies] = useState([]);
    const [genres, setGenres] = useState([]); // Додано для жанрів

    // Завантаження фільмів
    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const allMovies = await movieService.getMovies(page);
                console.log("Fetched movies:", allMovies);
                setMovies(allMovies.results); // Витягуємо лише `results`
            } catch (error) {
                console.error("Помилка при завантаженні фільмів:", error);
            }
        };

        fetchMovies();
    }, [page]); // Викликається при зміні сторінки

    // Завантаження жанрів
    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const allGenres = await movieService.getGenres();
                console.log("Fetched genres:", allGenres);
                setGenres(allGenres.genres); // Витягуємо масив жанрів з об'єкта
            } catch (error) {
                console.error("Помилка при завантаженні жанрів:", error);
            }
        };

        fetchGenres();
    }, []);

    // Функція для отримання назв жанрів по ID
    const getGenreNames = (genreIds: Igenre[]) => {
        return genreIds
            .map(id => {
                const genre = genres.find(genre => genre.id === id); // Шукаємо жанр за ID
                return genre ? genre.name : "Невідомий жанр"; // Повертаємо назву жанру або "Невідомий жанр"
            })
            .join(', '); // Перетворюємо масив жанрів в рядок
    };

    return (
        <div>
            <MoviesComponent movies={movies} getGenreNames={getGenreNames} /> {/* Передаємо функцію в компонент */}
            <button
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                disabled={page === 1}
            >
                Попередня сторінка
            </button>
            <button onClick={() => setPage((prev) => prev + 1)}>Наступна сторінка</button>
        </div>
    );
};

export default MoviesPage;