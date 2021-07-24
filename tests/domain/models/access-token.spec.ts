import { AccessToken } from '@/domain/models'

describe('AccessToken', () => {
  it('shoudl create with value', () => {
    const sut = new AccessToken('any_value')

    expect(sut).toEqual({ value: 'any_value' })
  })
})
