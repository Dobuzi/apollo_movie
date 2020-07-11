import React from "react";
import { useParams } from "react-router-dom";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import styled from "styled-components";
import Suggestion from "../components/Suggestion";

const queryMovie = gql`
    query getMovie($id: Int!) {
        movie(id: $id) {
            id
            title
            medium_cover_image
            language
            rating
            description_intro
            isLiked @client
        }
        suggestions(id: $id) {
            id
            medium_cover_image
        }
    }
`;

const Container = styled.div`
    height: 100vh;
    background-image: linear-gradient(-45deg, #d754ab, #fd723a);
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    color: white;
`;
const SubContainer = styled.div`
    height: 50vh;
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
`;

const Column = styled.div`
    display: flex;
    flex-direction: column;
    align-items: left;
    margin-left: 10px;
    width: 50%;
`;

const Title = styled.h1`
    font-size: 65px;
    margin-bottom: 10px;
`;

const Subtitle = styled.h4`
    font-size: 35px;
    margin-bottom: 10px;
`;

const Description = styled.p`
    font-size: 28px;
`;

const Poster = styled.div`
    width: 25%;
    height: 80%;
    background-color: transparent;
    background-image: url(${(props) => props.bg});
    background-size: cover;
    background-position: center center;
    border-radius: 7px;
`;

const Movies = styled.div`
    display: flex;
    width: 100%;
    position: relative;
`;

export default () => {
    const { id } = useParams();
    const { loading, data } = useQuery(queryMovie, {
        variables: { id: parseInt(id) },
    });
    return (
        <>
            <Container>
                <Title>{loading ? "Loading ..." : ""}</Title>
                <SubContainer>
                    <Column>
                        <Title>
                            {loading
                                ? ""
                                : `${data?.movie?.title} ${
                                      data?.movie?.isLiked ? "😍" : "🤨"
                                  }`}
                        </Title>
                        <Subtitle>
                            {loading
                                ? ""
                                : `${data?.movie?.language} ・ ${data?.movie?.rating}`}
                        </Subtitle>
                        <Description>
                            {loading ? "" : data?.movie?.description_intro}
                        </Description>
                    </Column>
                    <Poster
                        bg={loading ? "" : data?.movie?.medium_cover_image}
                    />
                </SubContainer>
                <SubContainer>
                    <Movies>
                        {loading
                            ? ""
                            : data?.suggestions?.map((suggestion) => (
                                  <Suggestion
                                      key={suggestion.id}
                                      id={suggestion.id}
                                      bg={suggestion.medium_cover_image}
                                  />
                              ))}
                    </Movies>
                </SubContainer>
            </Container>
        </>
    );
};
