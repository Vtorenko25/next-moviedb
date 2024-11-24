'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import MoviesComponent from "@/components/movies/MoviesComponent";
import { movieService } from "@/components/services/api.service";
import { Imovies } from "@/app/models/Imovies";
import MenuHome from "@/components/menu/MenuHome";
import './genre.css'

const GenrePage = () => {
    const { id } = useParams();
    const [movies, setMovies] = useState<Imovies[]>([]);
    const [genres, setGenres] = useState<{ id: number; name: string }[]>([]);
    const [genreName, setGenreName] = useState<string>("");

    useEffect(() => {
        if (!id) return;

        const fetchMoviesAndGenres = async () => {
            try {

                const movieResponse = await movieService.getMoviesByGenre(Number(id));
                setMovies(movieResponse.results);


                const genreResponse = await movieService.getGenres();
                setGenres(genreResponse.genres);


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
            <div className="genre-home"><MenuHome/></div>

            <MoviesComponent
                movies={movies}
                getGenreNames={(ids) => ids.map((id) => genres.find((g) => g.id === id)?.name || "Невідомий жанр").join(', ')}
                genres={genres}
            />
        </div>
    );
};

export default GenrePage;