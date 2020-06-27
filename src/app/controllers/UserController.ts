import { Request, Response, response } from 'express';
import { getRepository } from 'typeorm';
import User from '../entities/User';

class UserController {

  async index(req: Request, res: Response) {
    const repository = getRepository(User);
    const users = await repository.find();
    return res.json(users);
  }

  async store(req: Request, res: Response) {
    const repository = getRepository(User);
    const { email, password }  = req.body;

    const userExists = await repository.findOne({ where: { email } });

    if (userExists) {
      return res.sendStatus(409).json({ error: 'User already registered' });
    }

    const user = repository.create({ email, password });
    await repository.save(user);

    return res.json(user);
  }
}

export default new UserController();
