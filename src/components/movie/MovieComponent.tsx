import React from 'react';
import {movieService} from "@/components/services/api.service";


type Props = {
    params: { id: string; };
};

const MovieComponent = async ({ params }: Props) => {

    const movie = await movieService.getMovie(params.id);
    return (
        <div>
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title}/>
            <h2>{movie.title}</h2>
            <p>{movie.overview}</p>
            <span>{movie.release_date}</span>
        </div>
    );
};

export default MovieComponent;