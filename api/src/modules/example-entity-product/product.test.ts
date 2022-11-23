import ProductController from "./product.controller";
import ProductService from "./product.service";
import request from 'supertest';
import App from "../../server/app";
import LoginController from "../public/login/login.controller";

describe('Ensure correct return from product controller', () => {
  it('returns default message without query param', (done) => {
    const defaultMessage = 'Default message:';

    expect(ProductController.test()?.data?.includes?.(defaultMessage)).toBe(true);

    done();
  });

  it('returns custom message with query param', (done) => {
    const defaultMessage = 'Custom message:';

    expect(ProductController.test({ message: 'test' })?.data?.includes?.(defaultMessage)).toBe(true);

    done();
  });

  it('should use message param in return data after custom message template', (done) => {
    const defaultMessage = 'Custom message:';
    const message = 'testMessage';

    function verifyMessageIntegrity () {
      const { data } = ProductController.test({ message });

      const [firstWord, secondWord] = data.split(':').map((word) => word.trim());

      return `${firstWord}:` === defaultMessage && secondWord === message;
    }

    expect(verifyMessageIntegrity()).toBe(true);

    done();
  });
});

describe('Ensure correct return from product service', () => {
  it('should return string from hello method with or without message param', (done) => {
    const message = 'testMessage';

    const firstReturn = ProductService.hello();

    const secondReturn = ProductService.hello({ message });

    const verify = () => typeof firstReturn === 'string' && typeof secondReturn === 'string';

    expect(verify()).toBe(true);

    done();
  })
});

describe('Product Router', () => {
  const auth = {
    token: ''
  }

  const makeLogin = async () => {
    const { token } = await LoginController.login({ login: 'Fulano1', password: '123' })

    auth.token = token as string;
  }

  it('should receive GET 200 with supertest', (done) => {
    makeLogin().then(() => {
      request(App.getApp())
        .get('/api/example-entity-product')
        .set('Authorization', 'Bearer ' + auth.token)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) return done(err);

          expect(typeof res.body.data === 'string').toBe(true);

          done();
        });
    })
  })
})
