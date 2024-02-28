import NextAuth from "next-auth";
import KeycloakProvider from "next-auth/providers/keycloak";
import jsonwebtoken from "jsonwebtoken";
export const authOptions = {
  providers: [
    KeycloakProvider({
      clientId: process.env.KEYCLOAK_ID,
      clientSecret: process.env.KEYCLOAK_SECRET,
      issuer: process.env.KEYCLOAK_ISSUER,
      idToken: true,
      accessToken: true,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  events: {
    async signOut({ token, session }) {
      const logOutUrl = new URL(`${process.env.KEYCLOAK_ISSUER}/protocol/openid-connect/logout`);
      logOutUrl.searchParams.set("id_token_hint", token.id_token);
      await fetch(logOutUrl);
    },
  },
  pages: {
    newUser: "/auth/new-user",
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true;
    },
    async session({ session, user, token }) {
      session.user.id = token.sub;
      session.user.accessToken = token.access_token;
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      //create a new user or fail if the user exists
      createUser(token);
      //check weather the jwt is expired or not
      const isExpired = jsonwebtoken.decode(token.access_token)?.exp * 1000 <= Date.now();
      if (isExpired) {
        const refreshedTokens = await renewAccessToken(token.refresh_token);
        token.access_token = refreshedTokens.access_token;
        token.exp = Date.now() + refreshedTokens.expires_in * 1000;
      }
      if (account) {
        //store the refresh_token in the token when the user is created for the first time
        token.refresh_token = account.refresh_token;
        // // // updateUserRefreshKey(account);
        //storing the access_token in the nextauth
        //users can be logout only using the id_token
        //guess it concern about the acr feild in the JWT
        token.id_token = account.id_token;
        token.access_token = account.access_token;
      }
      if (isNewUser) {
        //try to create the new user for this user in the database
        console.log("isNewUser", isNewUser);
      }
      return token;
    },
  },
};
export default NextAuth(authOptions);

const renewAccessToken = async (token) => {
  const isRefreshTokenExpired = jsonwebtoken.decode(token.access_token)?.exp * 1000 <= Date.now();
  if (isRefreshTokenExpired) {
    console.log("Expired refresh token");
  }

  const data = { grant_type: "refresh_token", client_id: process.env.KEYCLOAK_ID, client_secret: process.env.KEYCLOAK_SECRET, refresh_token: token };
  var formBody = [];
  for (var property in data) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(data[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");
  const res = await fetch(`${process.env.NEXT_PUBLIC_KEYCLOAK_URL}/realms/myrealm/protocol/openid-connect/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: formBody,
  })
    .then((res) => res.json())
    .catch((e) => {
      throw e;
    });
  console.log("New access token created");
  return res;
};

function createUser(token) {
  const email = jsonwebtoken.decode(token.access_token)?.email;
  if (!email) {
    return;
  }
  // Define the GraphQL mutation
  const mutation = `
    mutation AddUser($user: AddUserInput!) {
      addUser(userData: $user) {
        email
      }
    }
  `;

  // Define the variables for the mutation
  const variables = {
    user: {
      email,
    },
  };

  // Define the GraphQL endpoint URL
  const graphqlEndpoint = `${process.env?.NEXT_PUBLIC_BACKEND_URL}/graphql`;

  // Perform the fetch request
  fetch(graphqlEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // Add any necessary authentication headers here
    },
    body: JSON.stringify({
      query: mutation,
      variables: variables,
    }),
  }).then((response) => {
    return response.json();
  });
}
