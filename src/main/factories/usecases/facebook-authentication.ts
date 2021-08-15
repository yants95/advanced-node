import { setupFacebookAuthentication, FacebookAuthentication } from '@/domain/usecases'
import { makeFacebookAPI } from '@/main/factories/apis'
import { makeJWTTokenHandler } from '@/main/factories/crypto'
import { makePgUserAccountRepo } from '@/main/factories/repos'

export const makeFacebookAuthentication = (): FacebookAuthentication => {
  return setupFacebookAuthentication(makeFacebookAPI(), makePgUserAccountRepo(), makeJWTTokenHandler())
}
