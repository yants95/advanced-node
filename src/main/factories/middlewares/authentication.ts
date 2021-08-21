import { AutenticationMiddleware } from '@/application/middlewares'
import { setupAuthorize } from '@/domain/usecases'
import { makeJWTTokenHandler } from '@/main/factories/crypto'

export const makeAuthenticationMiddleware = (): AutenticationMiddleware => {
  const authorize = setupAuthorize(makeJWTTokenHandler())
  return new AutenticationMiddleware(authorize)
}
