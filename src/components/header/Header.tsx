'use client';

import React, { FC, useState, useEffect } from "react";
import { Genre } from "@/app/models/Imovies";
import './Header.css';

interface HeaderProps {
    setSearchQuery: (query: string) => void;
    genres: Genre[];
}

const Header: FC<HeaderProps> = ({ setSearchQuery, genres }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen((prev) => !prev);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (!target.closest(".header-div-span")) {
                closeMenu();
            }
        };

        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    return (
        <header className="header">
            <div className="header-div">
                <span className="header-div-span" onClick={toggleMenu}>
                    Всі жанри &#9660;
                    {isMenuOpen && (
                        <ul className="dropdown">
                            {genres.map((genre) => (
                                <li key={genre.id}>
                                    <a href={`/genre/${genre.id}`}>{genre.name}</a>
                                </li>
                            ))}
                        </ul>
                    )}
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
