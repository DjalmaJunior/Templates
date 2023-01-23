import { Express } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import { default as routes } from './routes'
import expressValidator from './middlewares/expressValidator'
import { verifyToken } from '../services/auth/middlewares'
import swaggerUi from 'swagger-ui-express'
import swaggerFile from './swagger-output.json'

export default (app: Express): void => {
  app.use(cors());

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(verifyToken);

  app.use(routes);

  app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

  app.use(expressValidator);
}
