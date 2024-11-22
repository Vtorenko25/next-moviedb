import { Imovies } from "@/components/models/Imovies";
import {base, baseId, token} from "@/components/constants/urls";




export let newPage = 1;
export const urlBuilder = {
    moviesBaseUrl: (newPage: number) => `/movie?language=uk-UA&page=${newPage}`,
    allMovies: (newPage: number) => base + urlBuilder.moviesBaseUrl(newPage),
};

export const movieService = {
    getAllMovies: async (newPage: number): Promise<Imovies[]> => {
        try {
            const response = await fetch(urlBuilder.allMovies(newPage), {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: 'Bearer ' + token,
                },
            });
            const data = await response.json();
            console.log(data);
            return data.results;
            console.log(data.results);
        } catch (error) {
            console.error("Error fetching movies:", error);
            throw error;
        }
    },
};

export const fetchMovieById = async (id: string) => {
    const response = await fetch(`${baseId}/movie/${id}?language=uk-UA`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    if (!response.ok) {
        throw new Error(`Помилка при отриманні фільму: ${response.status}`);
    }
    return response.json();
};


