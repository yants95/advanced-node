import { FacebookAuthenticationService } from '@/domain/services'
import { makeFacebookAPI } from '@/main/factories/apis'
import { makeJWTTokenGenerator } from '@/main/factories/crypto'
import { makePgUserAccountRepo } from '@/main/factories/repos'

export const makeFacebookAuthenticationService = (): FacebookAuthenticationService => {
  return new FacebookAuthenticationService(makeFacebookAPI(), makePgUserAccountRepo(), makeJWTTokenGenerator())
}
