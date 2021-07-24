import { LoadFacebookUserAPI } from '@/data/contracts/apis'
import { FacebookAuthenticationService } from '@/data/services'
import { AuthenticationError } from '@/domain/errors'

import { mock, MockProxy } from 'jest-mock-extended'

describe('FacebookAuthenticationService', () => {
  let loadFacebookUserAPI: MockProxy<LoadFacebookUserAPI>
  let sut: FacebookAuthenticationService

  beforeEach(() => {
    loadFacebookUserAPI = mock()
    sut = new FacebookAuthenticationService(loadFacebookUserAPI)
  })

  it('should call LoadFacebookUserAPI with correct params', async () => {
    await sut.perform({ token: 'any_token' })

    expect(loadFacebookUserAPI.loadUser).toHaveBeenCalledWith({ token: 'any_token' })
    expect(loadFacebookUserAPI.loadUser).toHaveBeenCalledTimes(1)
  })

  it('should return AuthenticationError when LoadFacebookUserAPI returns undefined', async () => {
    loadFacebookUserAPI.loadUser.mockResolvedValueOnce(undefined)
    const authResult = await sut.perform({ token: 'any_token' })

    expect(authResult).toEqual(new AuthenticationError())
  })
})
