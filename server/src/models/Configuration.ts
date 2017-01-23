import { string, object, number, ObjectSchema } from 'joi'

/**
 * configuration interface for the application
 */
export interface IConfiguration {
  PORT?: number
  JWT_ISSUER: string
  JWT_AUDIENCE: string
  JWT_SECRET: string
}

/**
 * configuration model for the application
 */
export const Configuration: ObjectSchema = object().keys({
  PORT: number(),
  JWT_ISSUER: string().required(),
  JWT_AUDIENCE: string().required(),
  JWT_SECRET: string().required()
})
