import bcrypt from 'bcrypt';
import { IEncrypter } from "./bcrypt"

export class BcryptAdapter implements IEncrypter {
  private readonly salt: number

  constructor (salt: number) {
    this.salt = salt
  }

  async encrypt (value: string): Promise<string> {
    const hash = await bcrypt.hash(value, this.salt)

    return hash
  }

  async verify (value: string, hash: string): Promise<boolean> {
    const result = await bcrypt.compare(value, hash)

    return result
  }
}
