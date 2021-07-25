import { TokenGenerator } from '@/data/contracts/crypto'

import jwt from 'jsonwebtoken'

jest.mock('jsonwebtoken')

class JWTTokenGenerator {
  constructor (private readonly secret: string) {}

  async generateToken (params: TokenGenerator.Params): Promise<TokenGenerator.Result> {
    const expirationInSeconds = params.expirationInMs / 1000
    return jwt.sign({ key: params.key }, this.secret, { expiresIn: expirationInSeconds })
  }
}

describe('JWT TokenGenerator', () => {
  let sut: JWTTokenGenerator
  let fakeJWT: jest.Mocked<typeof jwt>

  beforeAll(() => {
    fakeJWT = jwt as jest.Mocked<typeof jwt>
    fakeJWT.sign.mockImplementation(() => 'any_token')
  })

  beforeEach(() => {
    sut = new JWTTokenGenerator('any_secret')
  })

  it('should call sign with correct params', async () => {
    await sut.generateToken({ key: 'any_key', expirationInMs: 1000 })

    expect(fakeJWT.sign).toHaveBeenCalledWith({ key: 'any_key' }, 'any_secret', { expiresIn: 1 })
  })

  it('should call sign with correct params', async () => {
    const token = await sut.generateToken({ key: 'any_key', expirationInMs: 1000 })

    expect(token).toBe('any_token')
  })

  it('should rethrow if sign throws', async () => {
    fakeJWT.sign.mockImplementationOnce(() => { throw new Error('token_error') })

    const promise = sut.generateToken({ key: 'any_key', expirationInMs: 1000 })

    await expect(promise).rejects.toThrow(new Error('token_error'))
  })
})
