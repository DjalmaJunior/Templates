/* eslint-disable @typescript-eslint/no-var-requires */
import config from '../../../server/config'
import { QueryTypes, Sequelize } from "sequelize";
import { MissingParamError } from '../../../server/validators/errors';
import fs from 'fs';
import fastGlob from 'fast-glob'
import path from 'path'

export default class Postgresql {
  private static connection: Sequelize;

  constructor(){
    if (!Postgresql.connection) {
      Postgresql.getConnection()
      .then((connection) => {
        Postgresql.initModels(connection)
      });
    }
  }

  private static initModels(connection: Sequelize) {
    const cwd = path.join(__dirname, "models");
    const files = fastGlob.sync('**/*.+(ts|js)', {
      cwd,
    });
    
    for (const file of files) {    
      const pathName = path.join(cwd, file);
    
      const { default: Model } = require(pathName)

      new Model(connection)
    }
  }

  public static async getConnection() {
    const required = [
      'POSTGRES_DB',
      'POSTGRES_HOST',
      'POSTGRES_USER',
      'POSTGRES_PASSWORD',
      'POSTGRES_PORT',
    ] as (keyof typeof config)[];

    for (const field of required) {
      if (!config[field]) throw new MissingParamError(field);
    }

    if (!Postgresql.connection) {
      try {
        const sequelize = new Sequelize({
          dialect: 'postgres',
          database: config.POSTGRES_DB,
          host: config.POSTGRES_HOST,
          username: config.POSTGRES_USER,
          password: config.POSTGRES_PASSWORD,
          port: Number(config.POSTGRES_PORT),
          dialectOptions: {
            application_name: config.APPLICATION_NAME || 'api'
          }
        });
  
        await sequelize.authenticate()

        Postgresql.connection = sequelize;
  
        const response = await sequelize.query<{ exists: boolean }>(`
        SELECT 
          TRUE AS exists
        FROM information_schema."tables" AS info_db
        WHERE info_db.table_schema = 'system'
        LIMIT 1;
        `, {
          type: QueryTypes.SELECT,
          raw: true,
          plain: true
        })
  
        if (!response?.exists) {
          const initDbQuery = fs.readFileSync(__dirname + '/init-db.sql')
    
          await sequelize.query(`${initDbQuery.toString()}`)
        }
  
        console.log('(PostgreSQL) Connection has been established successfully.')
      } catch (err) {
        console.error('\n\n\nFailed to authenticate POSTGRESQL connection!\n\n\n')
        throw err
      }
    }

    return Postgresql.connection
  }
}
