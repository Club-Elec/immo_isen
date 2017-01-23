import * as Sequelize from 'sequelize'
import { connection } from './connection'

/**
 * define enum EGroup
 */
export const enum EGroup {
  USER = 1,
  ADMIN = 2
}

/**
 * define user model
 */
export const Group = connection.define('group', {
  gid: {
    type: Sequelize.INTEGER,
    primaryKey: true
  }
}, {
  freezeTableName: true,
  createdAt: 'createdat',
  updatedAt: 'updatedat'
})
