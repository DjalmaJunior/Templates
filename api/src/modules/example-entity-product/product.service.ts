import { IParamsServiceHello } from "./product";

export default class ProductService {
  static hello (params?: IParamsServiceHello) {
    return params?.message || 'Hello World!';
  }
}
