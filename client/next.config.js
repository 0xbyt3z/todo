/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      //   {
      //     source: "/api/auth/signin",
      //     destination:
      //       "http://keycloak:8080/realms/myrealm/protocol/openid-connect/auth?client_id=myclient&scope=openid%20email%20profile&response_type=code&redirect_uri=http://localhost:3000/api/auth/callback/keycloak&state=nD-KLnuH7JYWhEya_mT0Nv1_QhifSx6L-zWTE6wNgMc&code_challenge=lv8w8etitJgtK1qLRYXvAGt0QiGjZjjYWSAuJGP9Vio&code_challenge_method=S256",
      //   },
    ];
  },
};

module.exports = nextConfig;
