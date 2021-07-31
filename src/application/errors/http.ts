export class ServerError extends Error {
  constructor (error?: Error) {
    super('Server failed')
    this.name = 'Server Error'
    this.stack = error?.stack
  }
}
