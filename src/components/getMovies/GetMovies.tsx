'use client';

import React, { useState } from 'react';
import MoviesComponent from "@/components/movies/MoviesComponent";
import GetGenres from "@/components/getGeners/GetGenres";
import SearchComponent from '@/components/search/SearchMovies';
import { Genre, Imovies } from "@/app/models/Imovies";
import { getGenreNames } from '@/components/helpers/helpers';
import Header from "@/components/header/Header";
import './GetMovies.css'

const GetMovies = () => {
    const [page, setPage] = useState(1);
    const [movies, setMovies] = useState<Imovies[]>([]);
    const [genres, setGenres] = useState<Genre[]>([]);
    const [searchQuery, setSearchQuery] = useState("");

    return (
        <div>
            <Header setSearchQuery={setSearchQuery} />
            <GetGenres setGenres={setGenres} />
            <SearchComponent
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                setMovies={setMovies}
                page={page}/>
            <MoviesComponent
                movies={movies}
                getGenreNames={(ids) => getGenreNames(ids, genres)}
                genres={genres}
            />

            {!searchQuery && (
                <div className="pagination-button-div">
                    <button className="pagination-button"
                        onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                        disabled={page === 1}
                    >
                        Попередня сторінка
                    </button>
                    <button className="pagination-button"
                        onClick={() => setPage((prev) => prev + 1)}>
                        Наступна сторінка
                    </button>
                </div>
            )}
        </div>
    );
};

export default GetMovies;
