import jwt, { SignOptions } from 'jsonwebtoken'
import { promisify } from 'util';
import config from '../../server/config';
import { MissingParamError } from '../../server/validators/errors';
import { ITokenPayload } from './authenticator';

export default class Authenticator {
  private authKey: string = config.AUTH_KEY || '';
  private authOptions: SignOptions = {
    expiresIn: '1h',
  };

  async verify (token: string) {
    if (!token) throw new MissingParamError("Authenticator's token");
    if (!this.authKey || !this.authOptions) throw new MissingParamError("Authenticator's key or options");

    const verifyPromise: any = promisify(jwt.verify);

    return verifyPromise(token, this.authKey);
  }

  async generateToken (payload: ITokenPayload) {
    if (!payload) throw new MissingParamError("Authenticator's payload");
    if (!this.authKey || !this.authOptions) throw new MissingParamError("Authenticator's key or options");

    const signPromise: any = promisify(jwt.sign);

    return signPromise(payload, this.authKey, this.authOptions)
  }
}
