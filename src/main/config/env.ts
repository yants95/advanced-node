export const env = {
  facebookAPI: {
    clientId: process.env.FB_CLIENT_ID ?? '356214855945722',
    clientSecret: process.env.FB_CLIENT_SECRET ?? '61b0d17c88b7110b0d284e522ebf3b97',
    accessToken: process.env.FB_ACCESS_TOKEN ?? ''
  },
  s3: {
    accessKey: process.env.AWS_S3_ACCESS_KEY ?? '',
    secret: process.env.AWS_S3_SECRET ?? '',
    bucket: process.env.AWS_S3_BUCKET ?? ''
  },
  port: process.env.PORT ?? 3000,
  jwtSecret: process.env.JWT_SECRET ?? 'uhiuafidsu'
}
