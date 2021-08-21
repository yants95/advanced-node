import { JWTTokenHandler } from '@/infra/crypto'
import { env } from '@/main/config/env'

export const makeJWTTokenHandler = (): JWTTokenHandler => {
  return new JWTTokenHandler(env.jwtSecret)
}
