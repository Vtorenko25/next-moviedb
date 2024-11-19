import { Imovies } from "@/app/components/models/movies/Imovies";

const base: string = 'https://api.themoviedb.org/3/discover/';

const urlBuilder = {
    moviesBaseUrl: (newPage: number) => `movie?page=${newPage}`,
    allMovies: (newPage: number) => base + urlBuilder.moviesBaseUrl(newPage),
};

const movieService = {
    getAllMovies: async (newPage: number): Promise<Imovies[]> => {
        try {
            const response = await fetch(urlBuilder.allMovies(newPage), {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YTZmOTg3ZTg2YzA4MDU4YTMwMDk1NDQzZDQ0NDZkYiIsIm5iZiI6MTczMTk0OTM4MS4wOTg5MzE2LCJzdWIiOiI2NzNiNWYyN2EwOTFjMDBhMTVhNmY4OWEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.KViVnd6JvcV7FWybIRhDHn9PtBFFhGQQbG2KHV_zmgg',
                },
            });
            const data = await response.json();
            console.log(data);
            return data.results; // Повертаємо лише масив фільмів
            // console.log(data.results);
        } catch (error) {
            console.error("Error fetching movies:", error);
            throw error;
        }
    },
};

export default movieService;