import { FacebookAPI } from '@/infra/apis'
import { AxiosHttpClient } from '@/infra/http'
import { env } from '@/main/config/env'

describe('FacebookAPI Integration Tests', () => {
  it('should return Facebook User if token is valid', async () => {
    const axiosClient = new AxiosHttpClient()
    const sut = new FacebookAPI(
      axiosClient,
      env.facebookAPI.clientId,
      env.facebookAPI.clientSecret
    )

    const fbUser = await sut.loadUser({ token: 'EAAFDZBbvzzfoBABqCKq5xMs1pScFpfuHZC6Tb5wYYSUJ8FPfmir76rP8hVeIqQBlyZCwZAQer7QUtTgGRmmSxVMesh6OnKjZAkvOEZCGzgjxrXviClT1OXUXFICPZB8ZAjK8h2QrcyuNUGNOh5qUjqFx88tdRKZCnfOlFZArpdeRBhdDxDFrYgJMWOl5OZCeZBWKr2wS3CecGx2ROgZDZD' })

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
