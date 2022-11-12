import { Request, Router } from 'express';
import { IParamsControllerRegisterUser } from './register';
import RegisterController from './register.controller';

const router = Router();

router.post('/', async (req: Request<{}, {}, IParamsControllerRegisterUser, {}>, res) => {
  const data = await RegisterController.registerUser(req.body);

  res.send(data);
});

export default router;
