import { IParamsControllerTest } from "./product";
import ProductService from "./product.service";

export default class ProductController {
  static test (params?: IParamsControllerTest) {
    const prefix = (params?.message ? 'Custom message:' : 'Default message:');
    const data = `${prefix} ${ProductService.hello(params)}`;

    return { data };
  }
}
