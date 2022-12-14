import { Router } from 'express';
import { IParamsControllerLogin } from './login';
import LoginController from './login.controller';

const router = Router();

router.get('/', async (req: QueryRequest<IParamsControllerLogin>, res) => {
  const data = await LoginController.login(req.query);

  res.setHeader('token', data.token as string);

  res.send(data);
});

export default router;
