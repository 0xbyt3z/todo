"use client";

import { ApolloClient, InMemoryCache, ApolloProvider, gql, createHttpLink } from "@apollo/client";
import { signIn, useSession } from "next-auth/react";

export function ApolloWrapper({ children }: React.PropsWithChildren) {
  const { data: session, status } = useSession();

  if (status == "authenticated") {
    if (session?.user.accessToken === undefined) {
      console.log("Forced the client to signIn");
      signIn("keycloak");
    }
  }
  const httpLink = createHttpLink({
    uri: "http://localhost:3001/graphql",
    headers: { authorization: session ? `Bearer ${session.user.accessToken}` : "" },
  });
  const client = new ApolloClient({
    link: httpLink,
    // uri: "http://localhost:3001/graphql",
    cache: new InMemoryCache(),
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
