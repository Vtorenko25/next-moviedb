import React from 'react';

type Params = {
    id: string;
};

const Page = async ({ params }: { params: Params }) => {
    // Використовуємо params.id для логування
    console.log("Params ID:", params.id);

    // Якщо вам потрібно отримувати дані на основі ID
    const movieData = await fetch(
        `https://api.themoviedb.org/3/movie/${params.id}?language=uk-UA`,
        {
            headers: {
                Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YTZmOTg3ZTg2YzA4MDU4YTMwMDk1NDQzZDQ0NDZkYiIsIm5iZiI6MTczMTk0OTM4MS4wOTg5MzE2LCJzdWIiOiI2NzNiNWYyN2EwOTFjMDBhMTVhNmY4OWEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.KViVnd6JvcV7FWybIRhDHn9PtBFFhGQQbG2KHV_zmgg`,
            },
        }
    ).then((res) => res.json());

    console.log("Movie Data:", movieData);

    return (
        <div>
            <h1>Movie ID: {params.id}</h1>
            <h2>{movieData.title}</h2>
            <p>{movieData.overview}</p>
        </div>
    );
};

export default Page;