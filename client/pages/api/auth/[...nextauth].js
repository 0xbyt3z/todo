import NextAuth from "next-auth";
import KeycloakProvider from "next-auth/providers/keycloak";

export const authOptions = {
  providers: [
    KeycloakProvider({
      //-> 1. user clicks on the login buton
      //-> 2. redirect the user to authorization_endpoint
      //authorization_endpoint: "http://127.0.0.1:8080/realms/myrealm/protocol/openid-connect/auth",
      //<- 3. redirect users to login prompt
      //-> 4. user select the Oauth to use from the list
      //<- 5. sends the auth code
      //-> 6. sends authorization code, application's client ID, and application's credentials, such as client secret or Private Key JWT
      // token_endpoint: "http://127.0.0.1:8080/realms/myrealm/protocol/openid-connect/token",
      //   7. verification
      //<- 8. response with ID token and access token
      clientId: process.env.KEYCLOAK_ID,
      clientSecret: process.env.KEYCLOAK_SECRET,
      issuer: process.env.KEYCLOAK_ISSUER,
      idToken: true,
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
  pages: {},
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true;
    },
    async session({ session, user, token }) {
      session.user.id = token.sub;
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      console.log(token);
      //following code is not required token in session callback contain 'sub'
      // if(user){
      //   //cause an error when trying t nest eg: token.user.id
      //   token.uId = user.id
      // }
      const res = await fetch("http://localhost:3001/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `query GetUser($email: String!) {
        getUser(email: $email) {
          id
          email
        }
      }`,
          variables: { email: token.email },
        }),
      }).then((res) => res.json());

      if (!res.data) {
        await fetch("http://localhost:3001/graphql", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: `mutation($input:AddUserInput!){
              addUser(userData:$input){
                id
              }
            }`,
            variables: { input: { email: token.email } },
          }),
        }).then((res) => res.json());
      }
      if (account) {
        token.id_token = account.id_token;
      }
      return token;
    },
  },
};
export default NextAuth(authOptions);
