import { LoadFacebookUserAPI } from '@/data/contracts/apis'
import { FacebookAuthenticationService } from '@/data/services'
import { AuthenticationError } from '@/domain/errors'

import { mock } from 'jest-mock-extended'

describe('FacebookAuthenticationService', () => {
  it('should call LoadFacebookUserAPI with correct params', async () => {
    const loadFacebookUserAPI = mock<LoadFacebookUserAPI>()
    const sut = new FacebookAuthenticationService(loadFacebookUserAPI)

    await sut.perform({ token: 'any_token' })

    expect(loadFacebookUserAPI.loadUser).toHaveBeenCalledWith({ token: 'any_token' })
    expect(loadFacebookUserAPI.loadUser).toHaveBeenCalledTimes(1)
  })

  it('should return AuthenticationError when LoadFacebookUserAPI returns undefined', async () => {
    const loadFacebookUserAPI = mock<LoadFacebookUserAPI>()
    loadFacebookUserAPI.loadUser.mockResolvedValueOnce(undefined)

    const sut = new FacebookAuthenticationService(loadFacebookUserAPI)

    const authResult = await sut.perform({ token: 'any_token' })

    expect(authResult).toEqual(new AuthenticationError())
  })
})
