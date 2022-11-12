import bcrypt from 'bcrypt'
import { BcryptAdapter } from './bcrypt-adapter'

jest.mock('bcrypt', () => ({
  async hash (value: string): Promise<string> {
    return new Promise(resolve => resolve(`${value}_hash`))
  },
  async compare (value: string, hash: string): Promise<boolean> {
    return new Promise(resolve => resolve(`${value}_hash` === hash))
  }
}))

const salt = 12

const makeSut = (): BcryptAdapter => {
  const sut = new BcryptAdapter(salt)

  return sut
}

describe('Bcrypt Adapter', () => {
  it('Should call bcrypt with correct values', async () => {
    const sut = makeSut()

    const value = 'any_value';

    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.encrypt(value)
    expect(hashSpy).toHaveBeenCalledWith(value, salt)
  })

  it('Should return a hash on success', async () => {
    const sut = makeSut()

    const value = 'any_value'

    const hash = await sut.encrypt(value)
    expect(hash).toBe(`${value}_hash`)
  })

  it('Should throw if bcrypt throws', async () => {
    const sut = makeSut()

    const error = new Promise((resolve, reject) => reject(new Error())) as any
    jest.spyOn(bcrypt, 'hash').mockReturnValueOnce(error)

    const promise = sut.encrypt('any_value')
    await expect(promise).rejects.toThrow()
  })

  it('Should return true with the correct comparison result', async () => {
    const sut = makeSut()

    const value = 'any_value';

    const hash = await sut.encrypt(value)

    const result = await sut.verify(value, hash)

    expect(result).toBe(true)
  })

  it('Should return false with the incorrect comparison result', async () => {
    const sut = makeSut()

    const value = 'any_value';
    const hash = await sut.encrypt(value)

    const result = await sut.verify('another_value', hash)
    expect(result).toBe(false)
  })
})
