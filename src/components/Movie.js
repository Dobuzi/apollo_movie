import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";

const queryLikeMovie = gql`
    mutation toggleLikeMovie($id: Int!, $isLiked: Boolean!) {
        toggleLikeMovie(id: $id, isLiked: $isLiked) @client
    }
`;

const Container = styled.div`
    height: 400px;
    width: 100%;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
    border-radius: 7px;
    background-color: transparent;
    margin: 20px;
`;

const Poster = styled.button`
    background-image: url(${(props) => props.bg});
    height: 100%;
    width: 100%;
    background-size: cover;
    background-position: center center;
    border-radius: 7px;
`;

const Button = styled.div`
    margin: 5px;
    background-color: Transparent;
    cursor: pointer;
    font-size: 30px;
`;

export default ({ id, bg, isLiked }) => {
    const [toggleLikeMovie] = useMutation(queryLikeMovie, {
        variables: { id: parseInt(id), isLiked },
    });
    return (
        <Container>
            <Link to={`/${id}`}>
                <Poster bg={bg} />
            </Link>
            <Button onClick={toggleLikeMovie}>{isLiked ? "😍" : "🤨"}</Button>
        </Container>
    );
};
