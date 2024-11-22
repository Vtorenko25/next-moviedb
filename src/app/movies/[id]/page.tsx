import React from "react";
import { fetchMovieById } from "@/components/services/api.service";
import MovieComponent from "@/components/movie/MovieComponent";

type Params = {
    params: {
        id: string;
    };
};

const MoviePage = async ({ params }: Params) => {
    const movieId = params.id;
    const movieData = await fetchMovieById(movieId);
    return (
        <div>
            <MovieComponent params={movieData} />
        </div>
    );
};

export default MoviePage;