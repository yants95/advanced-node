import { LoadFacebookUserAPI } from '@/data/contracts/apis'
import { FacebookAuthenticationService } from '@/data/services'
import { AuthenticationError } from '@/domain/errors'

import { mock, MockProxy } from 'jest-mock-extended'

type SutTypes = {
  sut: FacebookAuthenticationService
  loadFacebookUserAPI: MockProxy<LoadFacebookUserAPI>
}

const makeSut = (): SutTypes => {
  const loadFacebookUserAPI = mock<LoadFacebookUserAPI>()
  const sut = new FacebookAuthenticationService(loadFacebookUserAPI)

  return {
    sut,
    loadFacebookUserAPI
  }
}

describe('FacebookAuthenticationService', () => {
  it('should call LoadFacebookUserAPI with correct params', async () => {
    const { sut, loadFacebookUserAPI } = makeSut()

    await sut.perform({ token: 'any_token' })

    expect(loadFacebookUserAPI.loadUser).toHaveBeenCalledWith({ token: 'any_token' })
    expect(loadFacebookUserAPI.loadUser).toHaveBeenCalledTimes(1)
  })

  it('should return AuthenticationError when LoadFacebookUserAPI returns undefined', async () => {
    const { sut, loadFacebookUserAPI } = makeSut()

    loadFacebookUserAPI.loadUser.mockResolvedValueOnce(undefined)
    const authResult = await sut.perform({ token: 'any_token' })

    expect(authResult).toEqual(new AuthenticationError())
  })
})
