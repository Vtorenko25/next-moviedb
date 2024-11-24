'use client';

import React, { useEffect } from 'react';
import { movieService } from "@/components/services/api.service";
import { Genre } from "@/app/models/Imovies";
interface GetGenresProps {
    setGenres: (genres: Genre[]) => void;
}

const GetGenres: React.FC<GetGenresProps> = ({ setGenres }) => {
    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const allGenres = await movieService.getGenres();
                setGenres(allGenres.genres);
            } catch (error) {
                console.error("Помилка при завантаженні жанрів:", error);
            }
        };
        fetchGenres();
    }, [setGenres]);

    return (
        <div>

        </div>
    );
};

export default GetGenres;