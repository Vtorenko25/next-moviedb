import React, { FC } from 'react';
import { Imovies } from "@/components/models/Imovies";
import Link from "next/link";

type Props = {
    movies: Imovies[];
    getGenreNames: (genreIds: number[]) => string;
    genres: { id: number, name: string }[];
}

const MoviesComponent: FC<Props> = ({ movies, getGenreNames, genres }) => {
    const getGenreNameById = (id: number) => {
        if (!genres || genres.length === 0) return "Невідомий жанр"; // Перевірка
        const genre = genres.find((genre) => genre.id === id);
        return genre ? genre.name : "Невідомий жанр";
    };

    return (
        <div>
            <ul>
                {movies.map((movie: Imovies) => (
                    <li key={movie.id}>
                        <Link href={`/movies/${movie.id}`}>
                            {movie.poster_path && (
                                <img
                                    src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                                    alt={movie.title}
                                    style={{ width: "200px" }}
                                />
                            )}
                        </Link>
                        <div>
                            <span>{movie.title}</span>
                            <span>{movie.vote_average}</span>
                        </div>
                        <div>
                            <span>{movie.release_date}</span>
                            <span>{movie.original_language}</span>
                            <span>
                                {movie.genre_ids.map((genreId) => (
                                    <Link key={genreId} href={`/genre/${genreId}`}>
                                    <span style={{ cursor: 'pointer', color: 'blue', marginRight: '5px' }}>
                                         {getGenreNames([genreId])}
                                    </span>
                                    </Link>
                                ))}
                            </span>
                        </div>
                        <div>
                            <p>{movie.overview}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MoviesComponent;