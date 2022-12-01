import { BadRequestError, InvalidParamError, NotFoundError } from "../../../server/validators/errors";
import Authenticator from "../../../services/auth/Authenticator";
import { BcryptAdapter } from "../../../services/cryptography/bcrypt-adapter";
import { IParamsControllerLogin } from "./login";
import LoginService from "./login.service";

export default class LoginController {
  static async login (params: IParamsControllerLogin) {
    if (!params?.login) throw new BadRequestError('Login is required!');
    if (!params?.password) throw new BadRequestError('Password is required!');

    const data = await LoginService.getUserLogin({ login: params.login });

    if (!data?.id) throw new NotFoundError('User');

    const bcryptManager = new BcryptAdapter(12);
    const veriryPass = await bcryptManager.verify(params.password, data.password);

    if (!veriryPass) throw new InvalidParamError('Invalid credentials!');

    const payload = {
      id: data.id,
      name: data.name,
      roles: []
    }

    const auth = new Authenticator()

    const token = await auth.generateToken(payload);

    return { token };
  }
}
