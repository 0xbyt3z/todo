import NextAuth from "next-auth";
import KeycloakProvider from "next-auth/providers/keycloak";

export const authOptions = {
  providers: [
    KeycloakProvider({
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
  pages: {
    // signIn:
    //   "http://localhost:8080/realms/myrealm/protocol/openid-connect/auth?client_id=myclient&scope=openid%20email%20profile&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fapi%2Fauth%2Fcallback%2Fkeycloak&state=iZQwIYWSqkOWfMNanx8hvVHxDzni_lRM1gxOhR6jFF8&code_challenge=7KuUrhJtt8-GakI1FXD5E_yNgOi670hqavc91518OnU&code_challenge_method=S256",
    // error: '/auth/error', // Error code passed in query string as ?error=
    // verifyRequest: '/auth/verify-request', // (used for check email message)
    // newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true;
    },
    async session({ session, user, token }) {
      session.user.id = token.sub;
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
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
