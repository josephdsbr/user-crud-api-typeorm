import { Request, Response, NextFunction } from 'express';
import { Verify } from '../util/TokenUtil';
import { TokenPayloadModel } from '../models/TokenModel';
export default function authMiddleware(
  req: Request, res: Response, next: NextFunction
) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: 'Should inform a bearer authorization token' });
  }

  const userToken = authorization.replace('Bearer', '').trim();

  try {
    const token = Verify({ token: userToken, key: 'flexpag' });
    const { id } = token as TokenPayloadModel;
    req.userId = id;
    return next();
  } catch {
    return res.status(401).jsonp({ error: "JWT Token is not valid or it's not valid" })
  }
}