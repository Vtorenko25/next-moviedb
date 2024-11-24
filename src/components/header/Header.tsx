'use client';

import React, { FC } from "react";
import { Genre } from "@/app/models/Imovies";
import './Header.css';

interface HeaderProps {
    setSearchQuery: (query: string) => void;
    genres: Genre[]; // Передаємо жанри як пропси
}

const Header: FC<HeaderProps> = ({ setSearchQuery, genres }) => {
    return (
        <header className="header">
            <div className="header-div">
                <span className="header-div-span">
                    Всі жанри &#9660;
                    <ul className="dropdown">
                        {genres.map((genre) => (
                            <li key={genre.id}>
                                <a href={`/genre/${genre.id}`}>{genre.name}</a>
                            </li>
                        ))}
                    </ul>
                </span>
                <div>
                    <input
                        className="header-div-input"
                        type="text"
                        placeholder="Пошук фільмів..."
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            <div className="header-div-span-2">
                <span>Фільми</span>
                <span>Мультфільми</span>
                <span>Серіали</span>
                <span>Шоу</span>
            </div>
            <div className="header-div-go">
                <button className="header-div-button">Увійти</button>
            </div>
        </header>
    );
};

export default Header;

