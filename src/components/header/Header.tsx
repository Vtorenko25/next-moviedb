'use client';

import React, { FC } from "react";
import MenuHome from "@/components/menu/MenuHome";
import './Header.css'

interface HeaderProps {
    setSearchQuery: (query: string) => void; // Функція для оновлення пошукового запиту
}

const Header: FC<HeaderProps> = ({ setSearchQuery }) => {
    return (
        <header className="header">
            <div className="header-div">
                <span className="header-div-span">
                    Всі жанри &#9660;
                </span>
                <div>
                    <input className="header-div-input"
                        type="text"
                        placeholder="Пошук фільмів..."
                        onChange={(e) => setSearchQuery(e.target.value)}/>
                </div>
            </div>
            <div>
                <span><MenuHome/></span>
            </div>
            <div className="header-div-span-2">
                <span>Фільми</span>
                <span>Мультфільми</span>
                <span>Серіали</span>
                <span>Шоу</span>
            </div>
            <div className="header-div-go">
                <span>Тарифи</span>
                <button className="header-div-button">Увійти</button>
            </div>
        </header>
    );
};

export default Header;
