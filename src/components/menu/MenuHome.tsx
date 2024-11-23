import React from 'react';
import Link from "next/link";

const MenuHome = () => {
    return (
        <div>
            <ul>
                <li>
                    <Link href={'/movies'}>Всі фільми</Link>
                </li>
            </ul>
        </div>
    );
};

export default MenuHome;