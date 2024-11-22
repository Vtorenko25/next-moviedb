import React from 'react';
import {fetchMovieById} from "@/components/services/api.service";

type Props = {
    params: {
        id: string;
    };
};

const MovieComponent = async ({ params }: Props) => {
    // Використання асинхронного отримання даних
    const movieData = await fetchMovieById(params.id);
    return (
        <div>
            <img src={`https://image.tmdb.org/t/p/w500${movieData.poster_path}`} alt={movieData.title}/>
            <h2>{movieData.title}</h2>
            <p>{movieData.overview}</p>
        </div>
    );
};

export default MovieComponent;