import {Imovies} from "@/app/components/models/movies/Imovies";
import movieService from "@/app/components/services/api.service";


const getMovies = async () => {
     const allMovies = await movieService.getAllMovies(1);
    return (

        <div>
            {
                allMovies.map((movie:Imovies) => (<ul key={movie.id}>
                    <li>{movie.title}</li>
                    {<li>{movie.poster_path}</li>}
                </ul>))
            }
            </div>
    );
};

export default  getMovies ;