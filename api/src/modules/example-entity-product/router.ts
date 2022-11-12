import { Request, Router } from 'express';
import { IParamsControllerTest } from './product';
import ProductController from './product.controller';

const router = Router();

router.get('/', (req: Request<{}, {}, {}, IParamsControllerTest>, res) => {
  const data = ProductController.test(req.query);

  res.send(data);
});

export default router;
