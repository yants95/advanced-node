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

  describe('generateToken', () => {
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
      await sut.generateToken({ key, expirationInMs })

      expect(fakeJWT.sign).toHaveBeenCalledWith({ key }, secret, { expiresIn: 1 })
      expect(fakeJWT.sign).toHaveBeenCalledTimes(1)
    })

    it('should return token', async () => {
      const generatedToken = await sut.generateToken({ key, expirationInMs })

      expect(generatedToken).toBe(token)
    })

    it('should rethrow if sign throws', async () => {
      fakeJWT.sign.mockImplementationOnce(() => { throw new Error('token_error') })

      const promise = sut.generateToken({ key, expirationInMs })

      await expect(promise).rejects.toThrow(new Error('token_error'))
    })
  })

  describe('validateToken', () => {
    let token: string

    beforeAll(() => {
      token = 'any_token'
      fakeJWT.sign.mockImplementation(() => token)
    })
    it('should call sign with correct params', async () => {
      await sut.validateToken({ token })

      expect(fakeJWT.verify).toHaveBeenCalledWith(token, secret)
      expect(fakeJWT.verify).toHaveBeenCalledTimes(1)
    })
  })
})
