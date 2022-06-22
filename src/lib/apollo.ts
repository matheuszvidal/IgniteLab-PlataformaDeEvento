import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
    uri: 'https://api-sa-east-1.graphcms.com/v2/cl4nmzr4g0fsy01yw5g694m6d/master',
    cache: new InMemoryCache()
})