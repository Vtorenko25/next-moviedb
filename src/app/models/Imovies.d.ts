export interface Imovies {
    id: number,
    original_language: string,
    original_title: string,
    overview: string,
    popularity: number,
    poster_path: string,
    release_date: string,
    title: string,
    video: boolean,
    vote_average: number,
    vote_count: number,
    adult: boolean,
    backdrop_path: string,
    genre_ids: number[];  // Це має бути масив чисел, а не масив об'єктів
}
// export interface Igenre {
//     genres(genres: any): unknown;
//     id: number,
//     name: string,
// }
export interface Genre {
    id: number;       // Genre ID
    name: string;     // Genre name
}

export interface GenreResponse {
    genres: Genre[];  // Array of genres
}