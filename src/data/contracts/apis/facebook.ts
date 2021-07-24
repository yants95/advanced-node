export interface LoadFacebookUserAPI {
  loadUser: (params: LoadFacebookUserAPI.Params) => Promise<LoadFacebookUserAPI.Result>
}

export namespace LoadFacebookUserAPI {
  export type Params = {
    token: string
  }

  export type Result = undefined
}
