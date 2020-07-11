import ApolloClient from "apollo-boost";

const client = new ApolloClient({
    uri: "http://localhost:4000/#/",
    resolvers: {
        Movie: {
            isLiked: ({ id }) => {
                return localStorage.getItem(id) === "true" ? true : false;
            },
        },
        Mutation: {
            toggleLikeMovie: (_, { id, isLiked }, { cache }) => {
                cache.writeData({
                    id: `Movie:${id}`,
                    data: {
                        isLiked: !isLiked,
                    },
                });
            },
        },
    },
});

export default client;
