import { Imovies } from "@/components/models/Imovies";
import {base, token} from "@/components/constants/urls";

const urlBuilder = {
    moviesBaseUrl: (newPage: number) => `/movie?language=uk-UA&page=${newPage}`,
    allMovies: (newPage: number) => base + urlBuilder.moviesBaseUrl(newPage),
};

const movieService = {
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
            // console.log(data.results);
        } catch (error) {
            console.error("Error fetching movies:", error);
            throw error;
        }
    },
};

export default movieService;