import { JWTTokenGenerator } from '@/infra/crypto'
import { env } from '@/main/config/env'

export const makeJWTTokenGenerator = (): JWTTokenGenerator => {
  return new JWTTokenGenerator(env.jwtSecret)
}
