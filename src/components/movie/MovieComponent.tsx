'use client';

import React, { useEffect, useState } from 'react';
import { movieService } from "@/components/services/api.service";
import './MovieComponent.css';
import { img } from "@/components/constants/urls";
import { renderStars } from "@/components/rating/Rating";
import Link from "next/link";
import MenuHome from "@/components/menu/MenuHome";

type Props = {
    params: { id: string };
};

const MovieComponent: React.FC<Props> = ({ params }) => {
    const [movie, setMovie] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                setLoading(true);
                const fetchedMovie = await movieService.getMovie(params.id);
                setMovie(fetchedMovie);
            } catch (err) {
                setError("Не вдалося завантажити інформацію про фільм.");
            } finally {
                setLoading(false);
            }
        };

        fetchMovie();
    }, [params.id]);

    if (loading) return <div>Завантаження...</div>;
    if (error) return <div>{error}</div>;
    if (!movie) return <div>Інформація про фільм недоступна.</div>;

    return (
        <div className="movie-home">
            <span><MenuHome/></span>

        <div className="movie">

            <div className="movieComponent">
                <img
                    src={`${img}w500${movie.poster_path}`}
                    alt={movie.title}
                />
                <div className="movieComponent-text">
                    <div className="movieDetails">
                        <h2>{movie.title}</h2>
                        <p>Дата виходу: {movie.release_date}</p>
                        <p>Мова: {movie.original_language}</p>
                        <p>Оригінальна назва: {movie.original_title}</p>
                        <p>Популярність: {movie.popularity}</p>
                        <p>
                            Рейтинг: <span className="movieDetails-rating">{renderStars(movie.vote_average / 2)}</span>
                        </p>
                        <p>Голосів: {movie.vote_count}</p>
                    </div>
                    {movie.genres && (
                        <div >
                            <span className="movieGenres-genre">Жанри:
                                {movie.genres.map((genre: { id: number; name: string }) => (
                                    <Link key={genre.id} href={`/genre/${genre.id}`}>
                                        <span className="movieGenre">
                                            {genre.name}
                                        </span>
                                    </Link>
                                ))}
                            </span>
                            <p>Опис: {movie.overview}</p>
                        </div>
                    )}
                </div>

            </div>
        </div>
        </div>
    );
};

export default MovieComponent;
