import React from "react";
import { movieService} from "@/components/services/api.service";
import MovieComponent from "@/components/movie/MovieComponent";

type Params = {
    params: { id: string; };
};

const MoviePage = async ({ params }: Params) => {
    const movieId = params.id;
    const movieData = await movieService.getMovie(movieId);
    return (
        <div>
            <MovieComponent params={movieData} />
        </div>
    );
};

export default MoviePage;