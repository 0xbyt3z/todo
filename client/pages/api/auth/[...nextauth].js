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
  pages: {},
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
      //check weather the jwt is expired or not
      const isExpired = jsonwebtoken.decode(token.access_token)?.exp * 1000 <= Date.now();

      if (isExpired) {
        console.log(renewAccessToken(token.id_token));
      }

      if (account) {
        //store the refresh_token in the database when the user is created for the first time
        updateUserRefreshKey(account);
        //storing the access_token in the nextauth
        //users can be logout only using the id_token
        //guess it concern about the acr feild in the JWT
        token.id_token = account.id_token;
        token.access_token = account.access_token;
      }
      return token;
    },
  },
};
export default NextAuth(authOptions);

const updateUserRefreshKey = async (account) => {
  await fetch(`http://localhost:3001/graphql`, {
    method: "POST",
    headers: { Authorization: `Bearer ${account.id_token}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `mutation($token:String!){
    updateUserRefreshToken(token:$token){email}}`,
      variables: {
        token: account.refresh_token,
      },
    }),
  })
    .then((res) => res.json())
    .catch((e) => console.log(e));
};

const renewAccessToken = async (token) => {
  const user = await fetch(`http://localhost:3001/graphql`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `{
        getRefreshToken 
  }`,
    }),
  })
    .then((res) => res.json())
    .catch((e) => console.log(e));

  const data = JSON.stringify({ grant_type: "refresh_token" });
  // client_id: process.env.KEYCLOAK_SECRET, client_secret: process.env.KEYCLOAK_ID, refresh_token: user.data.getRefreshToken });
  const res = await fetch("http://localhost:8080/realms/myrealm/protocol/openid-connect/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: data,
  }).then((res) => res.json());
  console.log(res);
  console.log(data);
};
