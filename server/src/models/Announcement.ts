import * as Sequelize from 'sequelize'
import { connection } from './connection'

/**
 * define user model
 */
export const Announcement = connection.define('announcement', {
  aid: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },

  mail: Sequelize.STRING,
  title: Sequelize.STRING,
  description: Sequelize.STRING,
  address: Sequelize.STRING,
  image: Sequelize.STRING
}, {
  freezeTableName: true,
  createdAt: 'createdat',
  updatedAt: 'updatedat'
})
