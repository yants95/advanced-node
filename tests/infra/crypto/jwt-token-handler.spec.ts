import { JWTTokenHandler } from '@/infra/crypto'

import jwt from 'jsonwebtoken'

jest.mock('jsonwebtoken')

describe('JWTTokenHandler', () => {
  let sut: JWTTokenHandler
  let fakeJWT: jest.Mocked<typeof jwt>
  let secret: string

  beforeAll(() => {
    secret = 'any_secret'
    fakeJWT = jwt as jest.Mocked<typeof jwt>
  })

  beforeEach(() => {
    sut = new JWTTokenHandler(secret)
  })

  describe('generate', () => {
    let key: string
    let token: string
    let expirationInMs: number

    beforeAll(() => {
      key = 'any_key'
      expirationInMs = 1000
      token = 'any_token'
      fakeJWT.sign.mockImplementation(() => token)
    })

    it('should call sign with correct params', async () => {
      await sut.generate({ key, expirationInMs })

      expect(fakeJWT.sign).toHaveBeenCalledWith({ key }, secret, { expiresIn: 1 })
      expect(fakeJWT.sign).toHaveBeenCalledTimes(1)
    })

    it('should return token', async () => {
      const generatedToken = await sut.generate({ key, expirationInMs })

      expect(generatedToken).toBe(token)
    })

    it('should rethrow if sign throws', async () => {
      fakeJWT.sign.mockImplementationOnce(() => { throw new Error('token_error') })

      const promise = sut.generate({ key, expirationInMs })

      await expect(promise).rejects.toThrow(new Error('token_error'))
    })
  })

  describe('validate', () => {
    let token: string
    let key: string

    beforeAll(() => {
      key = 'any_key'
      token = 'any_token'
      fakeJWT.verify.mockImplementation(() => ({ key }))
    })
    it('should call sign with correct params', async () => {
      await sut.validate({ token })

      expect(fakeJWT.verify).toHaveBeenCalledWith(token, secret)
      expect(fakeJWT.verify).toHaveBeenCalledTimes(1)
    })

    it('should return the key used to sign', async () => {
      const generatedKey = await sut.validate({ token })

      expect(generatedKey).toBe(key)
    })

    it('should rethrow if verify throws', async () => {
      fakeJWT.verify.mockImplementationOnce(() => { throw new Error('key_error') })

      const promise = sut.validate({ token })

      await expect(promise).rejects.toThrow(new Error('key_error'))
    })

    it('should throw if verify returns null', async () => {
      fakeJWT.verify.mockImplementationOnce(() => null)

      const promise = sut.validate({ token })

      await expect(promise).rejects.toThrow()
    })
  })
})
