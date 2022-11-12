import { BadRequestError } from "../../../server/validators/errors";
import { IParamsControllerRegisterUser } from "./register";
import RegisterService from "./register.service";

export default class RegisterController {
  static async registerUser (params: IParamsControllerRegisterUser) {
    if (!params?.name) throw new BadRequestError('Name is required!');
    if (!params?.email) throw new BadRequestError('Email is required!');
    if (!params?.password) throw new BadRequestError('Password is required!');

    return await RegisterService.registerUser(params);
  }
}
