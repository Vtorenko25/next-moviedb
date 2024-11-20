import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <h1>Movie Details</h1>
            {children} {/* Обов'язково включіть children */}
        </div>
    );
}