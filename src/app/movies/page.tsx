import React from 'react';
import movieService from "@/components/services/api.service";
import MoviesComponent from "@/components/movievs/MoviesComponent";



const MoviesPage = async () => {
    const allMovies = await movieService.getAllMovies(1);
    return (
        <div>
            <MoviesComponent movies={allMovies}/>
        </div>
    );
};

export default MoviesPage;