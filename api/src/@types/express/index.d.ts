import { ITokenPayload } from "../services/auth/authenticator";

declare global {
  namespace Express {
    interface Request {
      decoded?: ITokenPayload;
    }
  }
}
