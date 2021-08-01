import { FacebookAPI } from '@/infra/apis'
import { env } from '@/main/config/env'
import { makeAxiosHttpClient } from '@/main/factories/http'

export const makeFacebookAPI = (): FacebookAPI => {
  return new FacebookAPI(makeAxiosHttpClient(), env.facebookAPI.clientId, env.facebookAPI.clientSecret)
}
