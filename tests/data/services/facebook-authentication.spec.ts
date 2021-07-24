import { FacebookAuthenticationService } from '@/data/services'
import { AuthenticationError } from '@/domain/errors'

describe('FacebookAuthenticationService', () => {
  it('should call LoadFacebookUserAPI with correct params', async () => {
    const loadFacebookUserAPI = {
      loadUser: jest.fn()
    }
    const sut = new FacebookAuthenticationService(loadFacebookUserAPI)

    await sut.perform({ token: 'any_token' })

    expect(loadFacebookUserAPI.loadUser).toHaveBeenCalledWith({ token: 'any_token' })
    expect(loadFacebookUserAPI.loadUser).toHaveBeenCalledTimes(1)
  })

  it('should return AuthenticationError when LoadFacebookUserAPI returns undefined', async () => {
    const loadFacebookUserAPI = {
      loadUser: jest.fn()
    }
    loadFacebookUserAPI.loadUser.mockResolvedValueOnce(undefined)

    const sut = new FacebookAuthenticationService(loadFacebookUserAPI)

    const authResult = await sut.perform({ token: 'any_token' })

    expect(authResult).toEqual(new AuthenticationError())
  })
})
