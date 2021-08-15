import { LoadFacebookUserAPI } from '@/domain/contracts/apis'
import { TokenGenerator } from '@/domain/contracts/crypto'
import { LoadUserAccountRepository, SaveFacebookAccountRepository } from '@/domain/contracts/repos'
import { AuthenticationError } from '@/domain/entities/errors'
import { AccessToken, FacebookAccount } from '@/domain/entities'

type Input = { token: string }
type Output = { accessToken: string }

type Setup = (facebookAPI: LoadFacebookUserAPI, userAccountRepo: LoadUserAccountRepository & SaveFacebookAccountRepository, crypto: TokenGenerator) => FacebookAuthentication
export type FacebookAuthentication = (params: Input) => Promise<Output>

export const setupFacebookAuthentication: Setup = (facebookAPI, userAccountRepo, crypto): FacebookAuthentication => {
  return async params => {
    const fbData = await facebookAPI.loadUser(params)

    if (fbData !== undefined) {
      const accountData = await userAccountRepo.load({ email: fbData.email })
      const fbAccount = new FacebookAccount(fbData, accountData)
      const { id } = await userAccountRepo.saveWithFacebook(fbAccount)
      const accessToken = await crypto.generateToken({ key: id, expirationInMs: AccessToken.expirationInMs })
      return { accessToken }
    }

    throw new AuthenticationError()
  }
}