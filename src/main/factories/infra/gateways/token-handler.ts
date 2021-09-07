import { JWTTokenHandler } from '@/infra/gateways'
import { env } from '@/main/config/env'

export const makeJWTTokenHandler = (): JWTTokenHandler => {
  return new JWTTokenHandler(env.jwtSecret)
}
