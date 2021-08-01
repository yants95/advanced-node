export const env = {
  facebookAPI: {
    clientId: process.env.FB_CLIENT_ID ?? '356214855945722',
    clientSecret: process.env.FB_CLIENT_SECRET ?? '61b0d17c88b7110b0d284e522ebf3b97'
  },
  port: process.env.PORT ?? 3000,
  jwtSecret: process.env.JWT_SECRET ?? 'uhiuafidsu'
}
