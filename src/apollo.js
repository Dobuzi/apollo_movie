import ApolloClient from "apollo-boost";

const client = new ApolloClient({
    uri: "http://localhost:4000/#/",
    resolvers: {
        Movie: {
            isLiked: ({ id }) => {
                console.log(localStorage.getItem(id));
                return localStorage.getItem(id)
                    ? localStorage.getItem(id).value
                    : false;
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
