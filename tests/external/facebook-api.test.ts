import { FacebookAPI } from '@/infra/apis'
import { AxiosHttpClient } from '@/infra/http'
import { env } from '@/main/config/env'

describe('FacebookAPI Integration Tests', () => {
  let axiosClient: AxiosHttpClient
  let sut: FacebookAPI

  beforeEach(() => {
    axiosClient = new AxiosHttpClient()
    sut = new FacebookAPI(
      axiosClient,
      env.facebookAPI.clientId,
      env.facebookAPI.clientSecret
    )
  })

  it('should return Facebook User if token is valid', async () => {
    const fbUser = await sut.loadUser({ token: 'EAAFDZBbvzzfoBAMxUaFQImj73T47CY0H8BboX0IyOxZAhcNzhrWp4tZBZAVs9mvSK0Q5lcZCO6EwHKIYcZBemOGphuZBckeMjzmlZA001LLRltTGKZCgT6Klh8awnfDCYTXQOHWQwdKeTh3NpbFL1cqcf5lXGckyL6QfpQWsiX7pCcIvHj1bAJKUydPKIEQxkrgEtsqLHE8wCdQZDZD' })

    expect(fbUser).toEqual({
      facebookId: '109072361379593',
      email: 'open_txiqjrx_user@tfbnw.net',
      name: 'Yan Teste'
    })
  })

  it('should return undefined if token is invalid', async () => {
    const axiosClient = new AxiosHttpClient()
    const sut = new FacebookAPI(
      axiosClient,
      env.facebookAPI.clientId,
      env.facebookAPI.clientSecret
    )

    const fbUser = await sut.loadUser({ token: 'invalid_token' })

    expect(fbUser).toBeUndefined()
  })
})
