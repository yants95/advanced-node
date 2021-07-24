import { LoadFacebookUserAPI } from '@/data/contracts/apis'
import { LoadUserAccountRepository } from '@/data/contracts/repos'
import { AuthenticationError } from '@/domain/errors'
import { FacebookAuthentication } from '@/domain/features'

export class FacebookAuthenticationService {
  constructor (
    private readonly LoadFacebookUserAPI: LoadFacebookUserAPI,
    private readonly loadUserAccountRepository: LoadUserAccountRepository
  ) {}

  async perform (params: FacebookAuthentication.Params): Promise<AuthenticationError> {
    const fbData = await this.LoadFacebookUserAPI.loadUser(params)

    if (fbData !== undefined) {
      await this.loadUserAccountRepository.load({ email: fbData.email })
    }

    return new AuthenticationError()
  }
}
