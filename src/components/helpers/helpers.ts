import { movieService } from "@/components/services/api.service";
import { Imovies, Genre } from "@/app/models/Imovies";

// Функція для пошуку фільмів
export const searchMovies = async (query: string): Promise<Imovies[]> => {
    if (!query) return [];
    try {
        const searchResults = await movieService.searchMovies(query);
        return searchResults.results;
    } catch (error) {
        console.error("Помилка при пошуку фільмів:", error);
        return [];
    }
};

// Функція для завантаження популярних фільмів
export const fetchPopularMovies = async (page: number): Promise<Imovies[]> => {
    try {
        const allMovies = await movieService.getMovies(page);
        return allMovies.results;
    } catch (error) {
        console.error("Помилка при завантаженні популярних фільмів:", error);
        return [];
    }
};

// Функція для отримання назв жанрів за ID
export const getGenreNames = (genreIds: number[], genres: Genre[]): string => {
    return genreIds
        .map((id) => {
            const genre = genres.find((genre) => genre.id === id);
            return genre ? genre.name : "Невідомий жанр";
        })
        .join(", ");
};
