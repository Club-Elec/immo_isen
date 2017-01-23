import * as Sequelize from 'sequelize'
import { connection } from './connection'
import { genSalt, hash as genHash} from 'bcrypt'

/**
 * interface ICrypt
 */
export interface ICrypt {
  salt: string
  hash: string
}

/**
 * generate hash
 */
export async function generateHash(password: string, salt?: string): Promise<ICrypt> {
  if (salt == null) {
    salt = await genSalt(Math.random() % 1024)
  }

  let hash: string = await genHash(password, salt)

  return {
    salt,
    hash
  }
}

/**
 * define user model
 */
export const User = connection.define('user', {
  mail: {
    type: Sequelize.STRING,
    primaryKey: true
  },

  firstname: Sequelize.STRING,
  lastname: Sequelize.STRING,
  phone: Sequelize.STRING,
  salt: Sequelize.STRING,
  hash: Sequelize.STRING
}, {
  freezeTableName: true,
  createdAt: 'createdat',
  updatedAt: 'updatedat'
})
