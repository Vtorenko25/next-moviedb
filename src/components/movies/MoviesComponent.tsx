import React, { FC } from 'react';
import { Imovies } from "@/app/models/Imovies";
import Link from "next/link";
import './MoviesComponent.css';
import {renderStars} from "@/components/rating/Rating";
import {img} from "@/components/constants/urls";


type Props = {
    movies: Imovies[];
    getGenreNames: (genreIds: number[]) => string;
    genres: { id: number, name: string }[];
}

const MoviesComponent: FC<Props> = ({ movies, getGenreNames, genres }) => {

    return (
        <div className="moviesComponent">
            <div className="moviesComponent_movies">
                {movies.map((movie: Imovies) => (
                    <div key={movie.id}>

                        <Link href={`/movies/${movie.id}`}>
                            {movie.poster_path && (
                                <img
                                    src={`${img}w200${movie.poster_path}`}
                                    alt={movie.title}
                                />
                            )}
                        </Link>
                        <div className="moviesComponent_rating">
                            <h2>{movie.title}</h2>
                            <span>
                                <div className="moviesComponent_rating-div">{renderStars(movie.vote_average /2)}</div>
                            </span>
                        </div>
                        <div>

                            <span className="moviesComponent_rating-div-genre"> Жанри:
                                {movie.genre_ids.map((genreId) => (
                                    <Link key={genreId} href={`/genre/${genreId}`}>
                                        <span className="moviesComponent_rating-genre">
                                            {getGenreNames([genreId])}
                                        </span>
                                    </Link>
                                ))}
                            </span>
                        </div>
                        <div>
                            <p className="moviesComponent-text">{movie.overview}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MoviesComponent;
