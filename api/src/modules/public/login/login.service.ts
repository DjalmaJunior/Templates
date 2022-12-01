import Sequelize from "sequelize";
import User from "../../../databases/sql/postgresql/models/system/user";
import { IParamsServiceGetUserLogin } from "./login";

export default class LoginService {
  static async getUserLogin (params: IParamsServiceGetUserLogin) {
    const UserModel = User.getModel();

    const user = (await UserModel.findOne({
      where: {
        [Sequelize.Op.or]: [
          {
            name: params.login
          },
          {
            email: params.login
          }
        ]
      }
    }))?.get();

    return user;
  }
}
