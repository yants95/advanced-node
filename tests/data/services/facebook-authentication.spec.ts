import { LoadFacebookUserAPI } from '@/data/contracts/apis'
import { AuthenticationError } from '@/domain/errors'
import { FacebookAuthentication } from '@/domain/features'

class FacebookAuthenticationService {
  constructor (private readonly LoadFacebookUserAPI: LoadFacebookUserAPI) {}

  async perform (params: FacebookAuthentication.Params): Promise<AuthenticationError> {
    await this.LoadFacebookUserAPI.loadUser(params)
    return new AuthenticationError()
  }
}
class LoadFacebookUserAPISpy implements LoadFacebookUserAPI {
  token?: string
  result = undefined

  async loadUser (params: LoadFacebookUserAPI.Params): Promise<LoadFacebookUserAPI.Result> {
    this.token = params.token
    return this.result
  }
}

describe('FacebookAuthenticationService', () => {
  it('should call LoadFacebookUserAPI with correct params', async () => {
    const loadFacebookUserAPI = new LoadFacebookUserAPISpy()
    const sut = new FacebookAuthenticationService(loadFacebookUserAPI)

    await sut.perform({ token: 'any_token' })

    expect(loadFacebookUserAPI.token).toBe('any_token')
  })

  it('should return AuthenticationError when LoadFacebookUserAPI returns undefined', async () => {
    const loadFacebookUserAPI = new LoadFacebookUserAPISpy()
    loadFacebookUserAPI.result = undefined

    const sut = new FacebookAuthenticationService(loadFacebookUserAPI)

    const authResult = await sut.perform({ token: 'any_token' })

    expect(authResult).toEqual(new AuthenticationError())
  })
})
