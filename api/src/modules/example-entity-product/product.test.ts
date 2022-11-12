import ProductController from "./product.controller";
import ProductService from "./product.service";

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
