import { FacebookAuthentication } from '@/domain/features'

class FacebookAuthenticationService {
  constructor (private readonly LoadFacebookUserAPI: LoadFacebookUserAPI) {}

  async perform (params: FacebookAuthentication.Params): Promise<void> {
    await this.LoadFacebookUserAPI.loadUser(params)
  }
}

interface LoadFacebookUserAPI {
  loadUser: (params: LoadFacebookUserAPI.Params) => Promise<void>
}

namespace LoadFacebookUserAPI {
  export type Params = {
    token: string
  }
}

class LoadFacebookUserAPISpy implements LoadFacebookUserAPI {
  token?: string

  async loadUser (params: LoadFacebookUserAPI.Params): Promise<void> {
    this.token = params.token
  }
}

describe('FacebookAuthenticationService', () => {
  it('should call LoadFacebookUserAPI with correct params', async () => {
    const loadFacebookUserAPI = new LoadFacebookUserAPISpy()
    const sut = new FacebookAuthenticationService(loadFacebookUserAPI)

    await sut.perform({ token: 'any_token' })

    expect(loadFacebookUserAPI.token).toBe('any_token')
  })
})
