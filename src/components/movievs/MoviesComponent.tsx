import React, {FC} from 'react';
import {Imovies} from "@/components/models/Imovies";
import {img} from "@/components/constants/urls";


type Props = {
    movies: Imovies[]
}
const MoviesComponent:FC<Props> = ({movies}) => {

    return (
        <div>
            <ul>
            {
                movies.map((movie:Imovies) => (<li key={movie.id}>
                    {movie.poster_path && (
                        <img
                            src={`${img}${movie.poster_path}`}
                            alt={movie.title}
                            style={{ width: "200px" }}
                        />
                    )}
                    <div>
                        <span>{movie.title}</span>
                        {/*<span>{movie.vote_count}/10</span>*/}
                        <span>{movie.vote_average}</span>
                    </div>
                    <div>
                        <span>{movie.release_date}</span>
                        <span>{movie.original_language}</span>
                    </div>
                    <div>
                        <p>
                            {movie.overview}
                        </p>
                    </div>
                </li>))
            }
            </ul>
        </div>
    );
};

export default MoviesComponent;