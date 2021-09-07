import { ChangeProfilePicture, setupChangeProfilePicture } from '@/domain/usecases'
import { makeUniqueIDHandler } from '@/main/factories/infra/gateways'
import { makeFileStorage } from '@/main/factories/infra/gateways/file-storage'
import { makePgUserProfileRepo } from '@/main/factories/infra/repos'

export const makeChangeProfilePicture = (): ChangeProfilePicture => {
  return setupChangeProfilePicture(makeFileStorage(), makeUniqueIDHandler(), makePgUserProfileRepo())
}
