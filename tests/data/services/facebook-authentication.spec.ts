import { LoadFacebookUserAPI } from '@/data/contracts/apis'
import { LoadUserAccountRepository } from '@/data/contracts/repos'
import { FacebookAuthenticationService } from '@/data/services'
import { AuthenticationError } from '@/domain/errors'

import { mock, MockProxy } from 'jest-mock-extended'

describe('FacebookAuthenticationService', () => {
  let loadFacebookUserAPI: MockProxy<LoadFacebookUserAPI>
  let loadUserAccountRepo: MockProxy<LoadUserAccountRepository>
  let sut: FacebookAuthenticationService
  const token = 'any_token'

  beforeEach(() => {
    loadFacebookUserAPI = mock()
    loadFacebookUserAPI.loadUser.mockResolvedValue({
      name: 'any_fb_name',
      email: 'any_fb_email',
      facebookId: 'any_fb_id'
    })
    loadUserAccountRepo = mock()
    sut = new FacebookAuthenticationService(
      loadFacebookUserAPI,
      loadUserAccountRepo
    )
  })

  it('should call LoadFacebookUserAPI with correct params', async () => {
    await sut.perform({ token })

    expect(loadFacebookUserAPI.loadUser).toHaveBeenCalledWith({ token })
    expect(loadFacebookUserAPI.loadUser).toHaveBeenCalledTimes(1)
  })

  it('should return AuthenticationError when LoadFacebookUserAPI returns undefined', async () => {
    loadFacebookUserAPI.loadUser.mockResolvedValueOnce(undefined)

    const authResult = await sut.perform({ token })

    expect(authResult).toEqual(new AuthenticationError())
  })

  it('should call LoadUserAccountRepo when LoadFacebookUserAPI returns data', async () => {
    await sut.perform({ token })

    expect(loadUserAccountRepo.load).toHaveBeenCalledWith({ email: 'any_fb_email' })
    expect(loadUserAccountRepo.load).toHaveBeenCalledTimes(1)
  })
})
