import { LoadFacebookUserAPI } from '@/data/contracts/apis'
import { mock } from 'jest-mock-extended'

class FacebookAPI {
  private readonly baseUrl = 'https://graph.facebook.com'

  constructor (private readonly httpGetClient: HttpGetClient) {}

  async loadUser (params: LoadFacebookUserAPI.Params): Promise<void> {
    await this.httpGetClient.get({ url: `${this.baseUrl}/oauth/access_token` })
  }
}

interface HttpGetClient {
  get: (params: HttpGetClient.Params) => Promise<void>
}

namespace HttpGetClient {
  export type Params = {
    url: string
  }
}

describe('FacebookAPI', () => {
  it('should get app token', async () => {
    const httpClient = mock<HttpGetClient>()
    const sut = new FacebookAPI(httpClient)

    await sut.loadUser({ token: 'any_client_token' })

    expect(httpClient.get).toHaveBeenCalledWith({
      url: 'https://graph.facebook.com/oauth/access_token'
    })
  })
})
