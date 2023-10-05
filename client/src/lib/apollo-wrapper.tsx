"use client";

import { ApolloClient, InMemoryCache, ApolloProvider, gql } from "@apollo/client";

export function ApolloWrapper({ children }: React.PropsWithChildren) {
  const client = new ApolloClient({
    uri: "http://localhost:3001/graphql",
    cache: new InMemoryCache(),
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
