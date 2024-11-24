import React from 'react';
import {Metadata} from "next";
import {movieService} from "@/components/services/api.service";

export const generateMetadata = async ({params}:{params:{id:string}}):Promise<Metadata> =>{
    console.log(params.id, '111');
    let movie = await movieService.getMovie(params.id)
    return {title: movie.title, description: movie.description}
}
type Props = { children: React.ReactNode }
const MovieLayout = ({children}: Props) => {
    return (
        <div>
            {children}
        </div>
    );
};

export default MovieLayout;