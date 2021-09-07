import { FacebookAPI } from '@/infra/gateways'
import { env } from '@/main/config/env'
import { makeAxiosHttpClient } from '@/main/factories/infra/gateways'

export const makeFacebookAPI = (): FacebookAPI => {
  return new FacebookAPI(makeAxiosHttpClient(), env.facebookAPI.clientId, env.facebookAPI.clientSecret)
}
