
import User from "../../../databases/sql/postgresql/models/system/user";
import { BcryptAdapter } from "../../../services/cryptography/bcrypt-adapter";
import { IParamsServiceRegisterUser, IParamsVerifyEmail } from "./register";

export default class RegisterService {
  static async registerUser (params: IParamsServiceRegisterUser) {
    const encrypter = new BcryptAdapter(12);
    const hashedPassword = await encrypter.encrypt(params.password);

    const UserModel = User.getModel();
    const data = { 
      name: params.name,
      email: params.email,
      password: hashedPassword
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userData } = (await UserModel.create(data)).get();

    return userData;
  }

  static async verifyEmail (params: IParamsVerifyEmail) {
    const UserModel = User.getModel();

    const emailExists = (await UserModel.findOne({
      attributes: ['id'],
      where: {
        email: params.email
      }
    }))?.get()

    return !!emailExists?.id;
  }
}
