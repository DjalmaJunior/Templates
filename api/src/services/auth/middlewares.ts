import { NextFunction, Request, Response } from 'express'
import Authenticator from './Authenticator'

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  const auth = new Authenticator();
  const token = req.headers.authorization && req.headers.authorization.split(" ")[0] === 'Bearer'
    ? req.headers.authorization.split(" ")[1]
    : (req.body.token || req.query.token || req.headers['x-access-token'])

  if (!token) {
    return next()
  }

  try {
    const decodedToken = await auth.verify(token);
    req.decoded = decodedToken;
    next()
  } catch (error) {
    res.status(401).send({
      error: 'Invalid Token!'
    })
  }
}

const protectRoute = (req: Request, res: Response, next: NextFunction) => {
  if (req.decoded) {
    return next()
  }

  res.status(401).send({
    error: 'Unauthorized!'
  })
}

export {
  verifyToken,
  protectRoute,
}
