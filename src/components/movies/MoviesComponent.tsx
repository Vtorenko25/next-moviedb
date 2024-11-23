import React, { FC } from 'react';
import { Imovies } from "@/components/models/Imovies";
import Link from "next/link";

type Props = {
    movies: Imovies[];
    getGenreNames: (genreIds: number[]) => string; // Додано для отримання жанрів по ID
}

const MoviesComponent: FC<Props> = ({ movies, getGenreNames }) => {
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
                            <span>{getGenreNames(movie.genre_ids)}</span> {/* Вивести жанри */}
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