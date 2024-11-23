import {base, baseId, genres, search, token} from "@/components/constants/urls";
import {Imoviees} from "@/components/models/Imoviess";
import {Igenre} from "@/components/models/Imovies";



export const urlBuilder = {
    moviesBaseUrl: (newPage: number) => `/movie?language=uk-UA&page=${newPage}`,
    allMovies: (newPage: number) => base + urlBuilder.moviesBaseUrl(newPage),
    movieBaseUrl:(id:string) => `/movie/${id}?language=uk-UA`,
    movie:(id:string) => baseId + urlBuilder.movieBaseUrl(id),
    movieGenresUrl:() => genres,
};

export const movieService = {
    getMovies: async (newPage: number): Promise<Imoviees> => {
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
            return data;
        } catch (error) {
            console.error("Error fetching movies:", error);
            throw error;
        }
    },
    getMovie: async (id: string) => {
        try{
            const response= await fetch(urlBuilder.movie(id), {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.json();
        }
        catch (error) {
            console.error("Error fetching movie:", error);
            throw error;
        }
    },
    getGenres: async  ():Promise<Igenre> => {
        try {
            const response = await fetch(urlBuilder.movieGenresUrl(), {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: 'Bearer ' + token,
                },
            });
            const data = await response.json();
            console.log(data);
            return data;
        } catch (error) {
            console.error("Error fetching genres:", error);
            throw error;
        }
    },
    getMoviesByGenre: async (genreId: number) => {
        const response = await fetch(`https://api.themoviedb.org/3/discover/movie?with_genres=${genreId}&language=uk-UA`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (!response.ok) {
            throw new Error(`Помилка при отриманні фільмів за жанром: ${response.status}`);
        }
        return response.json();
    },
    searchMovies: async (query: string) => {
        try {
            const response = await fetch(`${search}movie?query=${encodeURIComponent(query)}`, {
                method: 'GET', // Метод має бути в корені параметрів
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            if (!response.ok) {
                throw new Error(`Помилка при пошуку фільмів: ${response.statusText}`);
            }
            const data = await response.json();
            console.log("Search results:", data);
            return data;
        } catch (error) {
            console.error("Error searching movies:", error);
            throw error;
        }
    },
};

