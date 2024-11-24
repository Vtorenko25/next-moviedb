'use client';

import React from 'react';
import GetMovies from '@/components/getMovies/GetMovies'; // Імпортуємо новий компонент

const MoviesPage = () => {
    return (
        <div>
            <GetMovies /> {/* Використовуємо GetMovies */}
        </div>
    );
};

export default MoviesPage;


