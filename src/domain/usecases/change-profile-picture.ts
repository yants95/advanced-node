import { DeleteFile, UploadFile, UUIDGenerator } from '@/domain/contracts/gateways'
import { LoadUserProfile, SaveUserPicture } from '@/domain/contracts/repos'
import { UserProfile } from '@/domain/entities'

type Setup = (fileStorage: UploadFile & DeleteFile, crypto: UUIDGenerator, userProfileRepo: SaveUserPicture & LoadUserProfile) => ChangeProfilePicture
type Input = { id: string, file?: Buffer }
type Output = { pictureUrl?: string, initials?: string }
export type ChangeProfilePicture = (input: Input) => Promise<Output>

export const setupChangeProfilePicture: Setup = (fileStorage, crypto, userProfileRepo) => async ({ id, file }) => {
  const data: { pictureUrl?: string, name?: string } = {}

  if (file !== undefined) {
    data.pictureUrl = await fileStorage.upload({ file, key: crypto.uuid({ key: id }) })
  } else {
    data.name = (await userProfileRepo.load({ id })).name
  }

  const userProfile = new UserProfile(id)
  userProfile.setPicture(data)

  try {
    await userProfileRepo.savePicture(userProfile)
  } catch {
    await fileStorage.delete({ key: id })
  }
  return userProfile
}
