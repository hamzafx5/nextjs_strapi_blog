import { ApolloClient, InMemoryCache } from "@apollo/client";
const baseURL = process.env.NEXT_PUBLIC_STRAPI_URL;
const accessToken = process.env.STRAPI_API_ACCESS_TOKEN;

const client = new ApolloClient({
    uri: `${baseURL}/graphql`,
    cache: new InMemoryCache(),
    headers: {
        Authorization: `Bearer ${accessToken}`,
    },
});

export default client;
