'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import MoviesComponent from "@/components/movies/MoviesComponent";
import { movieService } from "@/components/services/api.service";
import { Imovies } from "@/components/models/Imovies";

const GenrePage = () => {
    const { id } = useParams(); // Отримуємо ID жанру з URL
    const [movies, setMovies] = useState<Imovies[]>([]);
    const [genres, setGenres] = useState<{ id: number; name: string }[]>([]);
    const [genreName, setGenreName] = useState<string>("");

    useEffect(() => {
        if (!id) return;

        const fetchMoviesAndGenres = async () => {
            try {
                // Отримуємо фільми за жанром
                const movieResponse = await movieService.getMoviesByGenre(Number(id));
                setMovies(movieResponse.results);

                // Отримуємо всі жанри
                const genreResponse = await movieService.getGenres();
                setGenres(genreResponse.genres);

                // Встановлюємо назву жанру
                const currentGenre = genreResponse.genres.find((genre) => genre.id === Number(id));
                setGenreName(currentGenre ? currentGenre.name : "Невідомий жанр");
            } catch (error) {
                console.error("Помилка завантаження:", error);
            }
        };

        fetchMoviesAndGenres();
    }, [id]);

    return (
        <div>
            <h1>Фільми жанру: {genreName}</h1>
            <MoviesComponent
                movies={movies}
                getGenreNames={(ids) => ids.map((id) => genres.find((g) => g.id === id)?.name || "Невідомий жанр").join(', ')}
                genres={genres}
            />
        </div>
    );
};

export default GenrePage;