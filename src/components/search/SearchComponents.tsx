'use client';

import React from 'react';

interface SearchComponentProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
}

const SearchComponent: React.FC<SearchComponentProps> = ({ searchQuery, setSearchQuery }) => {
    return (
        <div>
            <input
                type="text"
                placeholder="Пошук фільмів..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)} // Оновлюємо пошуковий запит
            />
        </div>
    );
};

export default SearchComponent;