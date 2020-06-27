import { Request, Response, response } from 'express';
import { getRepository } from 'typeorm';
import User from '../entities/User';
import {Compare} from '../util/HashUtil';
import {Generate} from '../util/TokenUtil';

class AuthController {
  async authenticate(req: Request, res: Response) {
    const repository = getRepository(User);
    const { email, password }  = req.body;

    const user = await repository.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: 'User not Found' });
    }

    const isValidPassword = await Compare(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({ error: 'Password is incorrect' });
    }

    const token = Generate({ id: user.id, key: 'flexpag' });

    delete user.password;

    return res.json({
      user,
      token
    })
  }
}

export default new AuthController();
