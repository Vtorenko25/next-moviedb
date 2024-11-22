import React from 'react';
import MoviesComponent from "@/components/movies/MoviesComponent";
import {movieService} from "@/components/services/api.service";



const MoviesPage = async () => {
    const allMovies = await movieService.getAllMovies(1);
    return (
        <div>
            <MoviesComponent movies={allMovies}/>
        </div>
    );
};

export default MoviesPage;