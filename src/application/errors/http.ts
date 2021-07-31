export class ServerError extends Error {
  constructor (error?: Error) {
    super('Server failed')
    this.name = 'Server Error'
    this.stack = error?.stack
  }
}

export class RequiredFieldError extends Error {
  constructor (fieldName: string) {
    super(`The field ${fieldName} is required`)
    this.name = 'RequiredFieldError'
  }
}
