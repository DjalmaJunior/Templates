import { ITokenPayload } from "../services/auth/authenticator";

declare global {
  namespace Express {
    interface Request {
      decoded?: ITokenPayload;
    }
  }

  type EmptyObject = Record<string, never>;

  type AnyObject = Record<string, unknown>;

  type AnyValue = unknown;

  type QueryRequest<T> = Request<EmptyObject, EmptyObject, EmptyObject, T>;

  type BodyRequest<T> = Request<EmptyObject, EmptyObject, T, EmptyObject>;
}
