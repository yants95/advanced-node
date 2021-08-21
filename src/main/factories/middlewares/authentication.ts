import { AutenticationMiddleware } from '@/application/middlewares'
import { makeJWTTokenHandler } from '@/main/factories/gateways'

export const makeAuthenticationMiddleware = (): AutenticationMiddleware => {
  const jwt = makeJWTTokenHandler()
  return new AutenticationMiddleware(jwt.validate.bind(jwt))
}
