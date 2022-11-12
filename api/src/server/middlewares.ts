import { Express } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import { default as routes } from './routes'
import expressValidator from './middlewares/expressValidator'
import { verifyToken } from '../services/auth/middlewares'

export default (app: Express): void => {
  app.use(cors());

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(verifyToken);

  app.use(routes);

  app.use(expressValidator);
}
