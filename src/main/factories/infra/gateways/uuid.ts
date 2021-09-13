import { UniqueID, UUIDHandler } from '@/infra/gateways'

export const makeUUIDHandler = (): UUIDHandler => {
  return new UUIDHandler()
}

export const makeUniqueIDHandler = (): UniqueID => {
  return new UniqueID()
}
