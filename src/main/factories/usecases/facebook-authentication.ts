import { FacebookAuthenticationUsecase } from '@/domain/usecases'
import { makeFacebookAPI } from '@/main/factories/apis'
import { makeJWTTokenGenerator } from '@/main/factories/crypto'
import { makePgUserAccountRepo } from '@/main/factories/repos'

export const makeFacebookAuthentication = (): FacebookAuthenticationUsecase => {
  return new FacebookAuthenticationUsecase(makeFacebookAPI(), makePgUserAccountRepo(), makeJWTTokenGenerator())
}
