'use client';

import React, { useState, useEffect } from 'react';
import MoviesComponent from "@/components/movies/MoviesComponent";
import { movieService } from "@/components/services/api.service";

const MoviesPage = () => {
    const [page, setPage] = useState(1);
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const allMovies = await movieService.getAllMovies(page);
                console.log("Fetched movies:", allMovies);
                setMovies(allMovies.data || allMovies); // Витягуємо результати
            } catch (error) {
                console.error("Помилка при завантаженні фільмів:", error);
            }
        };

        fetchMovies();
    }, [page]); // Викликається при зміні сторінки

    return (
        <div>
            <MoviesComponent movies={movies} />
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