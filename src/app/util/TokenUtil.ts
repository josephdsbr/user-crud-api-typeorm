import jwt from 'jsonwebtoken';
import { TokenRequestModel, TokenVerifyRequestModel } from '../models/TokenModel';

const Generate = (configuration: TokenRequestModel): string => {
  const { id, expiresIn = '1d', key } = configuration;
  return jwt.sign({ id }, key, { expiresIn });
}

const Verify = (configuration: TokenVerifyRequestModel): string | object => {
  const { key, token } = configuration;
  return jwt.verify(token, key);
}

export { Generate, Verify };