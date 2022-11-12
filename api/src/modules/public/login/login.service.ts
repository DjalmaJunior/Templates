import { IParamsServiceGetUserLogin } from "./login";

export default class LoginService {
  static getUserLogin (params: IParamsServiceGetUserLogin) {
    const db = [
      {
        id: 1,
        name: 'Fulano1',
        email: 'fulano1@email.com',
        password: '123'
      },
      {
        id: 2,
        name: 'Fulano2',
        email: 'fulano2@email.com',
        password: '123'
      }
    ]

    const user = db.find((data) => [data.name, data.email].includes(params.login))

    return user;
  }
}
