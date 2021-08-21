import { AutenticationMiddleware } from '@/application/middlewares'
import { makeJWTTokenHandler } from '@/main/factories/crypto'

export const makeAuthenticationMiddleware = (): AutenticationMiddleware => {
  const jwt = makeJWTTokenHandler()
  return new AutenticationMiddleware(jwt.validateToken.bind(jwt))
}
