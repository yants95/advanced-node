import { ConnectionOptions } from 'typeorm'

export const config: ConnectionOptions = {
  type: 'postgres',
  host: 'batyr.db.elephantsql.com',
  port: 5432,
  database: 'hbqqysvp',
  username: 'hbqqysvp',
  password: 'jQhJIWRxxOAM7IqtuDZTgz1Leus48QMH',
  entities: ['dist/infra/postgres/entities/index.js']
}
