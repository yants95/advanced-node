import { ForbiddenError } from '@/application/errors'
import { app } from '@/main/config/app'
import { auth } from '@/main/middlewares'

import request from 'supertest'

describe('Authentication Middleware', () => {
  it('should return 403 if authorization header was not provied', async () => {
    app.get('/fake-route', auth)

    const { status, body } = await request(app).get('/fake-route')

    expect(status).toBe(403)
    expect(body.error).toBe(new ForbiddenError().message)
  })
})
