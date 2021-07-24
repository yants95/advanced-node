import { LoadFacebookUserAPI } from '@/data/contracts/apis'
import { FacebookAuthenticationService } from '@/data/services'
import { AuthenticationError } from '@/domain/errors'

class LoadFacebookUserAPISpy implements LoadFacebookUserAPI {
  token?: string
  callsCount = 0
  result = undefined

  async loadUser (params: LoadFacebookUserAPI.Params): Promise<LoadFacebookUserAPI.Result> {
    this.token = params.token
    this.callsCount++

    return this.result
  }
}

describe('FacebookAuthenticationService', () => {
  it('should call LoadFacebookUserAPI with correct params', async () => {
    const loadFacebookUserAPI = new LoadFacebookUserAPISpy()
    const sut = new FacebookAuthenticationService(loadFacebookUserAPI)

    await sut.perform({ token: 'any_token' })

    expect(loadFacebookUserAPI.token).toBe('any_token')
    expect(loadFacebookUserAPI.callsCount).toBe(1)
  })

  it('should return AuthenticationError when LoadFacebookUserAPI returns undefined', async () => {
    const loadFacebookUserAPI = new LoadFacebookUserAPISpy()
    loadFacebookUserAPI.result = undefined

    const sut = new FacebookAuthenticationService(loadFacebookUserAPI)

    const authResult = await sut.perform({ token: 'any_token' })

    expect(authResult).toEqual(new AuthenticationError())
  })
})
