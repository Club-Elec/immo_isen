import * as Sequelize from 'sequelize'
import { Logger } from '../components/Logger'

const username: string = process.env.POSTGRES_USERNAME || 'postgres'
const password: string = process.env.POSTGRES_PASSWORD || 'postgres'
const database: string = process.env.POSTGRES_DATABASE || 'postgres'
const host: string = process.env.POSTGRES_HOST || '127.0.0.1'

export const connection: Sequelize.Sequelize = new Sequelize(database, username, password, {
  dialect: 'postgres',
  logging: Logger.getLogger().silly
})
