import { UserProfile } from '@/domain/entities'

describe('UserProfile', () => {
  let sut: UserProfile

  beforeEach(() => {
    sut = new UserProfile('any_id')
  })
  it('should create with empty initials when pictureUrl is provided', async () => {
    sut.setPicture({ pictureUrl: 'any_url', name: 'any_name' })

    expect(sut).toEqual({
      id: 'any_id',
      pictureUrl: 'any_url',
      initials: undefined
    })
  })

  it('should create with empty initials when name is not provided', async () => {
    sut.setPicture({ pictureUrl: 'any_url' })

    expect(sut).toEqual({
      id: 'any_id',
      pictureUrl: 'any_url',
      initials: undefined
    })
  })

  it('should create initials with first letter of first and last names', async () => {
    sut.setPicture({ name: 'yan da silva soares' })

    expect(sut).toEqual({
      id: 'any_id',
      pictureUrl: undefined,
      initials: 'YS'
    })
  })

  it('should create initials with first two letters of first name', async () => {
    sut.setPicture({ name: 'yan' })

    expect(sut).toEqual({
      id: 'any_id',
      pictureUrl: undefined,
      initials: 'YA'
    })
  })

  it('should create initials with first letter', async () => {
    sut.setPicture({ name: 'y' })

    expect(sut).toEqual({
      id: 'any_id',
      pictureUrl: undefined,
      initials: 'Y'
    })
  })

  it('should create with empty initials when name and pictureUrl are not provided', async () => {
    sut.setPicture({})

    expect(sut).toEqual({
      id: 'any_id',
      pictureUrl: undefined,
      initials: undefined
    })
  })

  it('should create with empty initials when name and pictureUrl are not provided', async () => {
    sut.setPicture({ name: '' })

    expect(sut).toEqual({
      id: 'any_id',
      pictureUrl: undefined,
      initials: undefined
    })
  })
})
