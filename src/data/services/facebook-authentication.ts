import { LoadFacebookUserAPI } from '@/data/contracts/apis'
import { AuthenticationError } from '@/domain/errors'
import { FacebookAuthentication } from '@/domain/features'

export class FacebookAuthenticationService {
  constructor (private readonly LoadFacebookUserAPI: LoadFacebookUserAPI) {}

  async perform (params: FacebookAuthentication.Params): Promise<AuthenticationError> {
    await this.LoadFacebookUserAPI.loadUser(params)
    return new AuthenticationError()
  }
}
