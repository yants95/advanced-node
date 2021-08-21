import { LoadFacebookUser, TokenGenerator } from '@/domain/contracts/gateways'
import { LoadUserAccount, SaveFacebookAccount } from '@/domain/contracts/repos'
import { AuthenticationError } from '@/domain/entities/errors'
import { AccessToken, FacebookAccount } from '@/domain/entities'

type Input = { token: string }
type Output = { accessToken: string }

type Setup = (facebook: LoadFacebookUser, userAccountRepo: LoadUserAccount & SaveFacebookAccount, token: TokenGenerator) => FacebookAuthentication
export type FacebookAuthentication = (params: Input) => Promise<Output>

export const setupFacebookAuthentication: Setup = (facebook, userAccountRepo, token): FacebookAuthentication => {
  return async params => {
    const fbData = await facebook.loadUser(params)

    if (fbData !== undefined) {
      const accountData = await userAccountRepo.load({ email: fbData.email })
      const fbAccount = new FacebookAccount(fbData, accountData)
      const { id } = await userAccountRepo.saveWithFacebook(fbAccount)
      const accessToken = await token.generate({ key: id, expirationInMs: AccessToken.expirationInMs })
      return { accessToken }
    }

    throw new AuthenticationError()
  }
}
