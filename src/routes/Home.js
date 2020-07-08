import React from "react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";

const queryMovies = gql`
    {
        movies {
            id
            medium_cover_image
        }
    }
`;

export default () => {
    const { loading, data } = useQuery(queryMovies);
    if (loading) {
        return "Loading...";
    }
    if (data && data.movies) {
        return data.movies.map((movie) => <h1 key={movie.id}>{movie.id}</h1>);
    }
};
