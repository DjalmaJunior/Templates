import { Request, Router } from 'express';
import { IParamsControllerLogin } from './login';
import LoginController from './login.controller';

const router = Router();

router.get('/', async (req: Request<{}, {}, {}, IParamsControllerLogin>, res) => {
  const data = await LoginController.login(req.query);

  res.send(data);
});

export default router;
