
import { BcryptAdapter } from "../../../services/cryptography/bcrypt-adapter";
import { IParamsServiceRegisterUser } from "./register";

export default class RegisterService {
  static async registerUser (params: IParamsServiceRegisterUser) {
    const encrypter = new BcryptAdapter(12);
    const hashedPassword = await encrypter.encrypt(params.password);

    const dataToDB = {
      id: 1,
      ...params,
      password: hashedPassword
    }

    return dataToDB;
  }
}
