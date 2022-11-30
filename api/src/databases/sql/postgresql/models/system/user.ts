import SEQUELIZE, { Model, ModelStatic, Sequelize } from "sequelize";
import { MissingParamError } from "../../../../../server/validators/errors";

export default class User {
  private static connection: Sequelize;
  private static model: ModelStatic<UserModel>;

  constructor(connection: Sequelize) {
    if (!User.connection) {
      User.connection = connection;
    }
  }

  private static defineModel() {
    const model = User.connection.define<UserModel>('User', {
      id: {
        type: SEQUELIZE.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: SEQUELIZE.STRING,
        allowNull: false
      },
      email: {
        type: SEQUELIZE.STRING,
        allowNull: false
      },
      password: {
        type: SEQUELIZE.STRING,
        allowNull: false
      },
      created_at: {
        type: SEQUELIZE.DATE,
        defaultValue: SEQUELIZE.NOW
      },
      updated_at: {
        type: SEQUELIZE.DATE
      }
    }, {
      timestamps: false,
      tableName: 'user',
      schema: 'system'
    })

    return model
  }

  static getModel() {
    if (!User.connection) throw new MissingParamError('User model connection');

    if (!User.model) {
      const model = User.defineModel()

      User.model = model
    }

    return User.model
  }
}

type UserModel = Model<IUser, ICreateUser>;

export interface ICreateUser {
  name: string;
  email: string;
  password: string;
}

export interface IUser extends ICreateUser {
  id: number;
  created_at: Date;
  updated_at: Date;
}
