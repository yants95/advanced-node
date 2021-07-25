import { TokenGenerator } from '@/data/contracts/crypto'

import jwt from 'jsonwebtoken'

jest.mock('jsonwebtoken')

class JWTTokenGenerator {
  constructor (private readonly secret: string) {}

  async generateToken (params: TokenGenerator.Params): Promise<void> {
    const expirationInSeconds = params.expirationInMs / 1000
    jwt.sign({ key: params.key }, this.secret, { expiresIn: expirationInSeconds })
  }
}

describe('JWT TokenGenerator', () => {
  it('should call sign with correct params', async () => {
    const fakeJWT = jwt as jest.Mocked<typeof jwt>
    const sut = new JWTTokenGenerator('any_secret')

    await sut.generateToken({ key: 'any_key', expirationInMs: 1000 })

    expect(fakeJWT.sign).toHaveBeenCalledWith({ key: 'any_key' }, 'any_secret', { expiresIn: 1 })
  })
})
