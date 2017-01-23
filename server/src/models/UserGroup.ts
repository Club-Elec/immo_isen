import * as Sequelize from 'sequelize'
import { connection } from './connection'

/**
 * define user group model
 */
export const UserGroup = connection.define('user_group', {
  mail: {
    type: Sequelize.STRING,
    primaryKey: true
  },

  gid: {
    type: Sequelize.INTEGER,
    primaryKey: true
  }
}, {
  freezeTableName: true,
  createdAt: 'createdat',
  updatedAt: 'updatedat'
})
