/* eslint-disable @typescript-eslint/no-var-requires */
import { Router } from 'express'
import fastGlob from 'fast-glob'
import path from 'path'
import { protectRoute } from '../../services/auth/middlewares';

const MainRouter = Router();
const protectedRouter = Router();
const publicRouter = Router();

const files = fastGlob.sync('**/router.+(ts|js)', {
  cwd: path.join(__dirname, "..", "..", "modules"),
});

for (const file of files) {
  const paths = file.split('/');
  const route = `/${paths.slice(0, -1).join('/')}`;

  if (route === '/') continue;

  const pathName = path.join(__dirname, '..', '..', 'modules', file);

  if (paths[0] === 'public') {
    publicRouter.use(route, require(pathName).default)
  } else {
    protectedRouter.use(route, require(pathName).default)
  }
}

MainRouter.use('/', publicRouter);
MainRouter.use('/api', protectRoute, protectedRouter);

export default MainRouter;
